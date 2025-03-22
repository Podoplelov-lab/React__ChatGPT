import styles from "./AuthModal.module.css";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.fullscreenOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Авторизация</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.content}>
          <label className={styles.label}>Имя</label>
          <input type="name" placeholder="Ваше имя" className={styles.input} />
          <label className={styles.label}>Пароль</label>
          <input type="password" placeholder="Ваш Пароль" className={styles.input} />
          <button className={styles.button}>Войти</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;