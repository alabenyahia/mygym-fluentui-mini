import { Label, Dropdown, Field, Option } from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-date-time";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";

export default function Members() {
  const { membershipsQuery } = useMemberships();
  const { memberMutation } = useMembers();
  const [registeredDate, setRegisteredDate] = useState<Date>(new Date());
  const [membershipId, setMembershipId] = useState("");

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Member name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        const membership = membershipsQuery.data?.find(
          (element) => element.id === membershipId
        );

        let membershipExpirationDate: any = "";
        if (membership) {
          if (membership?.membershipType === "time") {
            membershipExpirationDate = moment(registeredDate)
              .add(
                membership?.timeQuantity,
                membership?.timeType === "month" ? "months" : "days"
              )
          }
        }

        console.log("valls", {
          ...values,
          registeredDate,
          membershipId,
          membershipExpirationDate,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        memberMutation.mutate(
          {
            ...values,
            registeredDate,
            membershipId,
            membershipExpirationDate,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: () => {
              resetForm({
                values: {
                  name: "",
                  email: "",
                  phone: "",
                },
              });
              setMembershipId("");
              setRegisteredDate(new Date());
            },
          }
        );
      }}
    >
      <Form id="add-form" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <div>
          <Label htmlFor="name" required>
            Member name
          </Label>
          <FormikInput placeholder="John Doe" name="name" id="name" />
        </div>

        <div>
          <Label htmlFor="email">Member email</Label>
          <FormikInput
            placeholder="example@email.com"
            name="email"
            id="email"
          />
        </div>

        <div>
          <Label htmlFor="phone">Member phone</Label>
          <FormikInput placeholder="23 111 222" name="phone" id="phone" />
        </div>

        <div>
          <Field label="Member registration date">
            <DatePicker
              placeholder="Select a date..."
              id="registeredDate"
              value={registeredDate}
              onSelectDate={(date) => setRegisteredDate(date!)}
              showGoToToday={true}
            />
          </Field>
        </div>

        {membershipsQuery.data && membershipsQuery.data?.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="membershipId">Member membership</label>
            <Dropdown
              name="membershipId"
              id="membershipId"
              onOptionSelect={(_, data) =>
                setMembershipId(data.optionValue as string)
              }
            >
              {membershipsQuery.data?.map((membership: any) => {
                const currency = "TND";
                return (
                  <Option
                    text={`${membership.name} ${membership.price}${currency}`}
                    value={membership.id}
                    key={membership.id}
                  >{`${membership.name} ${membership.price}${currency}`}</Option>
                );
              })}
            </Dropdown>
          </div>
        ) : null}
      </Form>
    </Formik>
  );
}
