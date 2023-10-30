import { Input, makeStyles } from "@fluentui/react-components";
import { useField } from "formik";

const useMyInputStyles = makeStyles({
    input: {
      width: "100%",
    },
  });
  
  
export const FormikInput = ({ ...props }: any) => {
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
