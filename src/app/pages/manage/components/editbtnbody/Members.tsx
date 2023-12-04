import {
  Label,
  Dropdown,
  Field,
  Option,
  Spinner,
  Body1,
  Button,
  Switch,
  Avatar,
} from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";
import useTransactions from "../../hooks/useTransactions";
import pb from "src/utils/db/pocketbase";
import { useNavigate } from "react-router-dom";
import useDiscountCodes from "../../hooks/useDiscountCodes";
import { createRef } from "react";

export default function Members() {
  const [editData, setEditData]: any = useAtom(mEditData);
  const { membershipsQuery } = useMemberships();
  const { memberUpdateMutation } = useMembers();
  const { validDiscountCodesQuery } = useDiscountCodes();
  const [registeredDate, setRegisteredDate] = useState<Date>(
    editData?.registeredDate ? new Date(editData?.registeredDate) : new Date()
  );
  const [membership, setMembership] = useState(
    editData?.expand?.membership?.id || ""
  );
  const [isPaid, setIsPaid] = useState(false);
  const [discountCode, setDiscountCode]: any = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(editData?.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(editData?.avatar || "");

  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);
  const { transactionAddMutation } = useTransactions();
  const navigate = useNavigate();

  const fileInputRef: any = createRef();

  const handleFileChange = (event: any) => {
    console.log("HELLLOO");
    const file = event.target.files[0];
    setSelectedAvatar(file);
    previewImage(file);
    console.log("avatar", file);
  };

  const previewImage = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as any);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{
        name: editData?.name || "",
        email: editData?.email || "",
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
          },
        });

        console.log("valls2", editData);
        const data = {
          ...values,
          registeredDate,
          membership,
          membershipExpirationDate,
        };

        if (selectedAvatar) {
          data.avatar = selectedAvatar;
        }

        memberUpdateMutation.mutate(
          {
            id: editData?.id,
            data,
          },
          {
            onSuccess: (mMember) => {
              if (membership && mMembership) {
                transactionAddMutation.mutate({
                  from: mMembership?.membershipType === "time" ? moment() : "",
                  to:
                    mMembership?.membershipType === "time"
                      ? moment().add(
                          mMembership?.timeQuantity,
                          mMembership?.timeType === "month" ? "months" : "days"
                        )
                      : "",
                  price: mMembership?.price,
                  membership,
                  member: mMember.id,
                  isPaid,
                  assignedTo: pb.authStore.model?.id,
                  deletedAt: "",
                });
              }
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
            <Spinner label="editing member..." />
          </div>
        ) : (
          <>
            <div>
              <Avatar
                size={56}
                image={{
                  src: avatarPreview as any,
                }}
              />
              <Button
                style={{ marginLeft: "12px" }}
                onClick={() => fileInputRef.current.click()}
              >
                Select member picture
              </Button>
              <input
                type="file"
                onChange={handleFileChange}
                hidden
                ref={fileInputRef}
                accept="image/*"
              />
            </div>
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

                <Switch
                  checked={isPaid}
                  onChange={() => setIsPaid(!isPaid)}
                  label="Does the member paid for the membership or he will pay later?"
                />
              </div>
            ) : membershipsQuery.data?.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <Body1>No memberships yet</Body1>
                <Button
                  appearance="outline"
                  onClick={() => navigate("/manage/memberships")}
                >
                  Add Membership
                </Button>
              </div>
            ) : (
              <Spinner
                label="Loading memberships..."
                style={{ marginTop: "12px" }}
              />
            )}
          </>
        )}
      </Form>
    </Formik>
  );
}
