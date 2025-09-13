import styles from "./SimpleAuth.module.scss";
interface Props {
  logo: string;
  text: string;
}
export const SimpleAuth = ({ logo, text }: Props) => {
  return (
    <div className={styles.authDiv}>
      <img src={logo} alt={logo} height={24} width={24} />
      <div className={styles.loginText}>{text}</div>
    </div>
  );
};
