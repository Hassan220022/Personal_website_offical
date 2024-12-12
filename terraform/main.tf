terraform {
  required_version = ">= 0.13"

  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = ">=2.9.6"
    }
  }

  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "proxmox" {
  pm_api_url          = var.proxmox_api_url
  pm_api_token_id     = var.proxmox_api_token_id
  pm_api_token_secret = var.proxmox_api_token
  pm_tls_insecure     = true
}

resource "proxmox_lxc" "personal_website" {
  hostname     = "personal-website-official"
  target_node  = "pve"
  clone        = "113"  # VMID of the existing template
  full         = true   # Ensure a full clone is performed
  clone_storage = "local"
  password     = var.container_password
  unprivileged = true
  vmid = "200"          # VMID of the new container

  # Resource Allocation
  cores    = 2
  memory   = 2048  # in MB
  swap     = 512   # in MB

  # Network Configuration
  network {
    name     = "eth0"
    bridge   = "vmbr0"
    ip       = "192.168.1.50/24"
    gw       = "192.168.1.1"
    firewall = false
  }

  # Features
  features {
    nesting = true
  }

  # Startup Configuration
  onboot   = true
  start    = true
  startup  = "order=4"

  # Provisioning using remote-exec
  provisioner "remote-exec" {
    inline = [
      "apt-get update -y",
      "apt-get install -y git curl",
      "curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -",
      "apt-get install -y nodejs",
      "npm install -g pm2",
      "git clone ${var.github_repo} /var/www/personal_website_official",
      "cd /var/www/personal_website_official",
      "npm install",
      "pm2 start index.js --name personal_website",
      "pm2 save",
      "pm2 startup systemd -u root --hp /root"
    ]

    connection {
      type     = "ssh"
      host     = "192.168.1.50"
      user     = "root"
      password = var.container_password
      timeout  = "2m"
    }
  }

  tags = "web,production"

  lifecycle {
    create_before_destroy = true
  }
}

# Outputs
output "lxc_ip" {
  description = "The IP address of the LXC container."
  value       = proxmox_lxc.personal_website.network[0].ip
}
