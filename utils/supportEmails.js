const dotenv = require("dotenv");
const pug = require("pug");
dotenv.config({ path: "./../config.env" });

const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(admin, sender) {
    this.to = admin.email;
    this.from = "henbbo";
    this.email = sender.email;
    this.topic = sender.topic;
    this.message = sender.message;
    this.registered = sender.registered;
  }

  newTransport() {
    // gmail
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      email: this.email,
      message: this.message,
      registered: this.registered
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }

  async sendSupportEmail() {
    await this.send("supportEmails",this.topic);
  }
};