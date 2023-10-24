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
import useRegister from "./hooks/useRegister.tsx";
import { RegisterDataType } from "src/utils/types/main";

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

  return isMobile ? (
    <RegisterForm />
  ) : (
    <Card className={styles.card}>
      <RegisterForm />
    </Card>
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
          registerMutation.mutate({
            ...values,
            passwordConfirm: values.password,
          });
          resetForm({
            values: {
              name: "",
              gymName: "",
              email: "",
              password: "",
              passwordConfirm: "",
            },
          });
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
              <Button appearance="transparent" className={styles.loginButton}>
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
