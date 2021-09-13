variable "region" {
  default = "eu-central-1"
}

variable "aws_ubuntu_awis" {
  default = {
    "eu-central-1" = "ami-05f7491af5eef733a"
  }
}

variable "environment" {
  type = string
}

variable "application" {
  type = string
}

variable "key_name" {
  type = string
  default = "sshKeyRyde"
}

variable "ec2_user" {
  type = string
  default = "ubuntu"
}

variable "mgmt_ips" {
  default = ["0.0.0.0/0"]
}

variable "vpc_private_subnet" {
  description = "vpc_private_subnet"
  type        = string
}

variable "vpc_public_subnet" {
  description = "vpc_public_subnet"
  type        = string
}

variable "security_group_id" {
  description = "security_group_id"
  type        = string
}

variable "ec2_instance_private_key_path" {
  description = "AWS EC2 instance private ssh key path."
  type        = string
  default     = "/Users/easternpeak/Downloads/sshKeyRyde.pem"
}