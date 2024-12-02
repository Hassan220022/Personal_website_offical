#!/bin/bash

# Exit script if any command fails
set -e

echo "Starting LXC container setup and deployment process..."

# Update and upgrade the system
echo "Updating and upgrading the system..."
sudo apt update && sudo apt upgrade -y

# Install necessary packages
echo "Installing required packages..."
sudo apt install -y curl git nginx build-essential python3-pip nodejs npm ufw

# Install Node.js (for React apps)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js and npm installations
echo "Verifying Node.js and npm installations..."
node -v || { echo "Node.js installation failed"; exit 1; }
npm -v || { echo "npm installation failed"; exit 1; }

# Install PM2 for process management
echo "Installing PM2..."
sudo npm install -g pm2

# Set up the project directory
PROJECT_DIR="/var/www/react-app"
echo "Setting up project directory: $PROJECT_DIR..."
sudo mkdir -p $PROJECT_DIR
sudo chown $(whoami):$(whoami) $PROJECT_DIR

# Generate SSH key for GitHub access (if not already done)
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating SSH key for GitHub..."
    ssh-keygen -t rsa -b 4096 -C "hassansonson2002@gmail.com" -f ~/.ssh/id_rsa -N ""
    echo "Public SSH key (add this to GitHub Deploy Keys):"
    cat ~/.ssh/id_rsa.pub
    echo "Waiting for user to add the SSH key to GitHub..."
    sleep 1m
fi

# Clone the GitHub repository
echo "Cloning the GitHub repository..."
git clone git@github.com:Hassan220022/Personal_website_offical.git $PROJECT_DIR

# Navigate to the project directory
cd $PROJECT_DIR

# Install project dependencies
echo "Installing dependencies..."
npm install

# Set up Nginx to proxy to React development server
IP_ADDRESS=$(hostname -I | awk '{print $1}')
echo "Configuring Nginx to forward traffic to React development server..."
cat <<EOF | sudo tee /etc/nginx/sites-available/react-app
server {
    listen 80;
    server_name $IP_ADDRESS;  # Using the IP address dynamically

    # Proxy requests to React development server on port 5173
    location / {
        proxy_pass http://localhost:5173;  # Proxy to React development server on port 5173
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the Nginx configuration and restart the service
sudo ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Start the React development server
echo "Starting the React development server on port 5173..."
pm2 start npm --name "react-app" -- start
pm2 save
sudo pm2 startup | sudo bash

# Print completion message
echo "Setup complete! Your React app is live at http://$IP_ADDRESS and proxied to port 5173."
