import {
    Label,
    Spinner,
  } from "@fluentui/react-components";
  import usePrograms from "../../hooks/usePrograms";
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import { FormikInput } from "../FormikInput";
  import { useAtom } from "jotai";
  import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
  
  export default function Programs() {
    const [editData, setEditData]: any = useAtom(mEditData);
    const { programUpdateMutation } = usePrograms();
  
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
  
    return (
      <Formik
        initialValues={{
          name: editData?.name || "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Program name is required"),
        })}
        onSubmit={(values: any) => {
          console.log("valls", {
            ...values,
          });
  
          programUpdateMutation.mutate(
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
          {programUpdateMutation.isPending ? (
            <div>
              <Spinner label="editing program..." />
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="name" required>
                  Program name
                </Label>
                <FormikInput
                  placeholder="Exp: Box, zumba, yoga...."
                  name="name"
                  id="name"
                />
              </div>
            </>
          )}
        </Form>
      </Formik>
    );
  }
  