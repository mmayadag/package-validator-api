//import { MailService } from '@sendgrid/mail';
const MailService = require('@sendgrid/mail');
import { SENDGRID_API_KEY, EMAIL_FROM, EMAIL_SUBJECT } from '../../config';
import { createMail } from './email.template';
MailService.setApiKey(SENDGRID_API_KEY);

const from = EMAIL_FROM,
    subject = EMAIL_SUBJECT;

class EmailService {

    sendPackageInfo(data: any, to: string, type: string): string {
        let msg = {
            to,
            from,
            subject,
            ...createMail(data, type)
        };
        MailService.send(msg);
        return msg.html || '';
    }

    sendEmail(email: any, to: string, owner: string, repo: string): string {
        let msg = {
            to,
            from,
            subject: `${owner}/${repo} ${subject}`,
            ...email
        };
        MailService.send(msg);
        return msg.html || '';
    }
}

export {
    EmailService,
    createMail
}