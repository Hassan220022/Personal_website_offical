#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Navigate to the project directory
cd /var/www/personal_website_official

# Pull the latest changes from the repository
git fetch --all
git reset --hard origin/main

# Install npm dependencies
npm install

# Restart the application with PM2
pm2 restart personal_website

echo "Application updated and restarted successfully."