import { Container, Grid, Text, Spacer, Card } from "@nextui-org/react";
import { useMemo } from "react";

const HistoryItemList = (items) => {
  const itemsArray = useMemo(() => {
    return items.items.map((item) => {
      const { items } = item;
      return (
        <Grid key={item.date} css={{ textAlign: "center" }}>
          <Card bordered="true">
            <Card.Header>
              <Text h5>{item.date.slice(0, 10)}</Text>
            </Card.Header>
            <Card.Body>
              {items?.map((item) => {
                return (
                  <Container key={item.id} justify="center">
                    <Text>Nazwa: {item.name}</Text>
                    <Text>Opis: {item.description}</Text>
                    <Text>Cena: {(item.price / 100) * item.quantity}zł</Text>
                    <Text>Ilość: {item.quantity}</Text>
                    <Spacer y={1} />
                  </Container>
                );
              })}
            </Card.Body>
            <Spacer y={1} />
          </Card>
        </Grid>
      );
    });
  }, [items]);
  return (
    <Container>
      <Spacer y={2} />
      <Grid.Container gap={1} justify="center">
        {items.items.length !== 0 ? (
          itemsArray
        ) : (
          <Text h5>You dont have any pucharsed items!</Text>
        )}
      </Grid.Container>
    </Container>
  );
};

export default HistoryItemList;
