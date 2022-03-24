import Image from "next/image";
import styled from "styled-components";
import chanel from "../public/brands/chanel.png";
import lancome from "../public/brands/lancome.png";
import prada from "../public/brands/prada.png";
import loreal from "../public/brands/loreal.png";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
  width: auto;
  margin-right: auto;
  margin-left: auto;
`;

const BrandCarusel = () => {
  const sliderImagesArr = [
    { name: "chanel", image: chanel },
    { name: "lancome", image: lancome },
    { name: "prada", image: prada },
    { name: "loreal", image: loreal },
  ];
  return (
    <StyledDiv>
      {sliderImagesArr.map((image) => (
        <Image
          key={image.name}
          src={image.image}
          alt={image.name}
          width={100}
          height={100}
        />
      ))}
    </StyledDiv>
  );
};

export default BrandCarusel;
