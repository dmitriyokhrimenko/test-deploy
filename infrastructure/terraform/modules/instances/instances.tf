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

  connection {
    type = "ssh"
    user = var.ec2_user
    host = aws_eip.jumpbox-eip.public_ip
    private_key = file(var.ec2_instance_private_key_path)
  }

  provisioner "file" {
    source      = "/Users/easternpeak/www/ryde-core/infrastructure/ansible"
    destination = "/home/ubuntu"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install software-properties-common -y",
      "sudo add-apt-repository --yes --update ppa:ansible/ansible -y",
      "sudo apt install ansible -y",
      "ansible-playbook -u ${var.ec2_user} -i 'ansible/hosts.ini' --private-key ${var.ec2_instance_private_key_path} ansible/provision.yml"
    ]
  }
}