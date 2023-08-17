import nodemailer from 'nodemailer';
import pug from 'pug';
import { IUser } from '../models/userModel';
import env from '../env';
const { htmlToText } = require('html-to-text');

class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM_ADDRESS}>`;
  }

  newTransport() {
    if (env.NODE_ENV === 'production')
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: env.SENDGRID_USERNAME,
          pass: env.SENDGRID_PASSWORD,
        },
      });

    return nodemailer.createTransport({
      service: 'Mailtrap',
      auth: {
        user: env.MAILTRAP_USERNAME,
        pass: env.MAILTRAP_PASSWORD,
      },
    });
  }

  reserveTransport() {
    return nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: env.GMAIL_USERNAME,
        pass: env.GMAIL_PASSWORD,
      },
    });
  }

  async send(template: string, subject: string) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      await this.reserveTransport().sendMail(mailOptions);
      if (typeof err === 'string') throw new Error(err);
    }
  }

  async sendWelcome() {
    await this.send('welcome', `Welcome to the CinemaNet!`);
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

export default Email;
