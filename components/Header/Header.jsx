'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../components.css'
import styles from './Header.module.css'
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Header() {
    const pathname = usePathname()

    const isActive = (path) => {
        return pathname === path
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <nav className={styles.nav}>

                    <Link href="/public" className={styles.headerLogo}>
                        <span className={styles.headerLogoIcon}></span>
                        {/*STEAMWAVE*/}
                    </Link>

                    {/*<HamburgerMenu />*/}

                    <span className={styles.headerDivider}/>

                    <div className={styles.headerCenter}>
                        <ul className={styles.headerLinksList}>
                            <li><Link href="/" className={`${styles.headerLink} ${isActive('/') ? 'active' : ''}`}>Главная</Link></li>
                            <li><Link href="/about" className={`${styles.headerLink} ${isActive('/about') ? 'active' : ''}`}>О нас</Link></li>
                            <li><Link href="/news" className={`${styles.headerLink} ${isActive('/news') ? 'active' : ''}`}>Новости</Link></li>
                            <li><Link href="/rules" className={`${styles.headerLink} ${isActive('/rules') ? 'active' : ''}`}>Правила</Link></li>
                        </ul>
                    </div>

                    <span className={styles.headerDivider}/>

                    <Link href="/profile" className={`${styles.headerProfile} ${isActive('/profile') ? 'active' : ''}`}>
                        <img className={styles.headerProfileImage} src="https://minotar.net/helm/kotean_st/32.png" alt="Profile picture"/>
                    </Link>
                </nav>
            </div>
        </header>
    )
}