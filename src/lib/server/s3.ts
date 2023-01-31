import AWS from 'aws-sdk';

export const s3boardgames = new AWS.S3({
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY
});
export const s3bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME ?? '';

export const awsSES = new AWS.SES({
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SES_SECRET_ACCESS_KEY
    },
    region: 'eu-central-1'
});

export const sendEmail = (recipientEmail: string, subject: string, body: string) => {
    let params = {
        Source: 'amarcinw@onet.pl',
        Destination: {
            ToAddresses: [recipientEmail]
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        }
    };
    return awsSES.sendEmail(params).promise();
};
