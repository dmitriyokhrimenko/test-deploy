variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}
variable "ec2_instance_type" {
  description = "AWS EC2 instance type."
  type        = string
  default     = "t2.micro"
}
variable "ec2_instance_key_name" {
  description = "AWS EC2 instance ssh key name."
  type        = string
  default     = "sshKeyRyde"
}
variable "ec2_instance_private_key_path" {
  description = "AWS EC2 instance private ssh key path."
  type        = string
  default     = "/Users/easternpeak/Downloads/sshKeyRyde.pem"
}
variable "ec2_instance_user" {
  description = "AWS EC2 instance user."
  type        = string
  default     = "ubuntu"
}
