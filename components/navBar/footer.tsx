import Link from "next/link"
import styled from "styled-components";

const FooterContainer = styled.footer`
  margin-top:auto;
  width: 100%;
  background: #29292c;
  display: flex;
  height: 4vw;
  padding: 0 5vw;
  align-items: center;
  justify-content: space-between;
`;

export default function Footer (){

    return(
        <FooterContainer>
              <div
                style={{
                  gap: "2vw",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Link href="/">Beautiful Shine</Link>
                <Link href="/pages/catalog">Каталог</Link>
                <Link href="/pages/contact">Конаткты</Link>
              </div>
            </FooterContainer>
    )
}