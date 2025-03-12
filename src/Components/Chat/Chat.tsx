import styles from "./Chat.module.css"


export default function Chat ({title, handleDeleteChat, chat}: {title: string,}) {
    return(
        <li className={styles.lists}>
        <div className={styles.info}>
            <img className={styles.lists_img} src="../src/img/sidebar-chat.svg" alt="" />
            <span>{title}</span>
        </div>
        <img onClick={() => handleDeleteChat(chat.id)} src="../src/img/trash.svg" alt="" />
    </li>
    )
}


