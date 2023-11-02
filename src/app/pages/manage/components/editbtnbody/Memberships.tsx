import {
  Label,
  Dropdown,
  Option,
  Spinner,
} from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";

export default function Memberships() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { membershipUpdateMutation } = useMemberships();
  const [timeType, setTimeType] = useState(
    editData?.timeType ? editData?.timeType : ""
  );
  const [membershipType, setMembershipType] = useState(
    editData?.membershipType ? editData?.membershipType : ""
  );

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);

  return (
    <Formik
      initialValues={{
        name: editData?.name || "",
        price: editData?.price || "",
        timeQuantity: editData?.timeQuantity || "",
        sessionQuantity: editData?.sessionQuantity || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Membership name is required"),
        price: Yup.number().required("Membership price is required"),
        timeQuantity: Yup.number(),
        sessionQuantity: Yup.number(),
      })}
      onSubmit={(values: any, { resetForm }) => {
        console.log("valls", {
          ...values,
          timeType,
          membershipType,
        });

        membershipUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
            },
          },
          {
            onSuccess: () => {
              setIsEditDrawerOpen(false);
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {membershipUpdateMutation.isPending ? (
          <div>
            <Spinner label="editing membership..." />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="name" required>
                Membership name
              </Label>
              <FormikInput
                placeholder="Exp: Gold, Pro, Diamond..."
                name="name"
                id="name"
              />
            </div>

            <div>
              <Label htmlFor="price" required>
                Membership price
              </Label>
              <FormikInput
                placeholder="Membership price in TND"
                name="price"
                id="price"
                type="number"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="membershipType" required>
                Membership type
              </Label>
              <Dropdown
                disabled
                name="membershipType"
                id="membershipType"
                defaultValue={membershipType}
                defaultSelectedOptions={[membershipType]}
                onOptionSelect={(_, data) =>
                  setMembershipType(data.optionValue as string)
                }
              >
                <Option text="Time-based" value="time" key="time">
                  Time-based
                </Option>

                <Option text="Session-based" value="session" key="session">
                  Session-based
                </Option>
              </Dropdown>
            </div>

            {membershipType === "time" && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Label htmlFor="timeType" required>
                  Time-based membership type
                </Label>
                <Dropdown
                  disabled
                  name="timeType"
                  id="timeType"
                  defaultValue={timeType}
                  defaultSelectedOptions={[timeType]}
                  onOptionSelect={(_, data) =>
                    setTimeType(data.optionValue as string)
                  }
                >
                  <Option text="Month-based" value="month" key="month">
                    Month-based
                  </Option>

                  <Option text="Day-based" value="day" key="day">
                    Day-based
                  </Option>
                </Dropdown>
              </div>
            )}

            {membershipType === "time" && (
              <div>
                <Label htmlFor="timeQuantity" required>
                  Time quantity
                </Label>
                <FormikInput
                  placeholder="How many months/days before it expires"
                  name="timeQuantity"
                  id="timeQuantity"
                />
              </div>
            )}

            {membershipType === "session" && (
              <div>
                <Label htmlFor="sessionQuantity" required>
                  Session quantity
                </Label>
                <FormikInput
                  placeholder="Number of sessions of the membership"
                  name="sessionQuantity"
                  id="sessionQuantity"
                />
              </div>
            )}
          </>
        )}
      </Form>
    </Formik>
  );
}
