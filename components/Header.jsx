'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './components.css'
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Header() {
    const pathname = usePathname()

    const isActive = (path) => {
        return pathname === path
    }

    return (
        <header className="header">
            <div className="header-container">
                <nav className="nav">

                    <Link href="/" className="header-logo">
                        <span className="header-logo-icon"></span>
                        {/*STEAMWAVE*/}
                    </Link>

                    {/*<HamburgerMenu />*/}

                    <span className="header-divider"/>

                    <div className="header-center">
                        <ul className="header-links-list">
                            <li><Link href="/" className={`header-link ${isActive('/') ? 'active' : ''}`}>Главная</Link></li>
                            <li><Link href="/about" className={`header-link ${isActive('/about') ? 'active' : ''}`}>О нас</Link></li>
                            <li><Link href="/news" className={`header-link ${isActive('/news') ? 'active' : ''}`}>Новости</Link></li>
                            <li><Link href="/rules" className={`header-link ${isActive('/rules') ? 'active' : ''}`}>Правила</Link></li>
                        </ul>
                    </div>

                    <span className="header-divider"/>

                    <Link href="/profile" className={`header-profile ${isActive('/profile') ? 'active' : ''}`}>
                        <img className="header-profile-image" src="https://minotar.net/helm/kotean_st/32.png"
                             alt="Profile picture"/>
                    </Link>
                </nav>
            </div>
        </header>
    )
}