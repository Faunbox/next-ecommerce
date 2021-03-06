import { Container, Spacer, Text } from "@nextui-org/react";

const StoreInfo = () => {
  return (
    <Container
      justify="center"
      css={{
        "@md": { display: "flex", flexDirection: "row", flexWrap: "nowrap" },
      }}
    >
      <Container>
        <Text h3>Why our store?</Text>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa
          molestias ipsum, blanditiis excepturi iusto vitae praesentium libero,
          in repellendus placeat autem quam. Ea perspiciatis quis delectus
          placeat dicta aliquid aspernatur.
        </Text>
      </Container>
      <Spacer y={1} css={{ "@md": { display: "none" } }} />
      <Container>
        <Text h3>Our products</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, quis
          perspiciatis. Odio, beatae esse aspernatur ipsa nemo rem! Quod sed,
          facere est adipisci blanditiis perspiciatis nemo exercitationem vero
          porro placeat.
        </Text>
      </Container>
      <Spacer y={1} css={{ "@md": { display: "none" } }} />
      <Container>
        <Text h3>Our mission</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
          beatae officiis atque alias repellat nihil expedita dolor dicta
          molestiae, tempora voluptas optio doloribus fugit et repellendus sed
          pariatur eligendi laudantium. Aliquid ipsum nobis molestias voluptate,
          architecto, molestiae aliquam fugit nulla earum ad expedita
          repudiandae voluptas tenetur consequuntur, maiores quisquam numquam?
        </Text>
      </Container>
      <Spacer y={1} css={{ "@md": { display: "none" } }} />
    </Container>
  );
};

export default StoreInfo;
