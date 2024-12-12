variable "proxmox_api_url" {
  description = "Proxmox API URL"
  type        = string
}

variable "proxmox_api_token_id" {
  description = "Proxmox API Token ID"
  type        = string
}

variable "proxmox_api_token" {
  description = "Proxmox API Token Secret"
  type        = string
  sensitive   = true
}

variable "container_password" {
  description = "Password for the LXC container"
  type        = string
  sensitive   = true
}

variable "github_repo" {
  description = "GitHub repository URL to clone"
  type        = string
  default     = "https://github.com/Hassan220022/Personal_website_offical.git"
}