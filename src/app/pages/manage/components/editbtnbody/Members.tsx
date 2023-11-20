import {
  Label,
  Dropdown,
  Field,
  Option,
  Spinner,
  Body1,
  Button,
  Switch,
} from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
import useTransactions from "../../hooks/useTransactions";
import pb from "src/utils/db/pocketbase";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { membershipsQuery } = useMemberships();
  const { memberUpdateMutation } = useMembers();
  const [registeredDate, setRegisteredDate] = useState<Date>(
    editData?.registeredDate ? new Date(editData?.registeredDate) : new Date()
  );
  const [membership, setMembership] = useState(
    editData?.expand?.membership?.id || ""
  );
  const [isPaid, setIsPaid] = useState(false);

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
  const { transactionAddMutation } = useTransactions();
  const navigate = useNavigate()
  return (
    <Formik
      initialValues={{
        name: editData?.name || "",
        email: editData?.email || "",
        phone: editData?.phone || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Member name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        const mMembership = membershipsQuery.data?.find(
          (element) => element.id === membership
        );

        let membershipExpirationDate: any = "";
        if (mMembership) {
          if (mMembership?.membershipType === "time") {
            membershipExpirationDate = moment(registeredDate).add(
              mMembership?.timeQuantity,
              mMembership?.timeType === "month" ? "months" : "days"
            );
          }
        }

        console.log("valls", {
          id: editData?.id,
          data: {
            ...values,
            registeredDate,
            membership,
            membershipExpirationDate,
          },
        });

        console.log("valls2", editData);

        memberUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
              registeredDate,
              membership,
              membershipExpirationDate,
            },
          },
          {
            onSuccess: (mMember) => {
              if (membership && mMembership) {
                transactionAddMutation.mutate({
                  from: mMembership?.membershipType === "time" ? moment() : "",
                  to:
                    mMembership?.membershipType === "time"
                      ? moment().add(
                          mMembership?.timeQuantity,
                          mMembership?.timeType === "month" ? "months" : "days"
                        )
                      : "",
                  price: mMembership?.price,
                  membership,
                  member: mMember.id,
                  isPaid,
                  assignedTo: pb.authStore.model?.id,
                  deletedAt: "",
                });
              }
              setIsEditDrawerOpen(false);
              //CLOSE MODAL
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {memberUpdateMutation.isPending ? (
          <div>
            <Spinner label="editing member..." />
          </div>
        ) : (
          <>
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
                <label htmlFor="membership">Member membership</label>
                <Dropdown
                  name="membership"
                  id="membership"
                  defaultValue={membership}
                  defaultSelectedOptions={[membership]}
                  onOptionSelect={(_, data) =>
                    setMembership(data.optionValue as string)
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
                <Switch
                  checked={isPaid}
                  onChange={() => setIsPaid(!isPaid)}
                  label="Does the member paid for the membership or he will pay later?"
                />
              </div>
            ) : membershipsQuery.data?.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <Body1>No memberships yet</Body1>
                <Button
                  appearance="outline"
                  onClick={() => navigate("/manage/memberships")}
                >
                  Add Membership
                </Button>
              </div>
            ) : (
              <Spinner
                label="Loading memberships..."
                style={{ marginTop: "12px" }}
              />
            )}
          </>
        )}
      </Form>
    </Formik>
  );
}
