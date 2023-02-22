const dotenv = require("dotenv");
const pug = require("pug");
dotenv.config({ path: "./../config.env" });

const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(admin, url) {
    this.to = admin.email;
    this.from = "henbbo";
    this.url = url;
    this.paymentTo = admin.paymentTo;
    this.paymentFrom = admin.paymentFrom;
    this.paymentAmount = admin.paymentAmount;
    this.newTransactionWallet = admin.newTransactionWallet;
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
      paymentTo: this.paymentTo,
      paymentFrom: this.paymentFrom,
      paymentAmount: this.paymentAmount,
      transactionWallet: this.newTransactionWallet,
      url: this.url,
      subject,
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

  async sendNewTransaction() {
    await this.send("transactionEmail", "New Transaction");
  }

  async sendNewWithdrawal() {
    await this.send("withdrawalEmail", "New Withdrawal");
  }
};
