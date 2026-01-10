"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/redux/store";
import { Container, Row, Col } from "react-bootstrap";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <Container>
          <Row>
            <Col className="text-center">{children}</Col>
          </Row>
        </Container>
      </ReduxProvider>
    </SessionProvider>
  );
}
