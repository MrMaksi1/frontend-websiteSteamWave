'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (path) => pathname === path

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <>
            {/* Кнопка гамбургера */}
            <button
                className="hamburger-button"
                onClick={toggleMenu}
                aria-label="Открыть меню"
            >
                <span className="hamburger-icon">☰</span>
            </button>

            {/* Полноэкранное меню */}
            {isOpen && (
                <div className="fullscreen-menu">
                    <div className="fullscreen-menu-content">
                        {/* Кнопка закрытия */}
                        <button
                            className="close-button"
                            onClick={toggleMenu}
                            aria-label="Закрыть меню"
                        >
                            ✕
                        </button>

                        {/* Логотип */}
                        <div className="menu-logo">
                            <span className="header-logo-icon"></span>
                            STEAMWAVE
                        </div>

                        {/* Навигационные ссылки */}
                        <nav className="menu-nav">
                            <Link href="/" className={`menu-link ${isActive('/') ? 'active' : ''}`} onClick={toggleMenu}>Главная</Link>
                            <Link href="/about" className={`menu-link ${isActive('/about') ? 'active' : ''}`} onClick={toggleMenu}>О нас</Link>
                            <Link href="/news" className={`menu-link ${isActive('/news') ? 'active' : ''}`} onClick={toggleMenu}>Новости</Link>
                            <Link href="/rules" className={`menu-link ${isActive('/rules') ? 'active' : ''}`} onClick={toggleMenu}>Правила</Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}