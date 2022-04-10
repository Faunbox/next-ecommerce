import Image from "next/image";
import firstImage from "../public/slider/glass-g14c33741c_1280-min.jpg";
import secondImage from "../public/slider/makeup-g851ce7124_1280-min.jpg";
import thirdImage from "../public/slider/soap-g595e3af38_1280-min.jpg";
import { useEffect, useState } from "react";
import { Container, Text } from "@nextui-org/react";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const sliderImagesArr = [firstImage, secondImage, thirdImage];
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
  }, []);

  return (
    <Container
      justify="center"
      display="none"
      css={{ "@xs": { display: "block" }, maxW: "1000px" }}
    >
      {sliderImagesArr.map((image, imageIndex) => {
        return (
          imageIndex === current && (
            <Container key={imageIndex} css={{ position: "relative" }}>
              <Container css={{ position: "relative" }}>
                <Image src={image} alt={"alt"} />
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
                  }}
                  onClick={() => prevSlide()}
                >
                  {"<"}
                </Text>
              </Container>
              <Container></Container>
            </Container>
          )
        );
      })}
    </Container>
  );
};

export default Slider;
