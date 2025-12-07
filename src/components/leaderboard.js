"use client";

import { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const sortedData = data.sort((a, b) => a.time - b.time);
        setLeaderboardData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

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
          {leaderboardData.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.nickname}</td>
              <td>{entry.time.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
