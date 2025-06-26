import { RedisService } from '../redis/redis.service';
import { TooManyRequestsException } from '../../../shared/exceptions/too-many-requests.exception';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
    constructor(private readonly redisService: RedisService) {}

    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    async sendEmail(to: string, subject: string, html: string) {
        const emailCount = await this.redisService.incrementEmailCount(to);

        if (emailCount > 10) {
            throw new TooManyRequestsException('Limite de e-mails excedido. Tente novamente em 1 hora.');
        }

        const mailOptions = {
            from: `"TwoDo" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        };

        return this.transporter.sendMail(mailOptions);
    }
}
