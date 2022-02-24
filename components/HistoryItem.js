import { Container } from "react-bootstrap";

const HistoryItemList = (items) => {
  return (
    <Container>
      {/* <h4 key={item.date}>{item.date}</h4> */}

      {items.items.map((item) => {
        const { items } = item;
        return (
          <>
            <div>{item.date}</div>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <p>Nazwa: {item.name}</p>
                  <p>Opis: {item.description}</p>
                  <p>Cena: {(item.price / 100) * item.quantity}zł</p>
                  <p>Ilość: {item.quantity}</p>
                </div>
              );
            })}
          </>
        );
      })}
    </Container>
  );
};

export default HistoryItemList;
