import { useEffect, useState } from "react";
import ModalList from "../ModelList/ModelList";
import styles from "./Main.module.css"
import { getMessages } from "../../api";

export default function Main() {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const iconMap = {
      "ChatGPT": "../src/img/gpt3.5.png",
      "DALL-E": "../src/img/gpt4.svg",
      "Midjourney": "../src/img/mj.svg"
    };
    
    event.target.style.backgroundImage = `url(${iconMap[selectedValue]})`;
  };

  const [messages, setMessages] = useState([])

  useEffect(() => {
     getMessages("320823e5-52ed-48a7-b483-5c41d36460f7").then(({data}) => {
      setMessages(data.data)
     }).catch((error) => {
          console.log(error)
     })
  },[])

  console.log(messages)

  return (
    <>
      <div className={styles.background}>
        <ul className={styles.ul}>
          <li className={styles.li__users}>
            <img className={styles.massage__copers} src="../src/img/message-tools.svg" alt="" />
            <div className={styles.block__user}>
              <span className={styles.massage__user}>Привет бот</span>
              <span className={styles.time}>09:54</span>
            </div>
            <img className={styles.avatar__users} src="../src/img/default-avatar.svg" alt="" />
          </li>


          <li className={styles.li__chatGPT}>
            <img className={styles.chatGPT__img} src="../src/img/gpt.svg" alt="" />
            <div className={styles.chatGPT_content}>
              <div className={styles.chatGPT__info}>
                <span className={styles.name}>
                  ChatGPT
                </span>
                <span className={styles.version}>
                  gpt-3.5-turbo
                </span>
              </div>
              <div>
                <span className={styles.massage__chatGPT}>
                  Привет! Чем я могу помочь?
                </span>
              </div>
              <div className={styles.massage__bottom}>
                <div className={styles.caps}>
                  <span className={styles.caps__content}>-223 CAPS</span>
                  <img className={styles.caps__img} src="../src/img/message-tools.svg" alt="" />
                </div>
                <div>
                  <span className={styles.time}>09:54</span>
                </div>
              </div>
            </div>
          </li>

        </ul>

        <div>
            <ModalList/>
        <div className={styles.inputContainer}>
          <input type="text" className={styles.input} placeholder="Cпроси о чем-нибудь..." />
          <button className={styles.sendButton}>
            <img src="../src/img/button.svg" alt="Отправить" />
          </button>
        </div>

        </div>

      </div>
    </>
  );
}