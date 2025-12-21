"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Row>
            <Provider store={store}>
              <Col style={{ textAlign: "center" }}>{children}</Col>
            </Provider>
          </Row>
        </Container>
      </body>
    </html>
  );
}
