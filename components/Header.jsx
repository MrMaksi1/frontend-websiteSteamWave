// src/components/Header.jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './components.css'

export default function Header() {
    const pathname = usePathname()

    const isActive = (path) => {
        return pathname === path
    }

    return (
        <header className="header-main">
            <div className="header-container">
                <nav className="nav">

                    <Link href="/" className="nav-logo">
                        STEAMWAVE
                    </Link>

                    <span className="nav-divider" />

                    <ul className="nav-links-list">
                        <li><Link href="/" className={`${isActive('/') ? 'nav-link active' : 'nav-link'}`}>Главная</Link></li>
                        <li><Link href="/about" className={`${isActive('/about') ? 'nav-link active' : 'nav-link'}`}>О нас</Link></li>
                        <li><Link href="/contact" className={`${isActive('/contact') ? 'nav-link active' : 'nav-link'}`}>Контакты</Link></li>
                        <li><Link href="/blog" className={`${isActive('/blog') ? 'nav-link active' : 'nav-link'}`}>Блог</Link></li>
                    </ul>

                    <span className="nav-divider" />

                    <Link href="/profile" className={`${isActive('/blog') ? 'nav-link active' : 'nav-link'}`}>Профиль</Link>
                </nav>
            </div>
        </header>
    )
}