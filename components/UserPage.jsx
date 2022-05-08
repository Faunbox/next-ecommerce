import { Container, Text } from "@nextui-org/react";
import Image from "next/image";

const UserPage = ({ user }) => {
  return (
    <Container justify="center">
      <Container>
        <Text h4>User email: {user.email}</Text>
        {user.name ? <Text h4>User name: {user.name}</Text> : null}
      </Container>
      <Container justify="center" css={{ textAlign: "center", my: 10 }}>
        {user?.image && (
          <Image
            src={user?.image}
            alt={`Image avatar`}
            width={300}
            height={300}
            objectFit="scale-down"
          />
        )}
      </Container>
    </Container>
  );
};

export default UserPage;
