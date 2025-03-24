import { useActionState, } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {

  const navigate = useNavigate()

  const [, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name")
      const password = formData.get("password")
      localStorage.setItem("auth", JSON.stringify({ name, password }))
      navigate({ to: "/" })
    },
    null,
  );



  return (
    <div className={styles.fullscreenOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Авторизация</h2>
        </div>
        <form action={submitAction} className={styles.content}>
          <label className={styles.label}>Имя</label>
          <input
            type="text"
            placeholder="Ваше имя"
            className={styles.input}
            name="name"
          />
          <label className={styles.label}>Пароль</label>
          <input
            type="password"
            placeholder="Ваш Пароль"
            className={styles.input}
            name="password"
          />
          <button type="submit" disabled={isPending} className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;