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

resource "aws_instance" "test_server" {
  ami           = "ami-05f7491af5eef733a"
  instance_type = var.ec2_instance_type
  key_name = var.ec2_instance_key_name

  tags = {
    Name = "TestServerInstance"
  }

  provisioner "remote-exec" {
    connection {
      type = "ssh"
      user = var.ec2_instance_user
      host = aws_instance.test_server.public_ip
      private_key = file(var.ec2_instance_private_key_path)
    }
    inline = [
      "sudo apt update",
      "sudo apt install nano",
    ]
  }
}

//resource "local_file" "ip" {
//    content  = aws_instance.test_server.public_ip
//    filename = "ip.txt"
//}