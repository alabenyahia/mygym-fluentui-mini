import GetStarted from "./components/GetStarted";
import { useMediaQuery } from "react-responsive";
import Members from "./components/Members";
import Memberships from "../reports/components/Memberships";

export default function Dashboard() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });

  return (
    <div
      style={{
        maxHeight: isMobile ? "none" : "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "12px",
        }}
      >
        <div style={{ flex: 4 }}>
          <GetStarted />
        </div>

        <div style={{ flex: 3 }}>
          <Memberships />
        </div>
      </div>

      <div style={{ flex: 1, maxHeight: isMobile ? "380px" : "none" }}>
        <Members />
      </div>
    </div>
  );
}
