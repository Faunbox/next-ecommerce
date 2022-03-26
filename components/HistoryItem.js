import { StyledHistoryWrapper } from "../styles/styled_user-page";

const HistoryItemList = (items) => {
  return (
    <StyledHistoryWrapper>
      {items.items.map((item) => {
        const { items } = item;
        return (
          <div key={item.date}>
            {item.date}
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
    </StyledHistoryWrapper>
  );
};

export default HistoryItemList;
