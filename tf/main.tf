terraform {
  required_version = "1.3.5"

  backend "s3" {
    region = "us-east-2"
    bucket = "clicktracker-state"
    key    = "terraform.tfstate"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
