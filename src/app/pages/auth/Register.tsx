import {
  Card,
  Title1,
  Button,
  makeStyles,
  Image,
  Body1,
} from "@fluentui/react-components";
import { useMediaQuery } from "react-responsive";
import { Formik, Form,  } from "formik";
import * as Yup from "yup";
import useRegister from "src/app/pages/auth/hooks/useRegister";
import { useNavigate } from "react-router-dom";
import TopBar from "src/app/pages/auth/components/TopBar";
import { useAtom } from "jotai";
import { isDarkTheme } from "src/utils/atoms/main";
import { FormikInput } from "../manage/components/FormikInput";

const useRegisterStyles = makeStyles({
  card: {
    width: "460px",
    maxWidth: "100%",
    height: "fit-content",
  },
});

export default function Register() {
  const isMobile = useMediaQuery({ query: "(max-width: 920px)" });
  const styles = useRegisterStyles();
  const [isDark, _] = useAtom(isDarkTheme);

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
      <RegisterForm />
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "16px",
          backgroundColor: isDark ? "#292929" : "#ffffff",
          color: isDark ? "#ffffff" : "#242424",
          boxShadow: "0px -3px 12px -3px rgba(0,0,0,0.1)",
        }}
      >
        <Body1>
          Designed and developer by:{" "}
          <span style={{ fontWeight: "bold" }}>Ala Ben Yahia</span>
        </Body1>
      </footer>
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
          <RegisterForm />
        </Card>
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "16px",
            backgroundColor: isDark ? "#292929" : "#ffffff",
            color: isDark ? "#ffffff" : "#242424",
            boxShadow: "0px -3px 12px -3px rgba(0,0,0,0.1)",
          }}
        >
          <Body1>
            Designed and developer by:{" "}
            <span style={{ fontWeight: "bold" }}>Ala Ben Yahia</span>
          </Body1>
        </footer>
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
  const { registerMutation } = useRegister();
  const navigate = useNavigate();

  const getStarted = [
    { num: 0, desc: "Create your MyGym account", isDone: true },
    {
      num: 1,
      desc: "Create first membership",
      isDone: false,
      url: "/manage/memberships",
      buttonText: "Create membership",
    },
    {
      num: 2,
      desc: "Add your first member",
      isDone: false,
      url: "/manage/members",
      buttonText: "Create member",
    },
    {
      num: 3,
      desc: "Create your first class program",
      isDone: false,
      url: "/manage/programs",
      buttonText: "Create program",
    },
    {
      num: 4,
      desc: "Create your first class",
      isDone: false,
      url: "/manage/classes",
      buttonText: "Create class",
    },
  ];

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
        onSubmit={(values: any, { resetForm }) => {
          registerMutation.mutate(
            {
              ...values,
              passwordConfirm: values.password,
              getStarted,
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
          <FormikInput placeholder="Your name" name="name" />
          <FormikInput placeholder="Your gym name" name="gymName" />
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
    </div>
  );
}
