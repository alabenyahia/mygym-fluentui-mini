import { Label, Spinner } from "@fluentui/react-components";
import usePrograms from "../../hooks/usePrograms";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import useLogin from "src/app/pages/auth/hooks/useLogin";


export default function Programs() {
  const { programAddMutation } = usePrograms();
  const { getUserQuery, updateTaskMutation } = useLogin();

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Program name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        console.log("valls", {
          ...values,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        programAddMutation.mutate(
          {
            ...values,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: () => {
              if (getUserQuery.data?.getStarted[3].isDone === false) {
                const temp = [...getUserQuery.data?.getStarted];
                temp[3].isDone = true;
                updateTaskMutation.mutate({ getStarted: temp });
              }
              resetForm({
                values: {
                  name: "",
                },
              });
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {programAddMutation.isPending ? (
          <div>
            <Spinner label="Adding program..." />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="name" required>
                Program name
              </Label>
              <FormikInput
                placeholder="Exp: Box, zumba, yoga..."
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
