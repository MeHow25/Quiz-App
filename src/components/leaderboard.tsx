"use client";

import { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button } from "react-bootstrap";
import moment from "moment";

interface LeaderboardEntry {
  id: string | number;
  nickname: string;
  time: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(10);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) {
          setError("Failed to fetch leaderboard");
          setLoading(false);
          return;
        }
        const data = await response.json();
        const sortedData = data.sort((a: LeaderboardEntry, b: LeaderboardEntry) => a.time - b.time);
        setLeaderboardData(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const showMore = () => {
    setDisplayedCount((prevCount) => prevCount + 10);
  };

  const displayedData = leaderboardData.slice(0, displayedCount);
  const hasMoreData = displayedCount < leaderboardData.length;

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error loading leaderboard: {error}</Alert>;
  }

  if (leaderboardData.length === 0) {
    return <Alert variant="info">No leaderboard entries found</Alert>;
  }

  return (
    <div className="mt-5">
      <h2>Leaderboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nickname</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.nickname}</td>
              <td>{moment(entry.time).format("m:ss.SS")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {hasMoreData && (
        <div className="text-center mb-4">
          <Button onClick={showMore} variant="primary" className="">
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
