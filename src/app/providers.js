'use client';

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/redux/store";
import { Container, Row, Col } from "react-bootstrap";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>
              {children}
            </Col>
          </Row>
        </Container>
      </ReduxProvider>
    </SessionProvider>
  );
}
