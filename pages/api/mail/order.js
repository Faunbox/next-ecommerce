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
  console.log(body);
  transporter.sendMail(
    {
      from: process.env.EMAIL_FROM, // sender address
      to: process.env.EMAIL_USER, // list of receivers
      subject: body.subject, // Subject line
      html: `<div>
      <ul>
      <li>Data: ${body.time}</li>
      <li>Imie: ${body.name}</li>
      <li>Nazwisko: ${body.surname}</li>
      <li>Ulica: ${body.street}</li>
      <li>Miasto: ${body.city}</li>
      <li>Kod pocztowy: ${body.postalCode}</li>
      </ul>
      </div>`,
    },
    (err) => {
      err
        ? res
            .status(404)
            .json({ message: "Wystpil blad podczas wysyladnia maila!" })
        : res.status(200).json({ message: "Wysłano maila z zamówieniem!" });
    }
  );
}

// sendContactForm().then(console.log("wyslalo maila z api")).catch(console.error);
