variable "bucket_name" {
  default     = "clicktracker-static-site"
  description = "S3 bucket name"
}

variable "aws_region" {
  type    = string
  default = "us-east-2"
}
