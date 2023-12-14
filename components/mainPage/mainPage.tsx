'use client'

import styled from "styled-components";

const Container = styled.div`
  width: 85vw;
  margin: 2vw auto;
`

export default function MainPage() {
    return (
        <Container>
            <h2 style={{textAlign:'center'}}>Ваши потребности - наш приоритет.</h2>
        </Container>
    );
};