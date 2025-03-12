import styles from "./Users.module.css"

export default function User () {
    return(
        <div className={styles.users}>
        <div className={styles.info}>
        <img className={styles.avatar} src="../src/img/avatar.svg" alt="" />
        <div className={styles.nickname}>
            <span className={styles.nickname__content}>
                Василий
            </span>
            <span className={styles.nickname__content}>
                9 012 TKN
            </span>
        </div>
        </div>
        <div>
            <img src="../src/img/logout.svg" alt="" />
        </div>
    </div>
    )
}