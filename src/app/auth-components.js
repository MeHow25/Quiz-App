import { Button } from "react-bootstrap";
import { signIn, signOut } from "auth";

export function SignIn({ provider, ...props }) {
  return (
    <form
      action={async () => {
        "use server";

        console.log("provider", provider);
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
