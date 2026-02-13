import Main from "@/components/main";
import UserButton from "@/components/user-button";

export default function HomePage() {
  return (
    <>
      <div className="user-button-container position-absolute top-0 end-0 p-3">
        <UserButton />
      </div>
      <Main />
    </>
  );
}
