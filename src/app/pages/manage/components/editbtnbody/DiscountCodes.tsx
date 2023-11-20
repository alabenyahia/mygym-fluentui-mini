import { Label, Field, Switch, Spinner } from "@fluentui/react-components";
import useDiscountCodes from "../../hooks/useDiscountCodes";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
import { useAtom } from "jotai";

export default function DiscountCodes() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { discountCodeUpdateMutation } = useDiscountCodes();
  const [expires, setExpires] = useState(editData?.expires);
  const [validFrom, setValidFrom] = useState<Date>(
    editData?.validFrom ? new Date(editData?.validFrom) : new Date()
  );
  const [validUntil, setValidUntil] = useState<Date>(
    editData?.validUntil ? new Date(editData?.validUntil) : new Date()
  );

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);

  return (
    <Formik
      initialValues={{
        code: editData?.code || "",
      }}
      validationSchema={Yup.object({
        code: Yup.string().required("Code is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        console.log("valls", {
          id: editData?.id,
          data: {
            ...values,
            expires,
            validFrom: expires ? validFrom : "",
            validUntil: expires ? validUntil : "",
          },
        });

        discountCodeUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
              expires,
              validFrom: expires ? validFrom : "",
              validUntil: expires ? validUntil : "",
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
        {discountCodeUpdateMutation.isPending ? (
          <div>
            <Spinner label="Updating discount code..." />
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
