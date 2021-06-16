import React from "react";
import styled from "styled-components";

const CarouselArea = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: scroll;
  > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    margin: 15px;
    cursor: pointer;
    border: 2px solid #333;
    opacity: 0.3;
  }
  > img.active {
    border-color: gray;
    opacity: 1;
  }
`;

const Carousel = ({
  productImages,
  activeProductIndex,
  changeActiveProduct,
}) => {
  return (
    <CarouselArea>
      {productImages.map((image, index) => (
        <img
          onClick={() => changeActiveProduct(index)}
          className={index === activeProductIndex ? "active" : ""}
          key={index}
          src={image}
          alt={image}
        />
      ))}
    </CarouselArea>
  );
};

export default Carousel;
