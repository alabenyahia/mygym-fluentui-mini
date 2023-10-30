import ManageRightLayout from "./layouts/ManageRightLayout";
import { membersColumns } from "./data/main";
import { Toaster } from "@fluentui/react-components";
import  useMembers  from "./hooks/useMembers";

export default function Members() {
  const {memberMutation, membersQuery, membersToasterId} = useMembers();

  const membersProps = {
    tableColumns: membersColumns,
    tableData: membersQuery.data || [],
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
      <ManageRightLayout {...membersProps} />
      <Toaster toasterId={membersToasterId} />
    </>
  );
}
