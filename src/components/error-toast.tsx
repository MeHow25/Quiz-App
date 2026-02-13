import { Toast } from "react-bootstrap";

interface ErrorToastProps {
  show: boolean;
  onClose: () => void;
  className?: string;
  "data-testid"?: string;
}

export function ErrorToast({ show, onClose, ...props }: ErrorToastProps) {
  return (
    <Toast show={show} onClose={onClose} {...props} delay={5000} autohide>
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>No results. Try setting different options.</Toast.Body>
    </Toast>
  );
}
