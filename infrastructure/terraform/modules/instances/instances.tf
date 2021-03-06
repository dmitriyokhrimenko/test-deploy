#---------------------------------------------------
# Create instances
#---------------------------------------------------
resource "aws_instance" "app-instance" {
  ami = "${lookup(var.aws_ubuntu_awis,var.region)}"
  instance_type = "t2.micro"
  tags = {
    Name = "${lower(var.environment)}-instance-01"
    Environment = "${var.environment}"
    sshUser = "ubuntu"
  }
  subnet_id = "${var.vpc_private_subnet}"
  key_name = "${var.key_name}"
  vpc_security_group_ids = ["${var.security_group_id}"]

}

resource "local_file" "hosts_ini" {
  content = templatefile("/Users/easternpeak/www/ryde-core/infrastructure/ansible/templates/hosts.tpl",
  {
    host = aws_instance.app-instance.private_ip
  }
  )
  filename = "/Users/easternpeak/www/ryde-core/infrastructure/ansible/hosts.ini"
}

resource "aws_instance" "jumpbox" {
  ami = "${lookup(var.aws_ubuntu_awis,var.region)}"
  instance_type = "t2.micro"
  tags = {
    Name = "${lower(var.environment)}-jumpbox-01"
    Environment = "${var.environment}"
    sshUser = "ubuntu"
  }
  subnet_id = "${var.vpc_public_subnet}"
  key_name = "${var.key_name}"
  vpc_security_group_ids = ["${var.security_group_id}"]
}

resource "aws_eip" "jumpbox-eip" {
  vpc                       = true
  network_interface         = aws_instance.jumpbox.primary_network_interface_id
  associate_with_private_ip = aws_instance.jumpbox.private_ip

//  connection {
//    type = "ssh"
//    user = var.ec2_user
//    host = aws_eip.jumpbox-eip.public_ip
//    private_key = file(var.ec2_instance_private_key_path)
//  }

//  provisioner "file" {
//    source      = "${var.ec2_instance_private_key_path}"
//    destination = "/home/ubuntu/sshKeyRyde.pem"
//  }

//  provisioner "file" {
//    source      = "/Users/easternpeak/www/ryde-core/infrastructure/ansible"
//    destination = "/home/ubuntu"
//  }

//  provisioner "remote-exec" {
//    inline = [
//      "sudo apt update",
//      "sudo apt install software-properties-common -y",
//      "sudo add-apt-repository --yes --update ppa:ansible/ansible -y",
//      "sudo apt install ansible -y",
//      "ansible-galaxy install -r /home/ubuntu/ansible/requirements.yml",
//      "ansible-playbook -u ${var.ec2_user} -i 'ansible/hosts.ini' ansible/provision.yml"
//    ]
//  }
}

resource "local_file" "ssh_config" {
  depends_on = [aws_eip.jumpbox-eip, aws_instance.app-instance, aws_instance.jumpbox, local_file.hosts_ini]
  content = templatefile("/Users/easternpeak/www/ryde-core/infrastructure/terraform/templates/ssh_config.tpl",
  {
    bastion_host = aws_eip.jumpbox-eip.public_ip,
    user = var.ec2_user
  }
  )
  filename = "/Users/easternpeak/.ssh/aws"

  connection {
    type = "ssh"
    user = var.ec2_user
    host = aws_eip.jumpbox-eip.public_ip
    private_key = file(var.ec2_instance_private_key_path)
  }

  provisioner "remote-exec" {
    inline = [
      "echo '' > /dev/null",
    ]
  }

  provisioner "local-exec" {
    command = "ansible-playbook -u ${var.ec2_user} -i '/Users/easternpeak/www/ryde-core/infrastructure/ansible/hosts.ini' /Users/easternpeak/www/ryde-core/infrastructure/ansible/provision.yml"
  }
}