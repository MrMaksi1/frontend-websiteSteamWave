'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../components.css'
import styles from './Header.module.css'
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";

export default function Header() {
    const pathname = usePathname()

    const isAuthorized = false;

    const isActive = (path) => {
        return pathname === path
    }

    const menuItems = [
        { label: 'Главная', href: '/'},
        { label: 'О нас', href: '/about'},
        { label: 'Новости', href: '/news'},
        { label: 'Правила', href: '/rules'}
    ]

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <nav className={styles.nav}>

                    <Link href="/" className={styles.headerLogo}>
                        <span className={styles.headerLogoIcon}></span>
                        {/*STEAMWAVE*/}
                    </Link>

                    <div className={styles.menuWrap}>
                        <BurgerMenu menuItems={menuItems} />
                    </div>

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

                    {isAuthorized ? (
                        <Link href="/profile" className={`${styles.headerProfile} ${isActive('/profile') ? 'active' : ''}`}>
                            <img className={styles.headerProfileImage} src="https://minotar.net/helm/kotean_st/32.png" alt="Profile picture"/>
                        </Link>
                    ) : (
                        <Link href="/log-reg" className={`${styles.headerLogin} ${isActive('/log-reg') ? 'active' : ''}`}>
                            <span className={styles.headerLoginIcon}/>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}