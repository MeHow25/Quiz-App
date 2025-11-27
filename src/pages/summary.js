import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { selectFinishedAt, selectStartedAt } from "./game-slice";

export function Summary(props) {
  const finishedAt = useSelector(selectFinishedAt);
  const startedAt = useSelector(selectStartedAt);
  const time = moment(finishedAt - startedAt).format("m:ss.SS");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Congratulations!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>Your time: {time}</h1>
        <p>Share it to your friends:</p>
        <FacebookShareButton url="https://www.example.com">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton
          url="https://www.example.com"
          appId="https://www.example.com"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <TwitterShareButton url="https://www.example.com">
          <XIcon size={32} round />
        </TwitterShareButton>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
