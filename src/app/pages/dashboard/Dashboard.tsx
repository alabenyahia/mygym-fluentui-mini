import GetStarted from "./components/GetStarted";
import { useMediaQuery } from "react-responsive";
import Members from "./components/Members";

export default function Dashboard() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });

  return (
    <div>
<div style={{display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px"}}>
      
      <GetStarted/>
      <Members/>
    </div>
    </div>
    
  );
}
