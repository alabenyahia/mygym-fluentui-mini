import { Card, CardHeader, Spinner, Title3 } from "@fluentui/react-components";
import useMembers from "src/app/pages/manage/hooks/useMembers";

export default function Members({children}: any) {
  const { membersQuery } = useMembers();
  return (
    <Card>
      <CardHeader header={<Title3>Members stats</Title3>} />
      {membersQuery.isPending ? (
        <Spinner label="Loading members stats..." />
      ) : (
        <div>
          <div style={{ display: "flex", gap: "3px" }}>
            <p>Total members: </p>
            <span style={{ fontWeight: "bold" }}>
              {membersQuery.data?.length}
            </span>
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            <p>Total members with membership: </p>
            <span style={{ fontWeight: "bold" }}>
              {
                membersQuery.data?.filter((member) => member.membership !== "")
                  .length
              }
            </span>
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            <p>Total members this month: </p>
            <span style={{ fontWeight: "bold" }}>
            {
                membersQuery.data?.filter((member) => {
                    const registered = new Date(member.registeredDate);
                    return registered.getMonth() === new Date().getMonth()
                })
                  .length
              }
            </span>
          </div>

          <div style={{marginTop: "20px"}}>
            {children}
          </div>
        </div>

      )}
    </Card>
  );
}
