import {
  Label,
  Dropdown,
  Field,
  Option,
  Spinner,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-date-time";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useGymStaff from "../../hooks/useGymStaff";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";

export default function Members() {
  const { gymStaffAddMutation } = useGymStaff();
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Gym staff name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        setRoleError("");

        if (!role || role === "") {
          setRoleError("Staff role is required");
          return;
        }
        console.log("valls", {
          ...values,
          role,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        gymStaffAddMutation.mutate(
          {
            ...values,
            role,
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
              setRole("");
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {gymStaffAddMutation.isPending ? (
          <div>
            <Spinner label="Adding gym staff..." />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="name" required>
                Staff name
              </Label>
              <FormikInput placeholder="John Doe" name="name" id="name" />
            </div>

            <div>
              <Label htmlFor="email">Staff email</Label>
              <FormikInput
                placeholder="example@email.com"
                name="email"
                id="email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Staff phone</Label>
              <FormikInput placeholder="23 111 222" name="phone" id="phone" />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="role" required>
                Staff role
              </Label>
              <Dropdown
                name="role"
                id="role"
                onOptionSelect={(_, data) =>
                  setRole(data.optionValue as string)
                }
              >
                <Option text="Manager" value="manager" key="manager">
                  Manager
                </Option>

                <Option
                  text="Receptionist"
                  value="receptionist"
                  key="receptionist"
                >
                  Receptionist
                </Option>
              </Dropdown>
              {roleError && <p style={{ color: "red" }}>{roleError}</p>}
            </div>
          </>
        )}
      </Form>
    </Formik>
  );
}
