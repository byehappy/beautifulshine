"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./registry";
import { styled } from "styled-components";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/navBar/header";
import Footer from "@/components/navBar/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <StyledComponentsRegistry>
            <Header/>
            {children}
            <Footer/>
          </StyledComponentsRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
