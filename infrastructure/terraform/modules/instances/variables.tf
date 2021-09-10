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

variable "default_security_group_id" {
  description = "default_security_group_id"
  type        = string
}