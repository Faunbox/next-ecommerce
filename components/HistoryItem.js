import { Container } from "@nextui-org/react";

const HistoryItemList = (items) => {
  return (
    <Container>
      {items.items.map((item) => {
        const { items } = item;
        return (
          <div key={item.date}>
            {item.date.slice(0, 10)}
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
          </div>
        );
      })}
    </Container>
  );
};

export default HistoryItemList;
