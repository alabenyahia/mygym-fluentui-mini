import {
  Card,
  Title1,
  Input,
  Button,
  makeStyles,
  Image,
  Tooltip,
  ToggleButton,
} from "@fluentui/react-components";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import useRegister from "./hooks/useRegister.tsx";
import { RegisterDataType } from "src/utils/types/main";
import { Toaster } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import {
  LightbulbPerson24Filled,
  LightbulbPerson24Regular,
} from "@fluentui/react-icons";

const useRegisterStyles = makeStyles({
  card: {
    width: "460px",
    maxWidth: "100%",
    height: "fit-content",
  },
  togglebtn: {
    alignSelf: "flex-end",
    marginRight: "8px",
    marginTop: "8px",
  },
});

export default function Register() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  const styles = useRegisterStyles();

  return isMobile ? (
    <RegisterForm />
  ) : (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
      }}
    >
      <Tooltip content="Switch dark mode" relationship="label">
        <ToggleButton
          className={styles.togglebtn}
          aria-label="Switch dark mode icon"
          checked={true}
          icon={
            true ? <LightbulbPerson24Filled /> : <LightbulbPerson24Regular />
          }
          onClick={() => false}
        />
      </Tooltip>
      <div style={{ minHeight: "100%", placeSelf: "center", margin: "auto" }}>
        <Card className={styles.card}>
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}

const useRegisterFormStyles = makeStyles({
  loginButton: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingRight: "0px",
    paddingLeft: "4px",
    justifyContent: "flex-start",
    "&:hover": {
      textDecorationLine: "underline",
    },
  },
});

function RegisterForm() {
  const styles = useRegisterFormStyles();
  const { registerMutation, registerToasterId } = useRegister();
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: "24px",
        }}
      >
        <div style={{ width: 68, height: 68 }}>
          <Image src="/icons/mygym-logo.png" fit="cover" />
        </div>

        <Title1>Create account</Title1>
      </div>
      <Formik
        initialValues={{
          name: "",
          gymName: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Your name is required"),
          gymName: Yup.string().required("Your gym name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Your email is required"),
          password: Yup.string()
            .required("Your password is required")
            .min(8, "Password must be at least 8 characters"),
        })}
        onSubmit={(values: RegisterDataType, { resetForm }) => {
          registerMutation.mutate(
            {
              ...values,
              passwordConfirm: values.password,
            },
            {
              onSuccess: () => {
                resetForm({
                  values: {
                    name: "",
                    gymName: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                  },
                });
              },
            }
          );
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <MyInput placeholder="Your name" name="name" />
          <MyInput placeholder="Your gym name" name="gymName" />
          <MyInput placeholder="Email address" name="email" />
          <MyInput placeholder="Password" type="password" name="password" />
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Have an account?</span>
              <Button
                appearance="transparent"
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>

            <Button
              type="submit"
              appearance="primary"
              disabled={registerMutation.isPending}
            >
              Create
            </Button>
          </div>
        </Form>
      </Formik>
      <Toaster toasterId={registerToasterId} />
    </div>
  );
}

const useMyInputStyles = makeStyles({
  input: {
    width: "100%",
  },
});

const MyInput = ({ ...props }: any) => {
  const [field, meta] = useField(props);
  const styles = useMyInputStyles();
  return (
    <div>
      <Input className={styles.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};
