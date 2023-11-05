import { Card, CardHeader, Title3, Image } from "@fluentui/react-components";

export default function GetStarted() {
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Image width={64} height={64} src="/icons/icon-rocket.png"></Image>
            <Title3>Get Started with MyGym</Title3>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              outline: "1px solid black",
              padding: "8px",
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <p>You are done in</p>
            <span>67%</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
