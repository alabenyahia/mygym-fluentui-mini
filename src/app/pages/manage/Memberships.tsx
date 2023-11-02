import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import useMemberships from "./hooks/useMemberships";
import AddBtnBody from "./components/addbtnbody/Memberships";

export default function Memberships() {
  const { membershipsQuery } =
    useMemberships();
  const { membershipsColumns } = useColumns();

  const membershipsProps = {
    tableColumns: membershipsColumns,
    tableData: membershipsQuery.data || [],
    tableLoading: membershipsQuery.isFetching || membershipsQuery.isLoading,
    tableLoadingText: "Loading memberships...",
    breadcrumbItems: ["Manage", "Memberships"],
    addBtnLabel: "New membership",
    filterBtnOnClick: () => {
      console.log("filter memberships clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...membershipsProps} >
      <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}
