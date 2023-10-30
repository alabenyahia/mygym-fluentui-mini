import { Label, Select, Field } from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-date-time";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";

export default function Members() {
  const { membershipsQuery } = useMemberships();
  const { memberMutation } = useMembers();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        registeredDate: "",
        membershipId: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Member name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        const membership = membershipsQuery.data?.find(
          (element) => element.id === values.membershipId
        );

        let membershipExpirationDate = "";
        if (membership) {
          if (membership?.membershipType === "time") {
            membershipExpirationDate = moment(values.registeredDate)
              .add(
                membership?.timeQuantity,
                membership?.timeType === "month" ? "months" : "days"
              )
              .toString();
          }
        }

        console.log("valls", {
          ...values,
          registeredDate: values.registeredDate.toString(),
          membershipExpirationDate,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        memberMutation.mutate(
          {
            ...values,
            registeredDate: values.registeredDate.toString(),
            membershipExpirationDate,
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
                  registeredDate: moment(),
                  membershipId: "",
                },
              });
            },
          }
        );
      }}
    >
      {({ values, handleChange }) => (
        <Form id="add-form">
          <Label htmlFor="name" required>
            Member name
          </Label>
          <FormikInput placeholder="John Doe" name="name" id="name" />

          <Label htmlFor="email">Member email</Label>
          <FormikInput
            placeholder="example@email.com"
            name="email"
            id="email"
          />

          <Label htmlFor="phone">Member phone</Label>
          <FormikInput placeholder="23 111 222" name="phone" id="phone" />

          <Field label="Member registration date">
            <DatePicker
              placeholder="Select a date..."
              name="registeredDate"
              id="registeredDate"
              appearance="filled-darker"
              value={values.registeredDate}
              onSelectDate={handleChange}
            />
          </Field>

          {membershipsQuery.data && membershipsQuery.data?.length > 0 ? (
            <>
              <label htmlFor="membershipId">Member membership</label>
              <Select
                name="membershipId"
                id="membershipId"
                value={values.membershipId}
                onChange={handleChange}
              >
                {membershipsQuery.data?.map((membership: any) => {
                  const currency = "TND";
                  return (
                    <option value={membership.id} key={membership.id}>
                      <span style={{ fontWeight: "bold" }}>
                        {membership.name}
                      </span>
                      <span>
                        ({membership.price}
                        {currency})
                      </span>
                    </option>
                  );
                })}
              </Select>
            </>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}
