"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Dropdown, Button, Spinner } from "react-bootstrap";

export default function UserButton() {
  const { data: session, status } = useSession();

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <Button variant="secondary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-label="Loading..."
        />
      </Button>
    );
  }

  if (session?.user) {
    return (
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="secondary"
          id="user-menu-dropdown"
          className="d-flex align-items-center gap-2"
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name ?? "User avatar"}
              width={32}
              height={32}
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span>{session.user.name ?? "User"}</span>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header>
            <div className="d-flex flex-column">
              {session.user.name && (
                <strong className="mb-1">{session.user.name}</strong>
              )}
              {session.user.email && (
                <small className="text-muted">{session.user.email}</small>
              )}
            </div>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item
            as="button"
            onClick={() => signOut()}
            className="text-danger"
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Button
      variant="primary"
      onClick={() => signIn("github")}
      aria-label="Sign in with GitHub"
    >
      Sign in with GitHub
    </Button>
  );
}
