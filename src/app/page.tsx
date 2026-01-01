import Main from "@/components/main";
import UserButton from "@/components/user-button";

export default function HomePage() {
  return (
    <>
      <div
        className="d-flex justify-content-end p-3"
        style={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}
      >
        <UserButton />
      </div>
      <Main />
    </>
  );
}
