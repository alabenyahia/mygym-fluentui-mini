import { useColumns } from "./table-columns/main";
import ManageRightLayout from "./layouts/ManageRightLayout";
import useDiscountCodes from "./hooks/useDiscountCodes";
import AddBtnBody from "./components/addbtnbody/DiscountCodes";
import EditBtnBody from "./components/editbtnbody/DiscountCodes";

export default function DiscountCodes() {
  const { discountCodesQuery } = useDiscountCodes();
  const { discountCodesColumns } = useColumns();

  console.log("discount codes", discountCodesQuery.data);

  const discountCodesProps = {
    editBtnBody: <EditBtnBody />,
    tableColumns: discountCodesColumns,
    tableData: discountCodesQuery.data || [],
    tableLoading: discountCodesQuery.isFetching || discountCodesQuery.isLoading,
    tableLoadingText: "Loading discount codes...",
    breadcrumbItems: ["Manage", "Discount codes"],
    addBtnLabel: "New discount code",
    filterBtnOnClick: () => {
      console.log("filter discout code clicked");
    },
  };

  return (
    <>
      <ManageRightLayout {...discountCodesProps}>
        <AddBtnBody />
      </ManageRightLayout>
    </>
  );
}
