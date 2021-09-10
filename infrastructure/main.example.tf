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
      "echo '' > /dev/null",
    ]
  }
}

resource "local_file" "hosts_ini" {
  content = templatefile("ansible/templates/hosts.tpl",
  {
    host = aws_instance.test_server.public_ip
  }
  )
  filename = "ansible/hosts.ini"

  provisioner "local-exec" {
    command = "ansible-playbook -u ${var.ec2_instance_user} -i 'ansible/hosts.ini' --private-key ${var.ec2_instance_private_key_path} ansible/provision.yml"
  }
}
//resource "local_file" "ip" {
//    content  = aws_instance.test_server.public_ip
//    filename = "ip.txt"
//}