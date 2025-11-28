import { Toast } from "react-bootstrap";

export function ErrorToast(props) {
  return (
    <Toast {...props} delay={5000} autohide>
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>No results. Try setting different options.</Toast.Body>
    </Toast>
  );
}
