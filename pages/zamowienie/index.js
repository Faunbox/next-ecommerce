import Cookies from "js-cookie";
import Link from "next/link";
import { useCard } from "../../context/card.context";
import { useAuth } from "../../context/auth.context";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import contactStyles from "../../styles/Contact.module.scss";

const Shipping = () => {
  const apiEndpoint = "./api/mail/order";
  const { state } = useCard();
  const { userSession } = useAuth();
  // const [serverResponse, setServerResponse] = useState("");
  const [dataFromCookie, setDataFromCookie] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const shippingData = {
    name,
    street,
    city,
    postalCode,
  };

  const changeInputValues = (data) => {
    setName(data.name);
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
        street,
        city,
        postalCode,
        time: new Date(),
        zamowienie: state.cart.cartItems,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.status === 200 && alert("ok"))
      .catch((err) => console.error("błąd", err.message));
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
              <Form.Label>Imie i nazwisko</Form.Label>
              <Form.Control
                type="text"
                autoComplete="name"
                name="name"
                placeholder="Andrzej Nowak"
                // value={dataFromCookie ? name : ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Ulica</Form.Label>
              <Form.Control
                type="text"
                autoComplete="street-address"
                // value={dataFromCookie ? street : ""}
                placeholder="Komorowicka 336/61"
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Miasto</Form.Label>
              <Form.Control
                type="text"
                autoComplete=""
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
                // autoComplete="country"
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
