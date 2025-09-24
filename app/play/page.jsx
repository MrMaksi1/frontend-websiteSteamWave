import DownloadButtons from '@/components/DownloadButtons/DownloadButtons'
import styles from './page.module.css'

export default function PlayPage() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Начать играть</h1>
                <p className={styles.description}>
                    Качай лаунчер и начинай играть прямо сейчас!
                </p>
            </div>

            <DownloadButtons />

            {/*<div className={styles.info}>*/}
            {/*    <h2 className={styles.infoTitle}>Как начать играть?</h2>*/}
            {/*    <ol className={styles.steps}>*/}
            {/*        <li>Скачайте лаунчер для вашей системы</li>*/}
            {/*        <li>Запустите лаунчер и дождитесь загрузки</li>*/}
            {/*        <li>Введите IP адрес сервера: <code>play.steamwave.ru</code></li>*/}
            {/*        <li>Наслаждайтесь игрой!</li>*/}
            {/*    </ol>*/}
            {/*</div>*/}
        </div>
    )
}

export const metadata = {
    title: 'Скачать лаунчер - STEAMWAVE',
    description: 'Скачайте лаунчер для игры на сервере STEAMWAVE',
}