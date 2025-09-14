// src/components/Header.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import './components.css'
import ThemeToggle from "@/components/ThemeToggle";

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            STEAMWAVE
                        </Link>
                        <p className="footer-description">
                            Создаем будущее вместе. Инновационные решения для цифровой эпохи.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4 className="footer-title">Навигация</h4>
                            <ul className="footer-list">
                                <li><Link href="/" className="footer-link">Главная</Link></li>
                                <li><Link href="/about" className="footer-link">О нас</Link></li>
                                <li><Link href="/news" className="footer-link">Новости</Link></li>
                                <li><Link href="/rules" className="footer-link">Правила</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-title">Ресурсы</h4>
                            <ul className="footer-list">
                                <li><a href="#" className="footer-link">Документация</a></li>
                                <li><a href="#" className="footer-link">Поддержка</a></li>
                                <li><a href="#" className="footer-link">Сообщество</a></li>
                                <li><a href="#" className="footer-link">Статус</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4 className="footer-title">Социальные сети</h4>
                            <ul className="footer-list">
                                <li><a href="#" className="footer-link">Telegram</a></li>
                                <li><a href="#" className="footer-link">VK</a></li>
                                <li><a href="#" className="footer-link">GitHub</a></li>
                                <li><a href="#" className="footer-link">Twitter</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>© {currentYear} STEAMWAVE. Все права защищены.</p>
                    </div>

                    <div className="footer-legal">
                        <Link href="/privacy" className="footer-legal-link">
                            Политика конфиденциальности
                        </Link>
                        <Link href="/terms" className="footer-legal-link">
                            Условия использования
                        </Link>
                    </div>

                    <div className="footer-theme">
                        <ThemeToggle />
                    </div>
                </div>

            </div>
        </footer>
    )
}