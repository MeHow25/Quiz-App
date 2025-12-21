"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Dropdown, Button, Image } from "react-bootstrap";

export default function UserButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User avatar"}
                width={32}
                height={32}
                roundedCircle
              />
            ) : (
              <span className="text-sm">{session.user.name}</span>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Header>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name}
                </p>
                <p className="text-xs text-muted">{session.user.email}</p>
              </div>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item as="button" onClick={() => signOut()}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <Button variant="primary" onClick={() => signIn("github")}>
      Zaloguj przez GitHub
    </Button>
  );
}
