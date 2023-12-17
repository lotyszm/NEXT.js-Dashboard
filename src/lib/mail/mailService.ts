import fs from 'fs';

let nodemailer = require('nodemailer');

type SendMailType = {
  subject: string;
  toEmail: string;
  otpText: string;
};

if (!process.env.EMAIL_SERVER_HOST) {
  throw new Error('EMAIL_SERVER_HOST not set');
}
if (!process.env.EMAIL_SERVER_PORT) {
  throw new Error('EMAIL_SERVER_PORT not set');
}
if (!process.env.EMAIL_SERVER_USER) {
  throw new Error('EMAIL_SERVER_USER not set');
}
if (!process.env.EMAIL_SERVER_PASSWORD) {
  throw new Error('EMAIL_SERVER_PASSWORD not set');
}
if (!process.env.EMAIL_FROM) {
  throw new Error('EMAIL_FROM not set');
}
if (!process.env.APP_BASE_URL) {
  throw new Error('APP_BASE_URL not set');
}
if (!process.env.COMPANY_NAME) {
  throw new Error('COMPANY_NAME not set');
}

export async function sendMail({ subject, toEmail, otpText }: SendMailType) {
  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const emailHtmlBody = await prepareTemplate({
    EMAIL_SUBJECT: subject,
    EMAIL_BASE_URL: `${process.env.APP_BASE_URL}`,
    EMAIL_LOGO: `${process.env.APP_BASE_URL}/logo.svg`,
    EMAIL_COMPANY_NAME: `${process.env.COMPANY_NAME}`,
    EMAIL_BODY: otpText,
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: subject,
    html: emailHtmlBody,
  };

  transporter.sendMail(
    mailOptions,
    function (error: string | undefined, info: any) {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        // console.log('Email Sent');
        return true;
      }
    }
  );
}

async function prepareTemplate({
  EMAIL_SUBJECT,
  EMAIL_BASE_URL,
  EMAIL_LOGO,
  EMAIL_COMPANY_NAME,
  EMAIL_BODY,
}: {
  EMAIL_SUBJECT: string;
  EMAIL_BASE_URL: string;
  EMAIL_LOGO: string;
  EMAIL_COMPANY_NAME: string;
  EMAIL_BODY: string;
}) {
  const templatePath = `${process.cwd()}/src/lib/mail/template/email.html`;
  let template = fs.readFileSync(templatePath, 'utf8');

  template = template.replace(/{{EMAIL_SUBJECT}}/g, EMAIL_SUBJECT);
  template = template.replace(/{{EMAIL_BASE_URL}}/g, EMAIL_BASE_URL);
  template = template.replace(/{{EMAIL_LOGO}}/g, EMAIL_LOGO);
  template = template.replace(/{{EMAIL_COMPANY_NAME}}/g, EMAIL_COMPANY_NAME);
  template = template.replace(/{{EMAIL_BODY}}/g, EMAIL_BODY);

  return template;
}
