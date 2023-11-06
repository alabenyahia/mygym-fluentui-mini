import Members from "./components/Members";
import Memberships from "./components/Memberships";

export default function Reports() {

  return (
    <div style={{display: "flex", gap: "12px"}}>
      <Members/>
      <Memberships/>
    </div>
  );
}
