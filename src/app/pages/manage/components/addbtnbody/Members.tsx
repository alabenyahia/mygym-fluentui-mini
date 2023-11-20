import {
  Label,
  Dropdown,
  Field,
  Option,
  Spinner,
  Switch,
} from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import useTransactions from "../../hooks/useTransactions";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import useLogin from "src/app/pages/auth/hooks/useLogin";

export default function Members() {
  const { membershipsQuery } = useMemberships();
  const { transactionAddMutation } = useTransactions();
  const { memberMutation } = useMembers();
  const [registeredDate, setRegisteredDate] = useState<Date>(new Date());
  const [membership, setMembership] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const { getUserQuery, updateTaskMutation } = useLogin();

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
          ...values,
          registeredDate,
          membership,
          membershipExpirationDate,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        memberMutation.mutate(
          {
            ...values,
            registeredDate,
            membership,
            membershipExpirationDate,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: (mMember) => {
              if (getUserQuery.data?.getStarted[2].isDone === false) {
                const temp = [...getUserQuery.data?.getStarted];
                temp[2].isDone = true;
                updateTaskMutation.mutate({ getStarted: temp });
              }

              resetForm({
                values: {
                  name: "",
                  email: "",
                  phone: "",
                },
              });
              setMembership("");
              setRegisteredDate(new Date());

              if (membership && mMembership) {
                transactionAddMutation.mutate(
                  {
                    from:
                      mMembership?.membershipType === "time" ? moment() : "",
                    to:
                      mMembership?.membershipType === "time"
                        ? moment().add(
                            mMembership?.timeQuantity,
                            mMembership?.timeType === "month"
                              ? "months"
                              : "days"
                          )
                        : "",
                    price: mMembership?.price,
                    membership,
                    member: mMember.id,
                    isPaid,
                    assignedTo: pb.authStore.model?.id,
                    deletedAt: "",
                  },
                  {
                    onSuccess: () => {
                      setIsPaid(false);
                    },
                  }
                );
              }
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {memberMutation.isPending ? (
          <div>
            <Spinner label="Adding member..." />
          </div>
        ) : transactionAddMutation.isPending ? (
          <div>
            <Spinner label="Adding transaction..." />
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
            ) : (
              <Spinner label="Loading memberships..." />
            )}
          </>
        )}
      </Form>
    </Formik>
  );
}
