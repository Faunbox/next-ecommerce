import Image from "next/image";
import firstImage from "../public/slider/glass-g14c33741c_1280.jpg";
import secondImage from "../public/slider/makeup-g851ce7124_1280.jpg";
import thirdImage from "../public/slider/soap-g595e3af38_1280.jpg";
import { useEffect, useState } from "react";
import { Container, Text } from "@nextui-org/react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const imageArray = [firstImage, secondImage, thirdImage];
  const imageArrayLength = imageArray.length - 1;
  const time = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index === imageArrayLength ? 0 : index + 1);
    }, time);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container justify="center">
      {imageArray.map((image, imageIndex) => {
        return imageIndex === index && <Image src={image} alt={"alt"} />;
      })}
    </Container>
  );
};

export default Slider;
