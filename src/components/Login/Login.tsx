import google from "../../assets/Frame 1116607310.png";
import illustration from "../../assets/Illustration.svg";
import user from "../../assets/account_circle.png";
import mail from "../../assets/mail.png";
import key from "../..//assets/key.png";
import eye from "../../assets/visibility.png";
import facebook from "../../assets/Frame 1116607311.png";
import { FormElement } from "./FormElement/FormElement";
import { SimpleAuth } from "./SimpleAuth/SimpleAuth";
import styles from "./login.module.scss";
import { useContext, useState } from "react";
import { userLogin } from "../../service/auth";
import { toast } from "react-toastify";
import { AppContext } from "../../AppContetxt";
import { useNavigate } from "react-router-dom";
const Login = () => {
  return (
    <div className={styles.loginMain}>
      <div className={styles.leftDiv}>
        <img src={illustration} alt="Illustration" className={styles.illustration} />
      </div>
      <div className={styles.rightDiv}>
        <LoginBlock />
      </div>
    </div>
  );
};
interface FormData {
  name?: string;
  email?: string;
  password?: string;
}
const LoginBlock = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Component must be used inside AppProvider");
  }
  const { setUserData } = context;
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const handleChange = (field: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setError([]);
  };
  const validatePayload = (): string[] => {
    const newErrors: string[] = [];

    if (
      !formData?.name ||
      formData.name.trim() === "" ||
      formData.name !== "emilys"
    ) {
      newErrors.push("name");
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email || !emailRegex.test(formData.email)) {
      newErrors.push("email");
    }

    // Password check
    if (!formData?.password || formData.password.length < 8) {
      newErrors.push("password");
    }

    setError(newErrors);
    return newErrors;
  };

  const handleLogin = async () => {
    const err = validatePayload();
    if (err.length === 0) {
      try {
        const data = await userLogin({
          username: formData?.name ?? "",
          password: formData?.password ?? "",
        });
        toast.success("Login successful");
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userData", JSON.stringify(data));
        setUserData(data);
        navigate("/home");
      } catch (err) {
        toast.error(`Login failed: ${err}`);
        alert("Use password as emilyspass");
      } finally {
        setFormData({
          email: "",
          name: "",
          password: "",
        });
      }
    }
  };

  return (
    <div className={styles.loginBlock}>
      <div className={styles.heading1}>Welcome to </div>
      <div className={`${styles.heading2} mb-2`}> Unstop</div>
      <SimpleAuth logo={google} text="Login with Google" />
      <SimpleAuth logo={facebook} text="Login with Facebook" />
      <div className={styles.divider}>
        <hr className={styles.line} />
        <span className={styles.or}>OR</span>
        <hr className={styles.line} />
      </div>

      <FormElement
        logo={user}
        label="User name"
        inputType="text"
        value={formData?.name}
        onChange={(val: string) => {
          handleChange("name", val);
        }}
        error={error}
      />
      <FormElement
        logo={mail}
        label="Email"
        inputType="email"
        value={formData?.email}
        onChange={(val: string) => {
          handleChange("email", val);
        }}
        error={error}
      />
      <FormElement
        logo={key}
        label="Password"
        inputType="password"
        changedType="text"
        rightLogo={eye}
        value={formData?.password}
        onChange={(val: string) => {
          handleChange("password", val);
        }}
        error={error}
      />
      <div className={styles.loginFooter}>
        <div className={styles.remember}>
          <input type="checkbox" id="remeber" className={styles.check} />{" "}
          <label htmlFor="remeber">Remember me</label>
        </div>
        <p className={styles.blueText}>Forgot Password?</p>
      </div>
      <button className={styles.loginBtn} onClick={handleLogin}>
        Login
      </button>
      <div className={styles.account}>
        Don’t have an account?
        <span className={styles.accountText}>Register</span>{" "}
      </div>
    </div>
  );
};

export default Login;
