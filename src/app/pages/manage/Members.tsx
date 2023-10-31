import ManageRightLayout from "./layouts/ManageRightLayout";
import { membersColumns } from "./data/main";
import { Toaster } from "@fluentui/react-components";
import useMembers from "./hooks/useMembers";
import AddBtnBody from "./components/addbtnbody/Members";
import moment from "moment";

export default function Members() {
  const { membersQuery, membersToasterId } = useMembers();

  const tableData = membersQuery.data
    ? membersQuery.data.map((member) => {
        return {
          ...member,
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
    tableColumns: membersColumns,
    tableData,
    tableLoading: membersQuery.isFetching || membersQuery.isLoading,
    tableLoadingText: "Loading members...",
    breadcrumbItems: ["Manage", "Members"],
    addBtnLabel: "New member",
    addBtnOnClick: () => {
      console.log("add member clicked");
    },
    filterBtnOnClick: () => {
      console.log("filter members clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...membersProps}>
        <AddBtnBody />
      </ManageRightLayout>
      <Toaster toasterId={membersToasterId} />
    </>
  );
}
