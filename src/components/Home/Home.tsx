import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../AppContetxt";
import profile from "../../assets/Frame 1116607307.svg"
import styles from "./Home.module.scss";
const capitalizeFirstLetter=(word:string|undefined)=>{
  if(!word) return "";

    return word.slice(0,1).toUpperCase()+word.slice(1)
  
 
}
const Home = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Component must be used inside AppProvider");
  }
  const { userData } = context;
  const navigate = useNavigate();

  const [user, setUser] = useState(userData);
  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("userData") + "");
    setUser(parsedUser);
  }, []);
  return (
    <div className={styles.home}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p className={styles.heading1}>Welcome to </p>
        <p className={styles.heading2}>Unstop</p>
      </div>
      <div className={styles.userCard}>
        <div className={styles.profile}>
          <img src={profile} alt={user?.username} />
        </div>
         <p className={`${styles.username} mt-3`}>{capitalizeFirstLetter(user?.username || "Michael Dam")}</p>
        <p className={`${styles.email} mt-2`}>{user?.email || "example@gmail.com"}</p>
        <p className={`${styles.email} mt-1 mb-3`}>{capitalizeFirstLetter(user?.gender || "Female")}</p>
        <button 
        className={styles.logoutBtn}
          onClick={() => {
            localStorage.setItem("token", "");
            toast.success("Logged out!");
            navigate("/auth/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
