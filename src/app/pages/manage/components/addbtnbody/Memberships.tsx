import { Label, Dropdown, Option, Spinner } from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";

export default function Memberships() {
  const { membershipAddMutation } = useMemberships();
  const [timeType, setTimeType] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [membershipTypeError, setMembershipTypeError] = useState("");
  const [timeTypeError, setTimeTypeError] = useState("");

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        timeQuantity: "",
        sessionQuantity: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Membership name is required"),
        price: Yup.number().required("Membership price is required"),
        timeQuantity: Yup.number(),
        sessionQuantity: Yup.number(),
      })}
      onSubmit={(values: any, { resetForm }) => {
        setMembershipTypeError("");
        setTimeTypeError("");

        if (membershipType === "") {
          setMembershipTypeError("Membership type is required");
          return;
        }

        if (membershipType === "time" && timeType === "") {
          setTimeTypeError("Time-based membership type is required");
          return;
        }


        console.log("valls", {
          ...values,
          timeType,
          membershipType,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        membershipAddMutation.mutate(
          {
            ...values,
            timeType,
            membershipType,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: () => {
              resetForm({
                values: {
                  name: "",
                  price: "",
                  timeQuantity: "",
                  sessionQuantity: "",
                },
              });
              setMembershipType("");
              setTimeType("");
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {membershipAddMutation.isPending ? (
          <div>
            <Spinner label="Adding membership..." />
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
                name="membershipType"
                id="membershipType"
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
              {membershipTypeError && (
                <p style={{ color: "red" }}>{membershipTypeError}</p>
              )}
            </div>

            {membershipType === "time" && <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="timeType" required>
                Time-based membership type
              </Label>
              <Dropdown
                name="timeType"
                id="timeType"
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
              {timeTypeError && <p style={{ color: "red" }}>{timeTypeError}</p>}
            </div>}

            {membershipType === "time" && <div>
              <Label htmlFor="timeQuantity" required>
                Time quantity
              </Label>
              <FormikInput
                placeholder="How many months/days before it expires"
                name="timeQuantity"
                id="timeQuantity"
              />
            </div>}

            {membershipType === "session" && <div>
              <Label htmlFor="sessionQuantity" required>
                Session quantity
              </Label>
              <FormikInput
                placeholder="Number of sessions of the membership"
                name="sessionQuantity"
                id="sessionQuantity"
              />
            </div>}
          </>
        )}
      </Form>
    </Formik>
  );
}
