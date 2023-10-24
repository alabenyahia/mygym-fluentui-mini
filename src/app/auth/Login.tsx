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
  
    return isMobile ? (
      <LoginForm />
    ) : (
      <Card className={styles.card}>
        <LoginForm />
      </Card>
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
                <Button appearance="transparent" className={styles.loginButton}>
                  Create one!
                </Button>
              </div>
  
              <Button type="submit" appearance="primary">
                Sign in
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
  