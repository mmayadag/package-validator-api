// import { MailService } from '@sendgrid/mail';
import { SENDGRID_API_KEY, EMAIL_FROM, EMAIL_SUBJECT } from '../../config';
import { createMail } from './email.template';

const MailService = require('@sendgrid/mail');

MailService.setApiKey(SENDGRID_API_KEY);

const from = EMAIL_FROM;
const subject = EMAIL_SUBJECT;

class EmailService {
  sendPackageInfo(data: any, to: string, type: string): string {
    const msg = {
      to,
      from,
      subject,
      ...createMail(data, type)
    };
    MailService.send(msg);
    return msg.html || '';
  }

  sendEmail(email: any, to: string, owner: string, repo: string): string {
    const msg = {
      to,
      from,
      subject: `${owner}/${repo} ${subject}`,
      ...email
    };
    MailService.send(msg);
    return msg.html || '';
  }
}

export { EmailService, createMail };
