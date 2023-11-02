import {
    Label,
    Dropdown,
    Field,
    Option,
    Spinner,
  } from "@fluentui/react-components";
  import useMemberships from "../../hooks/useMemberships";
  import { DatePicker } from "@fluentui/react-date-time";
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import moment from "moment";
  import useMemberships from "../../hooks/useMemberships";
  import { FormikInput } from "../FormikInput";
  import { useState } from "react";
  import { useAtom } from "jotai";
  import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
  
  export default function Memberships() {
    const [editData, setEditData]: any = useAtom(mEditData);
    const { membershipUpdateMutation } = useMemberships();
    const [registeredDate, setRegisteredDate] = useState<Date>(
      editData?.registeredDate ? new Date(editData?.registeredDate) : new Date()
    );
  
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);

  
    return (
      <Formik
        initialValues={{
          name: editData?.name || "",
          price: editData?.price || "",
          phone: editData?.phone || "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Member name is required"),
        })}
        onSubmit={(values: any, { resetForm }) => {
          const mMembership = membershipsQuery.data?.find(
            (element) => element.id === membership
          );
  
          let membershipExpirationDate: any = "";
          if (mMembership) {
            if (mMembership?.membershipType === "time") {
              membershipExpirationDate = moment(registeredDate).add(
                mMembership?.timeQuantity,
                mMembership?.timeType === "month" ? "months" : "days"
              );
            }
          }
  
          console.log("valls", {
            id: editData?.id,
              data: {
                ...values,
                registeredDate,
                membership,
                membershipExpirationDate,
              }
          });
  
          console.log("valls2", editData)
  
          memberUpdateMutation.mutate(
            {
              id: editData?.id,
              data: {
                ...values,
                registeredDate,
                membership,
                membershipExpirationDate,
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
          {memberUpdateMutation.isPending ? (
            <div>
              <Spinner label="Adding member..." />
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="name" required>
                  Member name
                </Label>
                <FormikInput placeholder="John Doe" name="name" id="name" />
              </div>
  
              <div>
                <Label htmlFor="email">Member email</Label>
                <FormikInput
                  placeholder="example@email.com"
                  name="email"
                  id="email"
                />
              </div>
  
              <div>
                <Label htmlFor="phone">Member phone</Label>
                <FormikInput placeholder="23 111 222" name="phone" id="phone" />
              </div>
  
              <div>
                <Field label="Member registration date">
                  <DatePicker
                    placeholder="Select a date..."
                    id="registeredDate"
                    value={registeredDate}
                    onSelectDate={(date) => setRegisteredDate(date!)}
                    showGoToToday={true}
                  />
                </Field>
              </div>
  
              {membershipsQuery.data && membershipsQuery.data?.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="membership">Member membership</label>
                  <Dropdown
                    name="membership"
                    id="membership"
                    defaultValue={membership}
                    defaultSelectedOptions={[membership]}
                    onOptionSelect={(_, data) =>
                      setMembership(data.optionValue as string)
                    }
                  >
                    {membershipsQuery.data?.map((membership: any) => {
                      const currency = "TND";
                      return (
                        <Option
                          text={`${membership.name} ${membership.price}${currency}`}
                          value={membership.id}
                          key={membership.id}
                        >{`${membership.name} ${membership.price}${currency}`}</Option>
                      );
                    })}
                  </Dropdown>
                </div>
              ) : (
                <Spinner label="Loading memberships..." />
              )}
            </>
          )}
        </Form>
      </Formik>
    );
  }
  