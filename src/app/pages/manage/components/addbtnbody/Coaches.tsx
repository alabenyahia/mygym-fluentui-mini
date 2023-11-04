import {
    Label,
    Dropdown,
    Option,
    Spinner,
  } from "@fluentui/react-components";
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import useCoaches from "../../hooks/useCoaches";
  import pb from "src/utils/db/pocketbase";
  import { FormikInput } from "../FormikInput";
  import { useState } from "react";
  import usePrograms from "../../hooks/usePrograms";

  export default function GymStaf() {
    const { coachAddMutation } = useCoaches();
    const [program, setProgram] = useState("");
  const [programError, setProgramError] = useState("");
  const { programsQuery } = usePrograms();

    return (
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Coach name is required"),
        })}
        onSubmit={(values: any, { resetForm }) => {
            setProgramError("");
  
          if (!program || program === "") {
            setProgramError("Coach training program is required");
            return;
          }
          console.log("valls", {
            ...values,
            program,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          });
  
          coachAddMutation.mutate(
            {
              ...values,
              program,
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
                setProgram("");
              },
            }
          );
        }}
      >
        <Form
          id="add-form"
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {coachAddMutation.isPending ? (
            <div>
              <Spinner label="Adding coach..." />
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
  