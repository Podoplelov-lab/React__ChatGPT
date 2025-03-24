import { useNavigate } from "@tanstack/react-router";
import styles from "./Users.module.css";

export default function User() {
  const navigate = useNavigate()


  const { name } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth") || "") : {}

  const logout = () => {
    localStorage.removeItem("auth")
    navigate({ to: "/login" })
  }


  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <img className={styles.avatar} src="../src/img/avatar.svg" alt="" />
        <div className={styles.nickname}>
          <span className={styles.nickname__content}>{name}</span>
        </div>
      </div>
      <div onClick={logout}>
        <img src="../src/img/logout.svg" alt="" />
      </div>
    </div>
  );
}