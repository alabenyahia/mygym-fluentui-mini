import { Card, Button } from "@fluentui/react-components";
import { Add24Regular, Filter24Regular } from "@fluentui/react-icons";
import AppBreadcrumb from "../components/ManageBreadcrumb";
import AppSeach from "../components/ManageSeach";
import AppTable from "../components/ManageTable";
import { useState } from "react";
import { AddBtnClickedLayout } from "./AddBtnClickedLayout";

export default function ManageRightLayout({
  children,
  tableColumns,
  tableData,
  tableLoading,
  tableLoadingText,
  breadcrumbItems,
  addBtnLabel,
  addBtnOnClick,
  filterBtnOnClick,
}: any) {
  const [searching, setSearching] = useState("");
  const [addBtnDrawerOpen, setAddBtnDrawerOpen] = useState(false);

  return (
    <Card style={{ flex: 1, boxShadow: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 0,
        }}
      >
        <AppBreadcrumb items={breadcrumbItems} />
        <Button
          appearance="primary"
          icon={<Add24Regular />}
          size="medium"
          onClick={() => setAddBtnDrawerOpen(true)}
        >
          {addBtnLabel}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 0,
          gap: "6px",
        }}
      >
        <AppSeach value={searching} setValue={setSearching} />
        <Button
          appearance="primary"
          icon={<Filter24Regular />}
          size="medium"
          onClick={filterBtnOnClick}
        ></Button>
      </div>

      <div style={{ overflow: "auto", flexGrow: 0 }}>
        <AppTable
          searching={searching}
          setSearching={setSearching}
          columns={tableColumns}
          data={tableData}
          isLoading={tableLoading}
          loadingText={tableLoadingText}
          addBtnLabel={addBtnLabel}
          addBtnOnClick={addBtnOnClick}
        />
      </div>
      <AddBtnClickedLayout
        open={addBtnDrawerOpen}
        setOpen={setAddBtnDrawerOpen}
        title={addBtnLabel}
        createBtnOnClick={() => console.log("CREATE BTN CLICKED!!")}
      >
        {children}
      </AddBtnClickedLayout>
    </Card>
  );
}
