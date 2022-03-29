import { Container, Grid, Row, Text, Spacer } from "@nextui-org/react";

const HistoryItemList = (items) => {
  console.log(items);
  return (
    <Container>
      <Spacer y={2} />
      <Grid.Container gap={1}>
        {items.items.map((item) => {
          const { items } = item;
          return (
            <>
              <Text h5>{item.date.slice(0, 10)}</Text>
              <Grid
                xs={12}
                sm={7}
                key={item.date}
                css={{ textAlign: "center" }}
              >
                {items.map((item) => {
                  return (
                    <Container key={item.id}>
                      <p>Nazwa: {item.name}</p>
                      <p>Opis: {item.description}</p>
                      <p>Cena: {(item.price / 100) * item.quantity}zł</p>
                      <p>Ilość: {item.quantity}</p>
                    </Container>
                  );
                })}
              </Grid>
            </>
          );
        })}
      </Grid.Container>
    </Container>
  );
};

export default HistoryItemList;
