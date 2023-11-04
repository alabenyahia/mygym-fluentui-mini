import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import useCoaches from "./hooks/useCoaches";
import AddBtnBody from "./components/addbtnbody/Coaches";
import EditBtnBody from "./components/editbtnbody/Coaches";

export default function Coaches() {
  const { coachesQuery } = useCoaches();
  const { coachesColumns } = useColumns();

  const coachesProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: coachesColumns,
    tableData: coachesQuery.data || [],
    tableLoading: coachesQuery.isFetching || coachesQuery.isLoading,
    tableLoadingText: "Loading coaches...",
    breadcrumbItems: ["Manage", "Coaches"],
    addBtnLabel: "New coach",
    filterBtnOnClick: () => {
      console.log("filter coaches clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...coachesProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}
