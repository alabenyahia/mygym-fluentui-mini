import Members from "./components/Members";
import MembersGraph from "./components/MembersGraph";
import Memberships from "./components/Memberships";
import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from "@fluentui/react-components";

export default function Reports() {
  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <MessageBar intent="warning">
        <MessageBarBody>
          <MessageBarTitle>Page not finished yet.</MessageBarTitle>
          Reports center page is not complete yet, more reports and graphs will
          be added soon.
        </MessageBarBody>
      </MessageBar>

      <div style={{ display: "flex", gap: "12px"}}>
      <Members >{/* <MembersGraph /> */}</Members>
        <Memberships />
      </div>
    </div>
  );
}
