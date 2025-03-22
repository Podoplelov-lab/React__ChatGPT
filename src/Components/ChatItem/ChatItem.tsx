import styles from "./ChatItem.module.css"


export default function ChatItem ({title, handleDeleteChat, id, selectChat}: {title: string,}) {
    return(
        <li className={styles.lists}>
        <div onClick={() => selectChat(id)} className={styles.info}>
            <img className={styles.lists_img} src="../src/img/sidebar-chat.svg" alt="" />
            <span className={styles.title}>{title}</span>
        </div>
        <img onClick={() => handleDeleteChat(id)} src="../src/img/trash.svg" alt="" />
    </li>
    )
}


