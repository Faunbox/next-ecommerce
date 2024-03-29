import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Text } from "@nextui-org/react";
import FirstImage from "../public/slider/glass-g14c33741c_1280.jpg";
import SecondImage from "../public/slider/makeup-g851ce7124_1280.jpg";
import ThirdImage from "../public/slider/soap-g595e3af38_1280.jpg";
const Slider = () => {
  const [current, setCurrent] = useState(0);

  const sliderImagesArr = [FirstImage, SecondImage, ThirdImage];
  const h2Text = [
    "All you need for perfect makeup",
    "Makeup brushes for professionals",
    "Best products for bodycare",
  ];
  const length = sliderImagesArr.length - 1;
  const intervalTime = 5000;

  const nextSlide = () => {
    if (current > length) return setCurrent(0);
    return setCurrent((prevState) =>
      prevState === length ? 0 : prevState + 1
    );
  };

  const prevSlide = () => {
    if (current < 0) return setCurrent(length);
    return setCurrent((prevState) =>
      prevState === 0 ? length : prevState - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevState) => (prevState === length ? 0 : prevState + 1));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <Container
      justify="center"
      display="none"
      css={{ "@xs": { display: "block" }, maxW: "1000px" }}
    >
      {sliderImagesArr.map((image, imageIndex) => {
        return (
          imageIndex === current && (
            <Container
              key={imageIndex}
              css={{
                position: "relative",
              }}
            >
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Container css={{ position: "relative" }}>
                    <Image
                      src={image}
                      alt={"alt"}
                      style={{
                        borderRadius: "12px",
                      }}
                    />
                    <Text
                      h2
                      css={{
                        position: "absolute",
                        bottom: "10%",
                        left: "50%",
                        color: "White",
                        transform: "translate(-50%, 0)",
                      }}
                    >
                      {h2Text[imageIndex]}
                    </Text>
                    <Text
                      size={30}
                      css={{
                        position: "absolute",
                        bottom: "50%",
                        right: "7%",
                        color: "White",
                        cursor: "pointer",
                        transform: "translate(-50%, 50%)",
                      }}
                      onClick={() => nextSlide()}
                    >
                      {">"}
                    </Text>
                    <Text
                      size={30}
                      css={{
                        position: "absolute",
                        bottom: "50%",
                        left: "7%",
                        color: "White",
                        transform: "translate(-50%, 50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => prevSlide()}
                    >
                      {"<"}
                    </Text>
                  </Container>
                </motion.div>
              </AnimatePresence>
            </Container>
          )
        );
      })}
    </Container>
  );
};

export default Slider;
