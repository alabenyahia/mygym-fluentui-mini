import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import useClasses from "./hooks/useClasses";
import AddBtnBody from "./components/addbtnbody/Classes";
import EditBtnBody from "./components/editbtnbody/Classes";

export default function Programs() {
  const { classesQuery } = useClasses();
  const { classesColumns } = useColumns();

  const classesProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: classesColumns,
    tableData: classesQuery.data || [],
    tableLoading: classesQuery.isFetching || classesQuery.isLoading,
    tableLoadingText: "Loading classes...",
    breadcrumbItems: ["Manage", "Classes"],
    addBtnLabel: "New class",
    filterBtnOnClick: () => {
      console.log("filter classes clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...classesProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}