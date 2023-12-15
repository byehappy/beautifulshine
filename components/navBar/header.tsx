"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  display: flex;
  height: 5vw;
  padding: 0 5vw 0 5vw;
  align-items: center;
  justify-content: space-between;
`;
export default function Header() {
  const session = useSession();
  return (
    <HeaderContainer>
      <div style={{ gap: "2vw", display: "flex", alignItems: "center" }}>
        <Link href={"/"}>
          <Image src="/images/logo.png" width={50} height={50} alt={"logo"} />
        </Link>
        <Link href="/">Beautiful Shine</Link>
        <Link href="/pages/catalog">Каталог</Link>
        <Link href="/pages/contact">Контакты</Link>
      </div>
      <div style={{ gap: "2vw", display: "flex" , alignItems:"center"}}>
        {session.status === "authenticated" && (
          <>
            <Link href={`/pages/dashboard/${session.data.user.id}`}>
              Привет {session.data?.user?.name}
            </Link>
            <button onClick={() => signOut()}>Выйти</button>
            {session.data.user.admin === true && (
              <Link href={'/pages/admin'}>Админ панель</Link>
            )}
          </>
        )}
        {(session.status === "unauthenticated") && (
          <>
            <Link href="/pages/auth/registration">Регистрация</Link>
            <Link href="/pages/auth/login">Авторизация</Link>
          </>
        )}
        {(session.status === "loading") && (
          <>Проверка авторизации</>
        )}
        <Link href={"/pages/cart"}>
          <Image src="/icons/cart.png" alt="cart" width={35} height={35} />
        </Link>
      </div>
    </HeaderContainer>
  );
}
