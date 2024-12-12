#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Update and install required packages
apt-get update
apt-get upgrade -y
apt-get install -y git curl nginx

# Install Node.js LTS version
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Clone the GitHub repository if not already cloned
if [ ! -d "/var/www/personal_website_official" ]; then
  git clone https://github.com/Hassan220022/Personal_website_offical.git /var/www/personal_website_official
else
  echo "Repository already cloned. Pulling latest changes..."
  cd /var/www/personal_website_official
  git pull
fi

# Navigate to the project directory
cd /var/www/personal_website_official

# Install npm dependencies
npm install

# Start the application with PM2 using npm
pm2 start npm --name personal_website -- start
pm2 save
pm2 startup systemd -u root --hp /root

# Ensure port forwarding from 80 to 5173
NGINX_CONFIG="/etc/nginx/sites-available/default"

if ! grep -q "proxy_pass http://localhost:5173;" "$NGINX_CONFIG"; then
  cat > "$NGINX_CONFIG" <<EOF
server {
    listen 80;
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOF
  systemctl restart nginx
else
  echo "Nginx is already configured for proxying to port 5173."
fi
