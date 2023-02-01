import AWS from 'aws-sdk';
import * as aws from '@aws-sdk/client-ses';
import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';

const ses = new AWS.SES({
    apiVersion: '2010-12-01',
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SES_SECRET_ACCESS_KEY
    },
    region: 'eu-central-1'
});

let transporter = nodemailer.createTransport({
    SES: { ses, aws }
});

export const sendEmail = (
    recipientEmails: string[],
    subject: string,
    body: string,
    attachments: Attachment[]
) => {
    transporter.sendMail(
        {
            from: 'amarcinw@onet.pl',
            to: recipientEmails,
            subject: subject,
            html: `${body}`,
            attachments: attachments
        },
        (err, info) => {
            console.log(err || info);
        }
    );
};
