import { Label, Dropdown, Option, Spinner } from "@fluentui/react-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useCoaches from "../../hooks/useCoaches";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
import usePrograms from "../../hooks/usePrograms";

export default function Coaches() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { coachUpdateMutation } = useCoaches();
  const [program, setProgram] = useState(editData?.expand?.program.id || "");
  const [programError, setProgramError] = useState("");

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
  const { programsQuery } = usePrograms();

  return (
    <Formik
      initialValues={{
        name: editData?.name || "",
        email: editData?.email || "",
        phone: editData?.phone || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Coach name is required"),
      })}
      onSubmit={(values: any) => {
        setProgramError("");

        if (!program || program === "") {
          setProgramError("Coach training program is required");
          return;
        }
        console.log("valls", {
          ...values,
          program,
        });

        coachUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
              program,
            },
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
        {coachUpdateMutation.isPending ? (
          <div>
            <Spinner label="Editing coach..." />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="name" required>
                Coach name
              </Label>
              <FormikInput placeholder="John Doe" name="name" id="name" />
            </div>

            {programsQuery.data && programsQuery.data?.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="program">Coach training program</label>
                <Dropdown
                  name="program"
                  id="program"
                  defaultValue={editData?.expand?.program?.name}
                  onOptionSelect={(_, data) =>
                    setProgram(data.optionValue as string)
                  }
                >
                  {programsQuery.data?.map((program: any) => {
                    return (
                      <Option
                        text={program.name}
                        value={program.id}
                        key={program.id}
                      >
                        {program.name}
                      </Option>
                    );
                  })}
                </Dropdown>
                {programError && <p style={{ color: "red" }}>{programError}</p>}
              </div>
            ) : (
              <Spinner label="Loading programs..." />
            )}

            <div>
              <Label htmlFor="email">Coach email</Label>
              <FormikInput
                placeholder="example@email.com"
                name="email"
                id="email"
              />
            </div>

            <div>
              <Label htmlFor="phone">Coach phone</Label>
              <FormikInput placeholder="23 111 222" name="phone" id="phone" />
            </div>
          </>
        )}
      </Form>
    </Formik>
  );
}
