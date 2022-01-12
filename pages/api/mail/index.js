// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

export default function sendContactForm(req, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let body = req.body;
  transporter.sendMail(
    {
      from: process.env.EMAIL_FROM, // sender address
      to: body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: body.text, // plain text body
    },
    (err) => {
      err
        ? res
            .status(404)
            .json({ message: "Wystpil blad podczas wysylania maila!", err })
        : res.status(200).json({ message: "Wysłano maila!" });
    }
  );
}

// sendContactForm().then(console.log("wyslalo maila z api")).catch(console.error);
