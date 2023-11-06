import useMemberships from "src/app/pages/manage/hooks/useMemberships";
import useMembers from "src/app/pages/manage/hooks/useMembers";
import { Card, CardHeader, Spinner, Title3 } from "@fluentui/react-components";
import { useCallback, useMemo } from "react";
export default function Memberships() {
  const { membershipsQuery } = useMemberships();
  const { membersQuery } = useMembers();

  function getMembershipsData() {
    let mMemberships: any = [];
    membershipsQuery.data?.map((membership) => {
      mMemberships.push({
        id: membership.id,
        name: membership.name,
        members: 0,
        price: membership.price,
        totalPrice: 0,
      });
    });

    membersQuery.data?.map((member) => {
      mMemberships.map((membership: any) => {
        if (member.membership === membership.id) {
          membership.members += 1;
          membership.totalPrice += membership.price;
        }
      });
    });

    return mMemberships;
  }


  return (
    <Card style={{maxHeight: "300px"}}>
      <CardHeader header={<Title3>Memberships stats</Title3>} />
      {membershipsQuery.isPending || membersQuery.isPending ? (
        <Spinner label="Loading memberships stats..." />
      ) : (
        <div>
          <table style={{width: "100%", borderSpacing: "10px"}}>
            <thead>
              <tr>
                <th>Membership</th>
                <th>Active members</th>
                <th>Total price</th>
              </tr>
            </thead>
            <tbody>
              {getMembershipsData()?.map((membership: any) => {
                return (
                  <tr>
                    <td>{membership.name}</td>
                    <td>{membership.members}</td>
                    <td>{membership.totalPrice}TND</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td style={{ fontWeight: "bold" }}>
                  {getMembershipsData()?.reduce(
                    (sum: number, membership: any) => sum + membership.members,
                    0
                  )}
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {getMembershipsData()?.reduce(
                    (sum: number, membership: any) =>
                      sum + membership.totalPrice,
                    0
                  )}TND
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Card>
  );
}
