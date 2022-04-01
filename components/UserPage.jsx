import { Container, Text } from "@nextui-org/react";
import Image from "next/image";

const UserPage = ({ user }) => {
  return (
    <Container justify="center">
      <Container>
        <Text h6>User email: {user.email}</Text>
        {user.name ? <Text h6>User name: {user.name}</Text> : null}
      </Container>
      <Container justify="center" css={{ textAlign: "center", my: 10 }}>
        {user?.image && (
          <Image
            src={user?.image}
            alt={`Image avatar`}
            width={100}
            height={100}
          />
        )}
      </Container>
    </Container>
  );
};

export default UserPage;
