import Footer from "./Footer";
import Nav from "./Nav";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
