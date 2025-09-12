// src/components/Header.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                        <Image className="nav-logo image" src="/black_256.svg" alt="SteamWave logo" width={320} height={38} priority/>
                        STEAMWAVE
                    </Link>

                    <span className="nav-divider" />

                    <div className="nav-center">
                        <ul className="nav-links-list">
                            <li><Link href="/" className={`${isActive('/') ? 'nav-link active' : 'nav-link'}`}>Главная</Link></li>
                            <li><Link href="/about" className={`${isActive('/about') ? 'nav-link active' : 'nav-link'}`}>О нас</Link></li>
                            <li><Link href="/contact" className={`${isActive('/contact') ? 'nav-link active' : 'nav-link'}`}>Контакты</Link></li>
                            <li><Link href="/blog" className={`${isActive('/blog') ? 'nav-link active' : 'nav-link'}`}>Блог</Link></li>
                        </ul>
                    </div>

                    <span className="nav-divider" />

                    <Link href="/profile" className={`${isActive('/profile') ? 'nav-profile active' : 'nav-profile'}`}>
                        {/*<Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={320} height={38} priority/>*/}
                        {/*Профиль*/}
                        <img className="nav-profile-image" src="https://minotar.net/helm/kotean_st/32.png" alt="Profile picture" />
                    </Link>
                </nav>
            </div>
        </header>
    )
}