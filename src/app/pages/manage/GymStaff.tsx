import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import useGymStaff from "./hooks/useGymStaff";
import AddBtnBody from "./components/addbtnbody/GymStaff";
import EditBtnBody from "./components/editbtnbody/GymStaff";

export default function GymStaff() {
  const { gymStaffQuery } = useGymStaff();
  const { gymStaffColumns } = useColumns();

  const gymStaffProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: gymStaffColumns,
    tableData: gymStaffQuery.data || [],
    tableLoading: gymStaffQuery.isFetching || gymStaffQuery.isLoading,
    tableLoadingText: "Loading gym staff...",
    breadcrumbItems: ["Manage", "Gym staff"],
    addBtnLabel: "New gym staff",
    filterBtnOnClick: () => {
      console.log("filter gym staff clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...gymStaffProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}