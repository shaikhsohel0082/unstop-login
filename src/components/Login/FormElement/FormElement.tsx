import { useCallback, useState } from "react";
import styles from "./FormElement.module.scss";
interface Props {
  logo: string;
  label: string;
  inputType: string;
  rightLogo?: string;
  changedType?: string;
  value: string | undefined;
  onChange: (val: string) => void;
  error: string[];
}

export const FormElement = ({
  logo,
  label,
  inputType,
  rightLogo,
  changedType,
  value,
  onChange,
  error,
}: Props) => {
  const [type, setType] = useState(inputType);
  const isError = useCallback(
    (key: string) => {
      if (key === "User name") {
        return error.includes("name");
      } else if (key === "Email") {
        return error.includes("email");
      } else {
        return error.includes("password");
      }
    },
    [error]
  );

  const errorMessage = useCallback((key: string) => {
    if (key === "User name") {
      if (value !== "emilys") {
        return "Username must be emilys";
      } else {
        return "Name is required!";
      }
    } else if (key === "Email") {
      return "Please enter a valid email!";
    } else {
      return " The password must contain a minimum of 8 characters.";
    }
  }, []);
  return (
    <>
      <div
        className={`${styles.formEle} ${
          isError(label) ? styles.errorBorder : ""
        } `}
      >
        <div>
          <img src={logo} alt={logo} />
        </div>
        <div className={styles.formMain}>
          <div className={styles.inputEle}>
            <label className={styles.label} htmlFor={label}>
              {label}
            </label>
            <input
              type={changedType ? type : inputType}
              className={styles.inputBox}
              id={label}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </div>
          <div>
            <img
              src={rightLogo}
              alt={rightLogo}
              onClick={() => {
                if (type === changedType) {
                  setType(inputType);
                } else {
                  setType(changedType!);
                }
              }}
            />
          </div>
        </div>
      </div>
      {isError(label) && (
        <span className={`${styles.errorText} text-danger ms-1 mt-1`}>
          {errorMessage(label)}
        </span>
      )}
    </>
  );
};
