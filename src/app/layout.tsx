import { Providers } from "@/app/providers";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Col, Container, Row } from "react-bootstrap";
import React from "react";

export const metadata: Metadata = {
  title: "Quiz App Redux",
  description: "Quiz application refactored to use Next.js App Router",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Container>
            <Row>
              <Col className="text-center">{children}</Col>
            </Row>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
