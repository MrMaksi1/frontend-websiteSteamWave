import React, { useState, useEffect } from 'react';
import styles from './BurgerMenu.module.css';
import {usePathname} from "next/navigation";

const BurgerMenu = ({ menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname()

    const isActive = (path) => {
        return pathname === path
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.burgerMenu}>
            <button className={`${styles.burgerButton} ${isOpen ? styles.burgerButtonOpen : ''}`} onClick={toggleMenu} aria-label="Открыть меню">
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
                <span className={styles.burgerLine}></span>
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={toggleMenu}></div>
            )}

            <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
                <nav className={styles.nav}>
                    {menuItems.map((item, index) => (
                        // <a key={index} href={item.href} className={styles.menuItem} onClick={handleItemClick}>
                        <a key={index} href={item.href} className={`${styles.menuItem} ${isActive(item.href) ? 'active' : ''}`} onClick={handleItemClick}>
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default BurgerMenu;