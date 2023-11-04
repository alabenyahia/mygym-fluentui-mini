import {
  Label,
  Dropdown,
  Option,
  Spinner,
} from "@fluentui/react-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useGymStaff from "../../hooks/useGymStaff";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";

export default function GymStaff() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { gymStaffUpdateMutation } = useGymStaff();
  const [role, setRole] = useState(editData?.role || "");
  const [roleError, setRoleError] = useState("");
  
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
  

  return (
    <Formik
      initialValues={{
        name: editData?.name || "",
        email: editData?.email || "",
        phone: editData?.phone || "",
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
        });

        gymStaffUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
            role,
            }
            
          },
          {
            onSuccess: () => {
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
        {gymStaffUpdateMutation.isPending ? (
          <div>
            <Spinner label="Editing gym staff..." />
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
