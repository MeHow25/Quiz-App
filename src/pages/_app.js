import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Container, Row, Col } from "react-bootstrap";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Component {...pageProps} />
            </Col>
          </Row>
        </Container>
      </ReduxProvider>
    </SessionProvider>
  );
}

export default MyApp;
