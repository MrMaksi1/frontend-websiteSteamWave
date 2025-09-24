// components/StubPage/StubPage.jsx
import Link from 'next/link'
import styles from './PagePlaceholder.module.css'

export default function PagePlaceholder({ pageName = "Упс, этой страницы пока нет", pageDescription = "Но мы уже работаем над этим! Скоро здесь появится что-то интересное." }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.emoji}>🚧</div>
                <h1 className={styles.title}>{pageName}</h1>
                <p className={styles.description}>{pageDescription}</p>
                <div className={styles.buttons}>
                    <Link href="/" className={styles.primaryButton}>
                        На главную
                    </Link>
                    <Link href="/play" className={styles.secondaryButton}>
                        Играть сейчас
                    </Link>
                </div>
            </div>
        </div>
    )
}