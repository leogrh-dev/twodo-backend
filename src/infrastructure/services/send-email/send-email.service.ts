import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    async sendEmail(to: string, subject: string, html: string) {
        const mailOptions = {
            from: `"TwoDo" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        };

        return this.transporter.sendMail(mailOptions);
    }
}
