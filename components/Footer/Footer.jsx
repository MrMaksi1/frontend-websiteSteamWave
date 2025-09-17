// src/components/Header.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import '../components.css'
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Footer.module.css"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.footerBrand}>
                        <Link href="/public" className={styles.footerLogo}>
                            STEAMWAVE
                        </Link>
                        <p className={styles.footerDescription}>
                            Погрузись в мир паровой индустриализации с нами.
                        </p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.footerColumn}>
                            <h4 className={styles.footerTitle}>Навигация</h4>
                            <ul className={styles.footerList}>
                                <li><Link href="/public" className={styles.footerLink}>Главная</Link></li>
                                <li><Link href="/about" className={styles.footerLink}>О нас</Link></li>
                                <li><Link href="/news" className={styles.footerLink}>Новости</Link></li>
                                <li><Link href="/rules" className={styles.footerLink}>Правила</Link></li>
                            </ul>
                        </div>

                        <div className={styles.footerColumn}>
                            <h4 className={styles.footerTitle}>Ресурсы</h4>
                            <ul className={styles.footerList}>
                                <li><a href="#" className={styles.footerLink}>Вики</a></li>
                                <li><a href="#" className={styles.footerLink}>Поддержка</a></li>
                                <li><a href="#" className={styles.footerLink}>Сообщество</a></li>
                                <li><a href="#" className={styles.footerLink}>Статус</a></li>
                            </ul>
                        </div>

                        <div className={styles.footerColumn}>
                            <h4 className={styles.footerTitle}>Социальные сети</h4>
                            <ul className={styles.footerList}>
                                <li><a href="https://t.me/steamwavemc/" className={styles.footerLink}>Telegram</a></li>
                                <li><a href="#" className={styles.footerLink}>Discord</a></li>
                                <li><a href="#" className={styles.footerLink}>YouTube</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className={styles.footerDivider}></div>

                <div className={styles.footerBottom}>
                    <div className={styles.footerCopyright}>
                        <p>© {currentYear} STEAMWAVE. Все права защищены.</p>
                    </div>

                    <div className={styles.footerLegal}>
                        <Link href="/privacy" className={styles.footerLegalLink}>
                            Политика конфиденциальности
                        </Link>
                        <Link href="/terms" className={styles.footerLegalLink}>
                            Условия использования
                        </Link>
                    </div>

                    <div className={styles.footerTheme}>
                        <ThemeToggle />
                    </div>
                </div>

            </div>
        </footer>
    )
}