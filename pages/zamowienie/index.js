import Cookies from "js-cookie";
import Link from "next/link";
import { useCard } from "../../context/card.context";
import { useAuth } from "../../context/auth.context";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import contactStyles from "../../styles/Contact.module.scss";
import { useRouter } from "next/router";

const Shipping = () => {
  const apiEndpoint = "./api/mail/order";
  const { userSession } = useAuth();
  // const [serverResponse, setServerResponse] = useState("");
  const [dataFromCookie, setDataFromCookie] = useState("");
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

  const changeInputValues = (data) => {
    setName(data.name);
    setSurname(data.surname);
    setStreet(data.street);
    setCity(data.city);
    setPostalCode(data.postalCode);
  };

  const sendMailWithShippingData = async (id) => {
    await fetch(apiEndpoint, {
      body: JSON.stringify({
        subject: `Zamówienie ${id}`,
        id,
        email: userSession.email,
        name,
        surname,
        street,
        city,
        postalCode,
        time: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.status === 200 && alert("ok"))
      .catch((err) => console.error("błąd", err.message));
    console.log(time);
  };

  const handleSubmit = async () => {
    ///wyslanie danych do bazy danych
    const _id = Math.random().toString(36).substr(2, 9);
    sendMailWithShippingData(_id);
    Cookies.set("shippingData", JSON.stringify(shippingData));
  };

  const handleDataFromCookie = async () => {
    const cookie = Cookies.get("shippingData");
    if (!cookie) {
      return;
    }
    const dataFromCookie = await JSON.parse(cookie);
    changeInputValues(dataFromCookie);
  };

  useEffect(() => {
    // handleDataFromCookie();
    return handleDataFromCookie();
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
                // value={dataFromCookie ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                autoComplete="surname"
                name="Nazwisko"
                // value={dataFromCookie ? surname : ""}
                placeholder="Nowak"
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                // value={dataFromCookie ? street : ""}
                placeholder="Komorowicka 336/61"
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Miasto</Form.Label>
              <Form.Control
                type="text"
                // value={dataFromCookie ? city : ""}
                placeholder="Warszawa"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Kod pocztowy</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                // value={dataFromCookie ? postalCode : ""}
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
