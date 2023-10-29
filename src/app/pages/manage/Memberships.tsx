import { membershipsColumns } from "./data/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import { Toaster } from "@fluentui/react-components";
import  useMemberships  from "./hooks/useMemberships";


export default function Memberships() {
  const {membershipMutation, membershipsQuery, membershipsToasterId} = useMemberships();

  const membershipsProps = {
    tableColumns: membershipsColumns,
    tableData: membershipsQuery.data || [],
    breadcrumbItems: ["Manage", "Memberships"],
    addBtnLabel: "New membership",
    addBtnOnClick: () => {
      console.log("add membership clicked");
    },
    filterBtnOnClick: () => {
      console.log("filter memberships clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...membershipsProps} />
      <Toaster toasterId={membershipsToasterId} />
    </>
  );
}
