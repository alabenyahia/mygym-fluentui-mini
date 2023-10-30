import ManageRightLayout from "./layouts/ManageRightLayout";
import { membersColumns } from "./data/main";
import { Toaster } from "@fluentui/react-components";
import useMembers from "./hooks/useMembers";
import AddBtnBody from "./components/addbtnbody/Members";
import {useState} from "react";
import moment from "moment";

export default function Members() {
  const { memberMutation, membersQuery, membersToasterId } = useMembers();
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhone] = useState("")
  // const [registeredDate, setRegisteredDate] = useState(moment()) //convert it to string when sending to db
  // const [membershipId, setMembershipId] = useState("")

  // const data = {
  //   name: {
  //     value: name,
  //     setValue: setName,
  //   },
  //   email: {
  //     value: email,
  //     setValue: setEmail,
  //   },
  //   phone: {
  //     value: phone,
  //     setValue: setPhone,
  //   },
  //   registeredDate: {
  //     value: registeredDate,
  //     setValue: setRegisteredDate,
  //   },
  //   membershipId: {
  //     value: membershipId,
  //     setValue: setMembershipId,
  //   },
  // }

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
      <ManageRightLayout {...membersProps}>
        <AddBtnBody />
      </ManageRightLayout>
      <Toaster toasterId={membersToasterId} />
    </>
  );
}
