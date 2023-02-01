import AWS from 'aws-sdk';

export const s3boardgames = new AWS.S3({
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY
});
export const s3bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME ?? '';
