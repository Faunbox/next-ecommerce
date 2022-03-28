import { Carousel } from "react-bootstrap";
import Image from "next/image";
import firstImage from "../public/slider/glass-g14c33741c_1280.jpg";
import secondImage from "../public/slider/makeup-g851ce7124_1280.jpg";
import thirdImage from "../public/slider/soap-g595e3af38_1280.jpg";
import { useState } from "react";
import { Text } from "@nextui-org/react";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image className="d-block w-100" src={firstImage} alt="First slide" />
        <Carousel.Caption>
          <Text h3 style={{ color: "white" }}>
            First slide label
          </Text>
          <Text style={{ color: "white" }}>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </Text>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={secondImage} alt="Second slide" />

        <Carousel.Caption>
          <Text h3 style={{ color: "white" }}>
            Second slide label
          </Text>
          <Text style={{ color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image className="d-block w-100" src={thirdImage} alt="Third slide" />

        <Carousel.Caption>
          <Text h3 style={{ color: "white" }}>
            Third slide label
          </Text>
          <Text style={{ color: "white" }}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </Text>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
