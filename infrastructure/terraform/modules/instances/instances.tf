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
  vpc_security_group_ids = ["${var.default_security_group_id}"]
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
  vpc_security_group_ids = ["${var.default_security_group_id}"]
}

resource "aws_eip" "jumpbox-eip" {
  vpc                       = true
  network_interface         = aws_instance.jumpbox.primary_network_interface_id
  associate_with_private_ip = aws_instance.jumpbox.private_ip
}