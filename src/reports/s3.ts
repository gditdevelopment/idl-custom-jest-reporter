import { extractStringEnvVar } from '../core/environment';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from 'fs';
import * as path from 'path';

export const uploadToS3 = async (bucketName: string, filePath: string) => {
  try {
    const ACCESS_KEY:string = extractStringEnvVar('AWS_ACCESS_KEY_ID');
    const SECRET_KEY:string = extractStringEnvVar('AWS_SECRET_ACCESS_KEY');
    const REGION:string = extractStringEnvVar('AWS_REGION');
    
    const s3Client = new S3Client({ region: REGION });
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: path.basename(filePath),
      Body: fileStream,
    };
    
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
