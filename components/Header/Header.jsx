'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import '../components.css'
import styles from './Header.module.css'
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";

export default function Header() {
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true) // Компонент отрендерился на клиенте
        const token = localStorage.getItem('accessToken')
        setIsAuthorized(!!token)
    }, [])

    if (!mounted) {
        // Пока не смонтировалось — не рендерим ничего, чтобы не вызвать конфликт
        return null
    }

    const isActive = (path) => pathname === path

    const menuItems = [
        { label: 'Главная', href: '/' },
        { label: 'О нас', href: '/about' },
        { label: 'Новости', href: '/news' },
        { label: 'Правила', href: '/rules' }
    ]

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.headerLogo}>
                        <span className={styles.headerLogoIcon}></span>
                    </Link>

                    <div className={styles.menuWrap}>
                        <BurgerMenu menuItems={menuItems} />
                    </div>

                    <span className={styles.headerDivider}/>

                    <div className={styles.headerCenter}>
                        <ul className={styles.headerLinksList}>
                            {menuItems.map(item => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`${styles.headerLink} ${isActive(item.href) ? 'active' : ''}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <span className={styles.headerDivider}/>

                    {isAuthorized ? (
                        <Link href="/profile" className={`${styles.headerProfile} ${isActive('/profile') ? 'active' : ''}`}>
                            <img
                                className={styles.headerProfileImage}
                                src="https://minotar.net/helm/kotean_st/32.png"
                                alt="Profile picture"
                            />
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
