import {
  Label,
  Dropdown,
  Option,
  Spinner,
  Field,
} from "@fluentui/react-components";
import useClasses from "../../hooks/useClasses";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import usePrograms from "../../hooks/usePrograms";
import { DatePicker } from "@fluentui/react-date-time";
import {
  TimePicker,
  formatDateToTimeString,
} from "@fluentui/react-timepicker-compat-preview";
import { recurrentDaysEnum } from "src/utils/types/main";
import { useAtom } from "jotai";
import { mEditData, ismEditDrawerOpen } from "../../table-columns/main";

export default function Memberships() {
  const { classUpdateMutation } = useClasses();
  const [editData, setEditData]: any = useAtom(mEditData);
  const [startDateError, setStartDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [recurrentDays, setRecurrentDays]: any = useState(
    editData?.recurrentDays && editData?.recurrentDays.length > 0
      ? editData?.recurrentDays
      : []
  );
  const [recurrentDaysError, setRecurrentDaysError]: any = useState("");
  const [startDate, setStartDate] = useState(new Date(editData?.startDate));
  const [endDate, setEndDate] = useState(
    editData?.endDate ? new Date(editData?.endDate) : ""
  );
  const [endDateError, setEndDateError] = useState("");
  const [startTime, setStartTime] = useState(new Date(editData?.startTime));
  const [endTime, setEndTime] = useState(new Date(editData?.endTime));
  const [startTimeValue, setStartTimeValue] = useState(
    startTime ? formatDateToTimeString(startTime) : ""
  );
  const [endTimeValue, setEndTimeValue] = useState(
    endTime ? formatDateToTimeString(endTime) : ""
  );
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useAtom(ismEditDrawerOpen);

  const { programsQuery } = usePrograms();

  return (
    <Formik
      initialValues={{
        classLimit: editData?.classLimit ? editData?.classLimit : "",
      }}
      validationSchema={Yup.object({
        classLimit: Yup.number(),
      })}
      onSubmit={(values: any, { resetForm }) => {
        setStartDateError("");
        setStartTimeError("");
        setEndTimeError("");
        setEndDateError("");
        setRecurrentDaysError("");

        if (!startDate) {
          setStartDateError("Class start date is required");
          return;
        }

        if (editData?.classType === "recurrent" && !endDate) {
          setEndDateError("Class end date is required");
          return;
        }

        if (editData?.classType === "recurrent" && recurrentDays.length === 0) {
          setRecurrentDaysError("Class recurrent days are required");
          return;
        }

        if (!startTime) {
          setStartTimeError("Class start time is required");
          return;
        }
        if (!endTime) {
          setEndTimeError("Class end time is required");
          return;
        }
        console.log("valls", {
          id: editData?.id,
          data: {
            ...values,
            startDate,
            endDate: editData?.classType === "recurrent" ? endDate : "",
            startTime,
            endTime,
            recurrentDays,
          },
        });

        classUpdateMutation.mutate(
          {
            id: editData?.id,
            data: {
              ...values,
              startDate,
              endDate: editData?.classType === "recurrent" ? endDate : "",
              startTime,
              endTime,
              recurrentDays,
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
        {classUpdateMutation.isPending ? (
          <div>
            <Spinner label="Editing class..." />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="program">Class program</label>
              <Dropdown name="program" id="program" disabled>
                <Option text={editData?.expand?.program?.name}>
                  {editData?.expand?.program?.name}
                </Option>
              </Dropdown>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="classType" required>
                Class type
              </Label>
              <Dropdown disabled name="classType" id="classType">
                <Option text={editData?.classType}>
                  {editData?.classType}
                </Option>
              </Dropdown>
            </div>

            <div>
              <Field label="Select start date">
                <DatePicker
                  placeholder="Select class start date..."
                  value={startDate}
                  onSelectDate={(date) => setStartDate(date!)}
                  showGoToToday={true}
                />
              </Field>
              {startDateError && (
                <p style={{ color: "red" }}>{startDateError}</p>
              )}

              <Field label="Select Class start time">
                <TimePicker
                  placeholder="Select start time..."
                  selectedTime={startTime}
                  onTimeChange={(_ev: any, data: any) => {
                    setStartTime(data.selectedTime);
                    setStartTimeValue(data.selectedTimeText ?? "");
                  }}
                  value={startTimeValue}
                  onInput={(ev: any) => setStartTimeValue(ev.target.value)}
                />
              </Field>
              {startTimeError && (
                <p style={{ color: "red" }}>{startTimeError}</p>
              )}
            </div>

            <div>
              {editData?.classType === "recurrent" ? (
                <Field label="Select end date">
                  <DatePicker
                    placeholder="Select class end date..."
                    value={endDate}
                    onSelectDate={(date) => setEndDate(date!)}
                    showGoToToday={true}
                  />
                </Field>
              ) : null}
              {endDateError && <p style={{ color: "red" }}>{endDateError}</p>}

              <Field label="Select class end time">
                <TimePicker
                  placeholder="Select end time..."
                  selectedTime={endTime}
                  onTimeChange={(_ev: any, data: any) => {
                    setEndTime(data.selectedTime);
                    setEndTimeValue(data.selectedTimeText ?? "");
                  }}
                  value={endTimeValue}
                  onInput={(ev: any) => setEndTimeValue(ev.target.value)}
                />
              </Field>
              {endTimeError && <p style={{ color: "red" }}>{endTimeError}</p>}
            </div>

            {editData?.classType === "recurrent" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="recurrentDays">Class recurrent days</label>
                <Dropdown
                  name="recurrentDays"
                  id="recurrentDays"
                  multiselect={true}
                  defaultValue={recurrentDays.join(",")}
                  defaultSelectedOptions={recurrentDays}
                  onOptionSelect={(_: any, data: any) =>
                    setRecurrentDays([...data.selectedOptions])
                  }
                >
                  {(
                    Object.keys(recurrentDaysEnum) as Array<
                      keyof typeof recurrentDaysEnum
                    >
                  ).map((key) => {
                    console.log("keey", key);
                    return (
                      <Option text={key} value={key} key={key}>
                        {[...key][0].toUpperCase() + [...key].slice(1).join("")}
                      </Option>
                    );
                  })}
                </Dropdown>
                {recurrentDaysError && (
                  <p style={{ color: "red" }}>{recurrentDaysError}</p>
                )}
              </div>
            ) : null}

            <div>
              <Label htmlFor="classLimit">Class limit</Label>
              <FormikInput
                placeholder="Maximum number of participants"
                name="classLimit"
                id="classLimit"
                type="number"
              />
            </div>
          </>
        )}
      </Form>
    </Formik>
  );
}
