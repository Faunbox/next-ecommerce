// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

export default function sendContactForm(req, res) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  let body = req.body;
  transporter.sendMail(
    {
      from: process.env.EMAIL_FROM, // sender address
      to: body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: body.text, // plain text body
      // html: `<b>${body.password}</b>`, // html body
    },
    (err) => {
      err
        ? console.log(err.response)
        : res.status(200).json({ message: "Wysłano maila!" });
    }
  );
}

// sendContactForm().then(console.log("wyslalo maila z api")).catch(console.error);
