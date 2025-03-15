import { useState, useEffect } from "react";
import ModalList from "../ModelList/ModelList";
import styles from "./Main.module.css";
import { getMessages, sendMessage } from "../../api";  // Импортируем необходимые функции
import { useChatContext } from "../../ChatContext";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// Определим тип для сообщения
interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export default function Main() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  // const [chatId, setChatId] = useState("320823e5-52ed-48a7-b483-5c41d36460f7"); 

  const { activeChat } = useChatContext()

  console.log(activeChat)


  // Получаем сообщения при монтировании компонента

  useEffect(() => {

    if (!activeChat) {
      return
    }

    var eventSource = new EventSourcePolyfill(`https://bothubq.com/api/v2/chat/${activeChat}/stream`, {
      headers: {
        authorization: "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNjBhOTAxLWJiMzYtNDIzZS05NGQ1LWVmMzM5YTcxMDQwNSIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3NDAwNjA3NDEsImV4cCI6MjA1NTYzNjc0MX0.JYrAECA8EpzptOqtKIyq7gJWf83hburC9S25yF5Xt3k"
      }
    });


    eventSource.onmessage = function (event) {
      console.log("Новое сообщение", JSON.parse(event.data));
      // этот код выведет в консоль 3 сообщения, из потока данных выше
    };

    getMessages(activeChat)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [activeChat]);

  // Обработчик изменения ввода сообщения
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Обработчик отправки сообщения
  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat) {
      return; // Не отправляем пустое сообщение
    }

    try {
      const response = await sendMessage(activeChat, message); // Отправляем сообщение
      // После отправки, добавляем сообщение в список сообщений
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     id: response.id,
      //     content: message,
      //     user_id: "user", // Можно передать идентификатор пользователя
      //     created_at: new Date().toISOString(),
      //   },
      // ]);
      // setMessage(""); // Очищаем поле ввода после отправки
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  console.log(messages)
  return (
    <div className={styles.background}>
      <ul className={styles.ul}>
        {/* Список сообщений */}
        {messages.map((msg) => (
          <li key={msg.id} className={styles.li__users}>
            <img className={styles.massage__copers} src="../src/img/message-tools.svg" alt="" />
            <div className={styles.block__user}>
              <span className={styles.massage__user}>{msg.user_id}</span>
              <span className={styles.time}>{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
            <img className={styles.avatar__users} src="../src/img/default-avatar.svg" alt="" />
            <div className={styles.messageContent}>
              <p className={styles.messageText}>{msg.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <ModalList />
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={message}
            onChange={handleMessageChange}
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
