import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import usePrograms from "./hooks/usePrograms";
import AddBtnBody from "./components/addbtnbody/Programs";
import EditBtnBody from "./components/editbtnbody/Programs";

export default function Programs() {
  const { programsQuery } = usePrograms();
  const { programsColumns } = useColumns();

  const programsProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: programsColumns,
    tableData: programsQuery.data || [],
    tableLoading: programsQuery.isFetching || programsQuery.isLoading,
    tableLoadingText: "Loading programs...",
    breadcrumbItems: ["Manage", "Programs"],
    addBtnLabel: "New program",
    filterBtnOnClick: () => {
      console.log("filter programs clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...programsProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}
