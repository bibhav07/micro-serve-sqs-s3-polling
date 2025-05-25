import { GetObjectCommand, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {env} from "../config/env";
import { s3Client } from '../config/aws';

//this function is used to generate presigned urls for uploading files to s3 bucket
export const generatePresignedUrl = async (filename: string, contentType: string) => {
  const key = `product-images/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // 5 mins

  return { url, key };
};

export const checkifFileExists = async (key: string) => { 
  try {
    
     const data =  await s3Client.send(new HeadObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    }));
    return data; 
  } catch (error  ) {
   return false
  }
};


export async function getPresignedImageUrl (key: string) {
     const command = new GetObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key
    });
    

    const url = getSignedUrl(s3Client, command, { expiresIn: 10 * 60 }); // 10 minutes expires
    return url;
}