import ManageRightLayout from "./layouts/ManageRightLayout";
import { useColumns } from "./table-columns/main";
import useMembers from "./hooks/useMembers";
import AddBtnBody from "./components/addbtnbody/Members";
import moment from "moment";
import EditBtnBody from "./components/editbtnbody/Members";

export default function Members() {
  const { membersQuery } = useMembers();
  const {membersColumns} = useColumns()

  const tableData = membersQuery.data
    ? membersQuery.data.map((member) => {
      const currency = "TND"
      const membership =member.expand?.membership ? `${member.expand?.membership?.name} (${member.expand?.membership?.price}${currency})` : ""
        return {
          ...member,
          membership,
          membershipExpirationDate: member.membershipExpirationDate
            ? moment(member.membershipExpirationDate).format("LL")
            : "",
          registeredDate: member.registeredDate
            ? moment(member.registeredDate).format("LL")
            : "",
        };
      })
    : [];
  const membersProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: membersColumns,
    tableData,
    tableLoading: membersQuery.isFetching || membersQuery.isLoading,
    tableLoadingText: "Loading members...",
    breadcrumbItems: ["Manage", "Members"],
    addBtnLabel: "New member",
    filterBtnOnClick: () => {
      console.log("filter members clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...membersProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}
