data "aws_iam_policy_document" "clicktracker_s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.b.arn}/*"]
  }

  principals {
    type        = "AWS"
    identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
  }
}

resource "aws_s3_bucket_policy" "clicktracker_bucket_policy" {
  bucket = aws_s3_bucket.b.id
  policy = data.aws_iam_policy_document.clicktracker_s3_policy.json
}
