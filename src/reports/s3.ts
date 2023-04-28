import { extractStringEnvVar } from '../core/environment';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

export const uploadToS3 = async (bucketName: string, filePath: string) => {
  try {
    const ACCESS_KEY:string = extractStringEnvVar('AWS_ACCESS_KEY_ID');
    const SECRET_KEY:string = extractStringEnvVar('AWS_SECRET_ACCESS_KEY');
    const REGION:string = extractStringEnvVar('AWS_REGION');
    
    const s3Client = new AWS.S3({ region: REGION });
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: path.basename(filePath),
      Body: fileStream,
    };
    
    const data = await s3Client.upload(uploadParams).promise();
    console.log("Upload successful", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
