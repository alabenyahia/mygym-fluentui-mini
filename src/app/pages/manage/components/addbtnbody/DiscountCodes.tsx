import { Label, Field, Switch, Spinner } from "@fluentui/react-components";
import useDiscountCodes from "../../hooks/useDiscountCodes";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";

export default function DiscountCodes() {
  const { discountCodeAddMutation } = useDiscountCodes();
  const [expires, setExpires] = useState(false);
  const [validFrom, setValidFrom] = useState<Date>(new Date());
  const [validUntil, setValidUntil] = useState<Date>(new Date());

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={Yup.object({
        code: Yup.string().required("Code is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        console.log("valls", {
          ...values,
          expires,
          validFrom: expires ? validFrom : "",
          validUntil: expires ? validUntil : "",
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        discountCodeAddMutation.mutate(
          {
            ...values,
            expires,
            validFrom: expires ? validFrom : "",
            validUntil: expires ? validUntil : "",
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: () => {
              resetForm({
                values: {
                  code: "",
                },
              });
              setValidFrom(new Date());
              setValidUntil(new Date());
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {discountCodeAddMutation.isPending ? (
          <div>
            <Spinner label="Adding discount code..." />
          </div>
        ) : (
          <>
            <div>
              <Label htmlFor="code" required>
                Discount code
              </Label>
              <FormikInput
                placeholder="exp: EID20, ..."
                name="code"
                id="code"
              />
            </div>

            <Switch
              checked={expires}
              onChange={(_, data) => setExpires(!expires)}
              label="Does the discount code expires after certain date?"
            />

            {expires ? (
              <>
                <div>
                  <Field label="Discount code valid from">
                    <DatePicker
                      placeholder="Select a date..."
                      id="validFrom"
                      value={validFrom}
                      onSelectDate={(date) => setValidFrom(date!)}
                      showGoToToday={true}
                    />
                  </Field>
                </div>

                <div>
                  <Field label="Discount code valid until">
                    <DatePicker
                      placeholder="Select a date..."
                      id="validUntil"
                      value={validUntil}
                      onSelectDate={(date) => setValidUntil(date!)}
                      showGoToToday={true}
                    />
                  </Field>
                </div>
              </>
            ) : null}
          </>
        )}
      </Form>
    </Formik>
  );
}
