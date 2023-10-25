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
import useLogin from "./hooks/useLogin.tsx";
import { LoginDataType } from "src/utils/types/main";
import { Toaster } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import {
  LightbulbPerson24Filled,
  LightbulbPerson24Regular,
} from "@fluentui/react-icons";

const useLoginStyles = makeStyles({
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

export default function Login() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  const styles = useLoginStyles();

  return isMobile ? (
    <LoginForm />
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
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}

const useLoginFormStyles = makeStyles({
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

function LoginForm() {
  const styles = useLoginFormStyles();
  const { loginMutation, loginToasterId } = useLogin();
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

        <Title1>Sign in</Title1>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Your email is required"),
          password: Yup.string()
            .required("Your password is required")
            .min(8, "Password must be at least 8 characters"),
        })}
        onSubmit={(values: LoginDataType, { resetForm }) => {
          loginMutation.mutate(
            {
              ...values,
            },
            {
              onSuccess: () => {
                resetForm({
                  values: {
                    email: "",
                    password: "",
                  },
                });
              },
            }
          );
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
              <span>No account?</span>
              <Button
                appearance="transparent"
                className={styles.loginButton}
                onClick={() => navigate("/register")}
              >
                Create one!
              </Button>
            </div>

            <Button
              type="submit"
              appearance="primary"
              disabled={loginMutation.isPending}
            >
              Sign in
            </Button>
          </div>
        </Form>
      </Formik>
      <Toaster toasterId={loginToasterId} />
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
