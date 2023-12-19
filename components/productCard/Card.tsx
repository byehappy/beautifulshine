"use client";

import styled from "styled-components";
import Image from "next/image";
import ProductData from "@/interfaces/product";
import Link from "next/link";
import { addToCart, addToFavorites } from "@/utils/product";
const Container = styled.div`
  width: 15vw;
  display: flex;
  justify-content: flex-start;
  padding-top: 2vw;
  flex-direction: column;
`;
export const Picture = styled(Image)`
  border-radius: 2vw;
  height: 100%;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
`;
const Name = styled.div`
  width: 10vw;
  margin: 1vw auto;
  display: flex;
  justify-content: center;
  font-weight: 800;
`;
const Price = styled.div`
  display: flex;
  justify-content: center;
`;
const Buy = styled.button`
  background: black;
  color: white;
  border-radius: 1vw;
  border: none;
  height: 3vw;
  cursor: pointer;
`;

export default function CardProduct(props: ProductData) {
  return (
    <Container>
      <Link href={`/pages/product/${props.id}`}>
        <Picture
          src={`/images/product/${props.imageName}.jpg`}
          alt={"picture"}
          width={1920}
          height={1080}
          style={{minHeight:'20vw',maxHeight:'20vw'}}
        />
      </Link>
      <Name>{props.name}</Name>
      <Price>{props.price}</Price>
      <div
        style={{
          width: "13.5vw",
          margin: "1vw auto",
          display: "flex",
          gap: ".5vw",
          justifyContent:'center'
        }}
      >
        <Buy style={{ width: "10vw" }}onClick={()=>addToCart(props)}>Купить</Buy>
      </div>
    </Container>
  );
}
