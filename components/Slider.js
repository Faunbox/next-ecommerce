import Image from "next/image";
import firstImage from "../public/slider/glass-g14c33741c_1280.jpg";
import secondImage from "../public/slider/makeup-g851ce7124_1280.jpg";
import thirdImage from "../public/slider/soap-g595e3af38_1280.jpg";
import { useEffect, useState } from "react";
import { Container, Text } from "@nextui-org/react";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const sliderImagesArr = [firstImage, secondImage, thirdImage];
  const length = sliderImagesArr.length - 1;
  const time = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevState) => (prevState === length ? 0 : prevState + 1));
    }, time);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container justify="center">
      {sliderImagesArr.map((image, imageIndex) => {
        return (
          imageIndex === current && (
            <Image key={image} src={image} alt={"alt"} />
          )
        );
      })}
    </Container>
  );
};

export default Slider;
