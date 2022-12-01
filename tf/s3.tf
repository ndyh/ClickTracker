resource "aws_s3_bucket" "clicktracker" {
  bucket = var.bucket_name

  tags = {
    Name = var.bucket_name
  }
}

resource "aws_s3_bucket_acl" "clicktracker_acl" {
  bucket = aws_s3_bucket.clicktracker.id
  acl    = "private"
}

data "aws_iam_policy_document" "read_clicktracker_bucket" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.clicktracker.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.clicktracker.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "read_clicktracker" {
  bucket = aws_s3_bucket.clicktracker.id
  policy = data.aws_iam_policy_document.read_clicktracker_bucket.json
}
