import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

async function upload(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ multiples: true });
  console.log('upload');
  form.parse(req, (a, b, c) => {
    console.log(a, b, c);
  });
  res.status(200).json({ data: '', code: 0, msg: 'success' });
}

export default upload;
