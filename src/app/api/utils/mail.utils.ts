import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }

} as SMTPTransport.Options)

type SendEmailDto = {
    sender: Mail.Address,
    recipients: Mail.Address[],
    subject: string,
    message: string,

}
export const sendEmail = async (dto: SendEmailDto) => {
    const {sender, recipients, subject, message} = dto;

    return await transporter.sendMail({
        from: sender,
        to: recipients,
        subject,
        html: message
    })
}