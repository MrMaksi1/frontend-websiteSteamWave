'use client'

import { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import AdminPage from '@/components/Admin/AdminPage'
import styles from './page.module.css'

export default function Home() {
    const [activeSection, setActiveSection] = useState('users')

    const adminSections = [
        { id: 'users', title: 'Игроки', icon: 'P' },
        { id: 'news', title: 'Новости', icon: 'N' },
    ]

    return (
        <main>
            <aside className={styles.absoluteSidebar}>
                <nav className={styles.sidebarNav}>
                    <h2 className={styles.sidebarHeader}>Разделы</h2>
                    {adminSections.map(section => (
                        <button
                            key={section.id}
                            className={`${styles.sidebarButton} ${activeSection === section.id ? styles.active : ''}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <span className={styles.sidebarIcon}>{section.icon}</span>
                            <span className={styles.sidebarText}>{section.title}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <AdminPage activeSection={activeSection} />
        </main>
    );
}