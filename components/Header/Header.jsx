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
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        setMounted(true)
        const token = localStorage.getItem('accessToken')
        setIsAuthorized(!!token)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!mounted) {
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
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.initial}`}>
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
                                src="/public/icon.png"
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
