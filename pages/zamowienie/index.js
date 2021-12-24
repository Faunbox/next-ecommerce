import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import contactStyles from "../../styles/Contact.module.scss";

const Shipping = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const shippingData = {
    name,
    surname,
    street,
    city,
    postalCode,
  };

  const handleSubmit = () => {
    ///wyslanie danych do bazy danych
    Cookies.set("shippingData", JSON.stringify(shippingData));
  };

  useEffect(() => {
    const data = JSON.parse(Cookies.get("shippingData"));

    ////osobna funkcja
    setName(data.name);
    setSurname(data.surname);
    setStreet(data.street);
    setCity(data.city);
    setPostalCode(data.postalCode);
  }, []);

  return (
    <Container>
      <main className={contactStyles.contact}>
        <article>
          <div>Wpisz dane do wysyłki</div>
        </article>
        <aside>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Imie</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                name="name"
                placeholder="Andrzej"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                autoComplete="surname"
                name="Nazwisko"
                value={surname}
                placeholder="Nowak"
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                value={street}
                placeholder="Komorowicka 336/61"
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Miasto</Form.Label>
              <Form.Control
                type="text"
                value={city}
                placeholder="Warszawa"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Kod pocztowy</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={postalCode}
                placeholder="43-300"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Form.Group>
            <Link href={"/zamowienie/dalej"} passHref>
              <Button variant="primary" onClick={() => handleSubmit()}>
                Dalej
              </Button>
            </Link>
          </Form>
        </aside>
      </main>
    </Container>
  );
};

export default Shipping;
