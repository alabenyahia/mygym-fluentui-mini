import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useMembers from "../../manage/hooks/useMembers";
import { useEffect, useState } from "react";
import { Label, Dropdown, Option } from "@fluentui/react-components";
import moment from "moment";

export default function MembersGraph() {
  const [period, setPeriod] = useState("all");
  const { membersQuery } = useMembers();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (membersQuery.data) {
        let mData = membersQuery.data
      switch (period) {
        case "all":
            break;
        case "day":
            mData = membersQuery.data.filter((member) => {
                const registered = new Date(member.registeredDate);
                return registered.getDate() === new Date().getDate()
            })
            break;
        case "week":
            mData = membersQuery.data.filter((member) => {
                const registered = new Date(member.registeredDate);
                moment(registered).isSame(new Date(), 'week')
            })
            break;
        case "month":
            mData = membersQuery.data.filter((member) => {
                const registered = new Date(member.registeredDate);
                moment(registered).isSame(new Date(), 'month')
            })
            break;
      }
    } else return;
  }, [period, membersQuery.data]);

  return (
    <div>
      <Label htmlFor="membershipType" required>
        Select period
      </Label>
      <Dropdown
        name="period"
        id="period"
        onOptionSelect={(_, data) => setPeriod(data.optionValue as string)}
      >
        <Option text="All" value="all" key="all">
          All
        </Option>

        <Option text="Today" value="day" key="day">
          Today
        </Option>

        <Option text="This week" value="week" key="week">
          This week
        </Option>

        <Option text="This month" value="month" key="month">
          This month
        </Option>
      </Dropdown>

      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
