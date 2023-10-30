import {
  Card,
  Title1,
  Input,
  Button,
  makeStyles,
  Image,
} from "@fluentui/react-components";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import useLogin from "src/app/pages/auth/hooks/useLogin";
import { LoginDataType } from "src/utils/types/main";
import { Toaster } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main";
import TopBar from "src/app/pages/auth/components/TopBar";
import { FormikInput } from "../manage/components/FormikInput";

const useLoginStyles = makeStyles({
  card: {
    width: "460px",
    maxWidth: "100%",
    height: "fit-content",
  },
});

export default function Login() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  const styles = useLoginStyles();
  const [isDark, setIsDark] = useAtom(isDarkTheme);

  return isMobile ? (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <TopBar />
      <LoginForm />
    </div>
  ) : (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: isDark
          ? "linear-gradient(62deg, #47669a 0%, #604362 100%)"
          : "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
      }}
    >
      <TopBar />
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
                navigate("/");
              },
            }
          );
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <FormikInput placeholder="Email address" name="email" />
          <FormikInput placeholder="Password" type="password" name="password" />
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

