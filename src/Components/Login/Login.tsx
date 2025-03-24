import { useActionState, } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {

  const navigate = useNavigate()

  const [, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name" )
      const password = formData.get("password")
      localStorage.setItem("auth", JSON.stringify({name, password}))
      navigate({to: "/"})
    },
    null,
  );


  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   if (!name || !password) {
  //     alert("Пожалуйста, заполните все поля");
  //     return;
  //   }
  //   const userData = { name, password };
  //   localStorage.setItem("userData", JSON.stringify(userData));
  //   // Уведомляем другие компоненты об изменении
  //   window.dispatchEvent(new Event("storage"));
  // };

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
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label}>Пароль</label>
          <input
            type="password"
            placeholder="Ваш Пароль"
            className={styles.input}
            name="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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