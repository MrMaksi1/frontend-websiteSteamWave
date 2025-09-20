'use client'

import { useState } from 'react'
import styles from './Profile.module.css'
import Notification from '@/components/Notification/Notification'

export default function Profile() {
    const [userData, setUserData] = useState({
        username: 'kotean_st',
        email: 'koteanst@gmail.com',
        registrationDate: '15.01.2024',
        lastLogin: '12:34 - 20.02.2025',
        rank: 'Игрок',
        balance: 248,
        playTime: '127 часов',
        achievements: 24,
        servers: ['Create']
    })

    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState({ ...userData })
    const [notification, setNotification] = useState(null)

    const handleEdit = () => {
        setIsEditing(true)
        setEditedData({ ...userData })
    }

    const handleSave = () => {
        setUserData(editedData)
        setIsEditing(false)
        setNotification({
            message: 'Профиль успешно обновлен!',
            type: 'success'
        })
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditedData({ ...userData })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const stats = [
        { label: 'Баланс', value: `${userData.balance} ₽`, icon: '💰' },
        { label: 'Время игры', value: userData.playTime, icon: '⏰' },
    ]

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h1 className={styles.profileTitle}>Профиль</h1>
            </div>

            <div className={styles.profileContent}>

                {/* Main information */}
                <div className={styles.profileCard}>
                    <div className={styles.avatarSection}>
                        <img
                            src="https://minotar.net/helm/kotean_st/128.png"
                            alt="Аватар"
                            className={styles.avatar}
                        />
                        <div className={styles.avatarOverlay}>
                            <span className={styles.changeAvatarText}>Сменить аватар</span>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.usernameRow}>
                            <h2 className={styles.username}>{userData.username}</h2>
                            <span className={styles.rankBadge}>{userData.rank}</span>
                        </div>

                        <div className={styles.userInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Email:</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedData.email}
                                        onChange={handleInputChange}
                                        className={styles.editInput}
                                    />
                                ) : (
                                    <span className={styles.infoValue}>{userData.email}</span>
                                )}
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Регистрация:</span>
                                <span className={styles.infoValue}>{userData.registrationDate}</span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Последний вход:</span>
                                <span className={styles.infoValue}>{userData.lastLogin}</span>
                            </div>
                        </div>

                        {!isEditing ? (
                            <button
                                className={styles.editButton}
                                onClick={handleEdit}
                            >
                                Редактировать профиль
                            </button>
                        ) : (
                            <div className={styles.editActions}>
                                <button
                                    className={styles.saveButton}
                                    onClick={handleSave}
                                >
                                    Сохранить
                                </button>
                                <button
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                >
                                    Отмена
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Статистика */}
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Сервера */}
                <div className={styles.serversSection}>
                    <h3 className={styles.sectionTitle}>Любимые сервера</h3>
                    <div className={styles.serversList}>
                        {userData.servers.map((server, index) => (
                            <div key={index} className={styles.serverBadge}>
                                {server}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    )
}