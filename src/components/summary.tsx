import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { selectFinishedAt, selectStartedAt } from "@/lib/redux/game-slice";
import { LeaderboardEntry } from "@/lib/services/types";

interface SummaryProps {
  show: boolean;
  onHide: () => void;
}

export function Summary(props: SummaryProps) {
  const finishedAt = useSelector(selectFinishedAt);
  const startedAt = useSelector(selectStartedAt);
  const time = moment(finishedAt - startedAt).format("m:ss.SS");
  const playerTime = finishedAt - startedAt;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerPosition, setPlayerPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) {
          setError("Failed to fetch leaderboard");
          setLoading(false);
          return;
        }
        const data: LeaderboardEntry[] = await response.json();
        const sortedData = data.sort((a, b) => a.time - b.time);

        const position =
          sortedData.findIndex((entry) => entry.time > playerTime) + 1;
        setPlayerPosition(position > 0 ? position : sortedData.length + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [playerTime]);

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
        {loading && (
          <div className="text-center mt-3">
            <Spinner animation="border" variant="primary" size="sm" />
          </div>
        )}
        {error && (
          <Alert variant="warning" className="mt-3">
            Could not determine leaderboard position
          </Alert>
        )}
        {!loading && !error && playerPosition && (
          <Alert variant="info" className="mt-3">
            <strong>You are #{playerPosition} on the leaderboard!</strong>
          </Alert>
        )}
        <p className="mt-4">Share it to your friends:</p>
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
