resource "aws_cloudfront_distribution" "clicktracker" {
  price_class         = "PriceClass_100"
  enabled             = true
  default_root_object = "index.html"
  aliases             = []
  comment             = "Clicktracker Distribution"

  origin {
    domain_name              = aws_s3_bucket.clicktracker.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.clicktracker.id
    origin_id                = aws_s3_bucket.clicktracker.bucket
  }

  logging_config {
    bucket          = "clicktracker-cloudfront-logs.s3.amazonaws.com"
    prefix          = ""
    include_cookies = false
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.clicktracker.bucket
    viewer_protocol_policy = "allow-all"
    compress               = true

    min_ttl     = 0
    default_ttl = 5 * 60
    max_ttl     = 60 * 60

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_origin_access_control" "clicktracker" {
  name                              = "clicktracker-ac"
  description                       = "Clicktracker policy"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
