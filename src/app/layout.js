import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz Game",
  description: "Check your knowledge!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>{children}</Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}
