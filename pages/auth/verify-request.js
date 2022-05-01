import { Container, Spacer, Text } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

const verifyRequest = () => {
  return (
    <>
      <AnimatePresence>
        <Container css={{ textAlign: "center" }}>
          <Spacer y={1} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, bounce: 1 }}
          >
            <Text h2>Check out your email account.</Text>
          </motion.div>
          <Spacer y={1} />
        </Container>
      </AnimatePresence>
    </>
  );
};

export default verifyRequest;
