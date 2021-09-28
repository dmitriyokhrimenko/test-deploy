terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = var.aws_region
}

module "vpc" {
  source      = "./modules/vpc"
  name        = "RIDE"
  environment = "DEV"
  # VPC
  instance_tenancy                 = "default"
  enable_dns_support               = "true"
  enable_dns_hostnames             = "true"
  assign_generated_ipv6_cidr_block = "false"
  enable_classiclink               = "false"
  vpc_cidr                         = "10.50.0.0/16"
  private_subnet_cidrs             = ["10.50.1.0/24"]
  public_subnet_cidrs              = ["10.50.2.0/24"]
  availability_zones               = ["eu-central-1a"]
  allowed_ports                    = ["80", "443"]

  #Internet-GateWay
  enable_internet_gateway = "true"
  #NAT
  enable_nat_gateway = "false"
  single_nat_gateway = "true"
  #VPN
  enable_vpn_gateway = "false"
  #DHCP
  enable_dhcp_options = "false"
  # EIP
  enable_eip = "false"
}

module "instances" {
  depends_on = [module.vpc]
  source      = "./modules/instances"
  environment = "DEV"
  application = ""
  vpc_private_subnet = module.vpc.vpc-privatesubnet-id_0
  vpc_public_subnet = module.vpc.vpc-publicsubnet-id_0
  security_group_id = module.vpc.security_group_id
}
