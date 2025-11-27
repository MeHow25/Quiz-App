"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
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
