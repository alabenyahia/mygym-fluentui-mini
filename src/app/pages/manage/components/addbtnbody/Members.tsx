import {
  Label,
  Dropdown,
  Field,
  Option,
  Spinner,
  Switch,
  Button,
  Body1,
  Badge,
  Avatar,
} from "@fluentui/react-components";
import useMemberships from "../../hooks/useMemberships";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import useMembers from "../../hooks/useMembers";
import useTransactions from "../../hooks/useTransactions";
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import useLogin from "src/app/pages/auth/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import useDiscountCodes from "../../hooks/useDiscountCodes";
import { createRef } from "react";

export default function Members() {
  const { membershipsQuery } = useMemberships();
  const { transactionAddMutation } = useTransactions();
  const { memberMutation } = useMembers();
  const [registeredDate, setRegisteredDate] = useState<Date>(new Date());
  const [membership, setMembership]: any = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [discountCode, setDiscountCode]: any = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const { getUserQuery, updateTaskMutation } = useLogin();
  const { validDiscountCodesQuery } = useDiscountCodes();
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

  const calculateNewPrice = (
    price: number,
    discountQuantity: number,
    isPercentage: boolean
  ) => {
    if (isPercentage) {
      return price - (price * discountQuantity) / 100;
    } else {
      return price - discountQuantity;
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        discountcode: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Member name is required"),
      })}
      onSubmit={(values: any, { resetForm }) => {
        const mMembership = membershipsQuery.data?.find(
          (element) => element.id === membership.id
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
          ...values,
          avatar: selectedAvatar,
          registeredDate: registeredDate.toString(),
          membership,
          membershipExpirationDate,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        memberMutation.mutate(
          {
            ...values,
            registeredDate,
            isMembershipCanceled: membership ? false : null,
            membership: membership ? membership.id : "",
            membershipExpirationDate,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
            avatar: selectedAvatar,
          },
          {
            onSuccess: (mMember) => {
              if (getUserQuery.data?.getStarted[2].isDone === false) {
                const temp = [...getUserQuery.data?.getStarted];
                temp[2].isDone = true;
                updateTaskMutation.mutate({ getStarted: temp });
              }

              resetForm({
                values: {
                  name: "",
                  email: "",
                  phone: "",
                  discountcode: "",
                },
              });
              setMembership("");
              setRegisteredDate(new Date());
              setSelectedAvatar("");
              setAvatarPreview("");

              if (membership && mMembership) {
                transactionAddMutation.mutate(
                  {
                    from:
                      mMembership?.membershipType === "time" ? moment() : "",
                    to:
                      mMembership?.membershipType === "time"
                        ? moment().add(
                            mMembership?.timeQuantity,
                            mMembership?.timeType === "month"
                              ? "months"
                              : "days"
                          )
                        : "",
                    price: discountCode
                      ? calculateNewPrice(
                          membership.price,
                          discountCode.discountQuantity,
                          discountCode.discountType === "percentage"
                        )
                      : mMembership?.price,
                    membership: membership.id,
                    member: mMember.id,
                    isPaid,
                    assignedTo: pb.authStore.model?.id,
                    deletedAt: "",
                  },
                  {
                    onSuccess: () => {
                      setIsPaid(false);
                    },
                  }
                );
              }
            },
          }
        );
      }}
    >
      <Form
        id="add-form"
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {memberMutation.isPending ? (
          <div>
            <Spinner label="Adding member..." />
          </div>
        ) : transactionAddMutation.isPending ? (
          <div>
            <Spinner label="Adding transaction..." />
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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label htmlFor="membership">Member membership</label>
                <Dropdown
                  name="membership"
                  id="membership"
                  onOptionSelect={(_, data) =>
                    setMembership(data.optionValue as string)
                  }
                >
                  {membershipsQuery.data?.map((membership: any) => {
                    const currency = "TND";
                    return (
                      <Option
                        text={`${membership.name} ${membership.price}${currency}`}
                        value={membership}
                        key={membership.id}
                      >{`${membership.name} ${membership.price}${currency}`}</Option>
                    );
                  })}
                </Dropdown>
                {validDiscountCodesQuery.data.length > 0 && membership && (
                  <>
                    <label htmlFor="discountcode">Discount code</label>
                    <Dropdown
                      name="discountcode"
                      id="discountcode"
                      defaultValue={""}
                      onOptionSelect={(_, data) =>
                        setDiscountCode(data.optionValue as string)
                      }
                    >
                      {validDiscountCodesQuery.data?.map((dc: any) => {
                        return (
                          <Option text={dc.code} value={{ ...dc }} key={dc.id}>
                            {dc.code}
                          </Option>
                        );
                      })}
                    </Dropdown>

                    {discountCode && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Badge
                          appearance="filled"
                          color="success"
                          style={{ padding: " 14px 10px" }}
                        >
                          {discountCode?.code} applied
                        </Badge>
                        <Badge
                          appearance="outline"
                          style={{ padding: " 14px 10px" }}
                        >
                          New price{" "}
                          {calculateNewPrice(
                            membership.price,
                            discountCode.discountQuantity,
                            discountCode.discountType === "percentage"
                          )}{" "}
                          TND
                        </Badge>
                      </div>
                    )}
                  </>
                )}
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
