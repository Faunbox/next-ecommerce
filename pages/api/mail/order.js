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
  const f = () => {
    console.log("przed iteracja");
    body.zamowienie.map((item) => {
      <ul key={item._id}>
        <li>{item.name}</li>
        <li>{item.category}</li>
        <li>{item.brand}</li>
        <li>{item.quantity}</li>
        <li>{item.quantity * item.price}$</li>
      </ul>;
    });
    console.log("po iteracji");
  };
  transporter.sendMail(
    {
      from: process.env.EMAIL_FROM, // sender address
      to: process.env.EMAIL_USER, // list of receivers
      subject: body.subject, // Subject line
      html: `<div>
      <h1>Dane do zamówienia</h1>
      <ul>
      <li>Data: ${body.time}</li>
      <li>Imie: ${body.name}</li>
      <li>Ulica: ${body.street}</li>
      <li>Miasto: ${body.city}</li>
      <li>Kod pocztowy: ${body.postalCode}</li>
      <li>Data: ${body.time}</li>
      <br/>
      </ul>
      <h1>Zamówienie:</h1>
      ${body.zamowienie.map((item) => {
        <ul key={item._id}>
          <li>{item.name}</li>
          <li>{item.category}</li>
          <li>{item.brand}</li>
          <li>{item.quantity}</li>
          <li>{item.quantity * item.price}$</li>
        </ul>;
      })}
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
