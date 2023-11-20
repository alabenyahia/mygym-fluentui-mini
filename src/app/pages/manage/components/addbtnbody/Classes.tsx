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
import pb from "src/utils/db/pocketbase";
import { FormikInput } from "../FormikInput";
import { useState } from "react";
import usePrograms from "../../hooks/usePrograms";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  TimePicker,
  formatDateToTimeString,
} from "@fluentui/react-timepicker-compat-preview";
import { recurrentDaysEnum } from "src/utils/types/main";
import useLogin from "src/app/pages/auth/hooks/useLogin";


export default function Memberships() {
  const { classAddMutation } = useClasses();
  const [program, setProgram] = useState("");
  const [classType, setClassType] = useState("");
  const [classTypeError, setClassTypeError] = useState("");
  const [programError, setProgramError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [recurrentDays, setRecurrentDays]: any = useState([]);
  const [recurrentDaysError, setRecurrentDaysError]: any = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeValue, setStartTimeValue] = useState(
    startTime ? formatDateToTimeString(startTime) : ""
  );
  const [endTimeValue, setEndTimeValue] = useState(
    endTime ? formatDateToTimeString(endTime) : ""
  );

  const { programsQuery } = usePrograms();
  const { getUserQuery, updateTaskMutation } = useLogin();


  return (
    <Formik
      initialValues={{
        classLimit: "",
      }}
      validationSchema={Yup.object({
        classLimit: Yup.number(),
      })}
      onSubmit={(values: any, { resetForm }) => {
        setClassTypeError("");
        setProgramError("");
        setStartDateError("");
        setStartTimeError("");
        setEndTimeError("");
        setEndDateError("");
        setRecurrentDaysError("");

        if (!program) {
          setProgramError("Class program is required");
          return;
        }

        if (!classType) {
          setClassTypeError("Class type is required");
          return;
        }

        if (!startDate) {
          setStartDateError("Class start date is required");
          return;
        }

        if (classType === "recurrent" && !endDate) {
          setEndDateError("Class end date is required");
          return;
        }

        if (classType === "recurrent" && recurrentDays.length === 0) {
          setRecurrentDaysError("Class recurrent days are required");
          return
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
          ...values,
          program,
          classType,
          startDate,
          endDate: classType === "recurrent" ? endDate : "",
          startTime,
          endTime,
          recurrentDays,
          assignedTo: pb.authStore.model?.id,
          deletedAt: "",
        });

        classAddMutation.mutate(
          {
            ...values,
            program,
            classType,
            startDate,
            endDate: classType === "recurrent" ? endDate : "",
            startTime,
            endTime,
            recurrentDays,
            assignedTo: pb.authStore.model?.id,
            deletedAt: "",
          },
          {
            onSuccess: () => {
              if (getUserQuery.data?.getStarted[4].isDone === false) {
                const temp = [...getUserQuery.data?.getStarted];
                temp[4].isDone = true;
                updateTaskMutation.mutate({ getStarted: temp });
              }
              resetForm({
                values: {
                  classLimit: "",
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
        {classAddMutation.isPending ? (
          <div>
            <Spinner label="Adding class..." />
          </div>
        ) : (
          <>
            {programsQuery.data && programsQuery.data?.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="program">Class program</label>
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

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label htmlFor="classType" required>
                Class type
              </Label>
              <Dropdown
                name="classType"
                id="classType"
                onOptionSelect={(_, data) =>
                  setClassType(data.optionValue as string)
                }
              >
                <Option text="Recurrent" value="recurrent" key="recurrent">
                  Recurrent
                </Option>

                <Option text="One-time" value="one-time" key="one-time">
                  One-time
                </Option>
              </Dropdown>
              {classTypeError && (
                <p style={{ color: "red" }}>{classTypeError}</p>
              )}
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
              {classType === "recurrent" ? (
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

            {classType === "recurrent" ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="recurrentDays">Class recurrent days</label>
                <Dropdown
                  name="recurrentDays"
                  id="recurrentDays"
                  multiselect={true}
                  onOptionSelect={(_, data) =>
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
