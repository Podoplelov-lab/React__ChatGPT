import { useState, useEffect } from "react";
import ModalList from "../ModelList/ModelList.tsx";
import styles from "./Chat.module.css";
import { getMessages, sendMessage } from "../../api/index.ts";
import { useChatContext } from "../../ChatContext.tsx";
import { EventSourcePolyfill } from "event-source-polyfill";
import { TOKEN } from "../../const/index.ts";

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export default function Main() {
  const { activeChat } = useChatContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");


  useEffect(() => {
    if (!activeChat) return;

    const eventSource = new EventSourcePolyfill(`https://bothubq.com/api/v2/chat/${activeChat}/stream`, {
      headers: {
        authorization:
          `Token ${TOKEN}`,
      },
    });

    eventSource.onmessage = function (event: any) {
      const newMessage = JSON.parse(event.data);
      const {name, data} = newMessage 

      if(name === "MESSAGE_UPDATE" && data.message.chat_id){
        console.log("Новое сообщение из стрима:", newMessage);
        setMessages((prevMessages) => [data.message, ...prevMessages]);
      }

    };
    

    getMessages(activeChat)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((error) => {
        console.log("Ошибка загрузки сообщений:", error);
      });

    return () => {
      eventSource.close();
    };
  }, [activeChat]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!value.trim() || !activeChat) return;

    try {
      await sendMessage(activeChat, value);
      setValue(""); // Очищаем поле после отправки
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div className={styles.background}>
      <ul className={styles.ul}>
        {[...messages].reverse().map((msg, index) => {
          const isChatGPT = index % 2 === 1;
          return (
            <li
              key={msg.id}
              className={isChatGPT ? styles.li__chatGPT : styles.li__users}
            >
              {isChatGPT ? (
                <>
                  <img className={styles.chatGPT__img} src="../src/img/gpt.svg" alt="ChatGPT" />
                  <div className={styles.chatGPT_content}>
                    <div className={styles.chatGPT__info}>
                      <span className={styles.name}>ChatGPT</span>
                      <span className={styles.version}>v1.0</span>
                    </div>
                    <span className={styles.massage__chatGPT}>{msg.content}</span>
                    <div className={styles.massage__bottom}>
                      <span className={styles.caps__content}>
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    className={styles.massage__copers}
                    src="../src/img/message-tools.svg"
                    alt=""
                  />
                  <div className={styles.block__user}>
                    <span className={styles.massage__user}>{msg.content}</span>
                    <span className={styles.time}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <img
                    className={styles.avatar__users}
                    src="../src/img/default-avatar.svg"
                    alt=""
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
      <div>
        <ModalList />
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={onChange}
            placeholder="Спроси о чем-нибудь..."
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            <img src="../src/img/button.svg" alt="Отправить" />
          </button>
        </div>
      </div>
    </div>
  );
  
}