import { Container, Grid, Text, Spacer, Card } from "@nextui-org/react";
import { useMemo } from "react";

const HistoryItemList = (items) => {
  const itemsArray = useMemo(() => {
    return items?.items?.map((item) => {
      return (
        <Grid key={item.date} css={{ textAlign: "center" }}>
          <Card bordered="true">
            <Card.Header>
              <Text h5>{item.date.slice(0, 10)}</Text>
            </Card.Header>
            <Card.Body>
              {item.items.map((items) => {
                return (
                  <Container key={items.id} justify="center">
                    <Text>Name: {items.description}</Text>
                    <Text>
                      Price of item: {items.price.unit_amount / 100}zł
                    </Text>
                    <Text>Quantity: {items.quantity}</Text>
                    <Text>Total price: {items.amount_total}</Text>
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
        {itemsArray}
        {/* {items.items.length !== 0 ? (
        ) : (
          <Text h5>You dont have any pucharsed items!</Text>
        )} */}
      </Grid.Container>
    </Container>
  );
};

export default HistoryItemList;
