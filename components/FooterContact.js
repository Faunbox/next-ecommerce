import { Button, Card, Input, Spacer, Text } from "@nextui-org/react";

const FooterContact = () => {
  return (
    <Card>
      <Text h6>Any questions? Contact us!</Text>
      <Spacer y={1} />
      <Input type={"text"} placeholder="Your email"></Input>
      <Spacer y={1} />
      <Input type={"text"} placeholder="Your name"></Input>
      <Spacer y={1} />
      <Input type={"text"} placeholder="Your question"></Input>
      <Spacer y={1} />
      <Button xs>Send email</Button>
    </Card>
  );
};

export default FooterContact;
