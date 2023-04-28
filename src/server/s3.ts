import AWS from "aws-sdk";
import { env } from "../env.mjs";

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: "eu-central-1",
});

export const BUCKET_NAME = "tattooit";
