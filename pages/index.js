import { Button } from "react-bootstrap";
import styles from "../styles/Home.module.scss";

const About = () => {
  return (
    <main className={styles.main}>
      <div>Hello there! Welcome to our store!</div>
      <Button>Check our store!</Button>
    </main>
  );
};

export default About;
