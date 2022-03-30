import { Container, Text } from "@nextui-org/react";
import Image from "next/image";

const UserPage = ({ user }) => {
  return (
    <Container justify="center">
      <Container>
        <Text>User email: {user.email}</Text>
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
