import { useEffect, useState } from "react"
import ChatItem from "../ChatItem/ChatItem"
import Users from "../Users/Users"
import styles from "./ChatList.module.css"
import { deleteChat, getChats, postChat } from "../../api"
import { TChat } from "../../types"
import { useChatContext } from "../../ChatContext"

export default function Chats() {
    const [chats, setChats] = useState<TChat[]>([])
    const { setActiveChat } = useChatContext()

    // Получение всех чатов
    useEffect(() => {
        getChats()
            .then(({ data }) => {
                console.log("Доступные чаты:", data.data);
                setChats(data.data);
            })
            .catch((error) => console.log(error));
    }, []);

    // Функция для создания нового чата
    const handleCreateChat = async (name) => {
        try {
            console.log(name)
            console.log("Отправляем данные:", { name });
            const { data } = await postChat(name);
            setChats((prevChats) => [...prevChats, data]);
        } catch (error) {
            console.error("Ошибка при создании чата:", error);
        }
    };

    // Функция для удаления чата
    const handleDeleteChat = async (chatId: string) => {
        try {
            await deleteChat(chatId)
            setChats((prevChats) => prevChats.filter(chat => chat.id !== chatId))
        } catch (error) {
            console.log(error)
        }
    }

    const selectChat = (id: string) => {
        setActiveChat?.(id)
    }

    return (
        <>
            <div className={styles.menu}>
                <div className={styles.header}>
                    <img src="../src/img/logo.svg" alt="Logo" />
                    <div className={styles.language}>
                        <img className={styles.world} src="../src/img/lang.svg" alt="Language" />
                        <select className={styles.lang}>
                            <option className={styles.languages} value="RU">RU</option>
                            <option className={styles.languages} value="EN">EN</option>
                        </select>
                    </div>
                </div>

                <div className={styles.chats_menu}>
                    <button className={styles.newChat} onClick={() => handleCreateChat("Тестовый чат")}>
                        <img className={styles.img_chat} src="../src/img/add-chat.svg" alt="" />
                    </button>
                    <button className={styles.search}>
                        <img className={styles.img_chat} src="../src/img/search.svg" alt="" />
                    </button>
                </div>

                <div className={styles.center}>
                    <ul className={styles.list}>
                        {chats.map((chat) => (
                            <li key={chat.id} className={styles.chatItem}>
                                <ChatItem selectChat={selectChat} title={chat.name} handleDeleteChat={handleDeleteChat} id={chat.id} />
                            </li>
                        ))}
                    </ul>
                </div>

                <Users />
            </div>
        </>
    )
}
