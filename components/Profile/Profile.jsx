'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Profile.module.css'
import Notification from '@/components/Notification/Notification'
import Image from "next/image";

export default function Profile() {
    const [userData, setUserData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState({ username: '', email: '', oldPassword: '', newPassword: '' })
    const [notification, setNotification] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const API_URL = 'http://localhost:8080/api/profile'

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                router.push('/log-reg')
                return
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data.message || 'Ошибка при загрузке профиля')

                localStorage.setItem('role', data.role)

                const registrationDate = data.registrationDate
                const now = new Date()
                const formattedTime = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                const formattedDate = now.toLocaleDateString('ru-RU')

                setUserData({
                    username: data.username,
                    email: `${data.username}@steamwave.ru`,
                    registrationDate: registrationDate,
                    lastLogin: `${formattedTime} - ${formattedDate}`,
                    role: data.role,
                    rank: data.role === 'ROLE_ADMIN' ? 'Администратор' : 'Игрок',
                    balance: 0,
                    playTime: '0 часов',
                    servers: ['Create']
                })

                setEditedData({
                    username: data.username,
                    email: `${data.username}@steamwave.ru`,
                    oldPassword: '',
                    newPassword: ''
                })
            } catch (err) {
                setError(err.message)
                setNotification({ message: err.message, type: 'error' })
                setTimeout(() => router.push('/log-reg'), 1500)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const handleEdit = () => setIsEditing(true)
    const handleCancel = () => {
        setIsEditing(false)
        setEditedData({ ...userData, oldPassword: '', newPassword: '' })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) return

        try {
            if (editedData.username !== userData.username) {
                const res = await fetch(`${API_URL}/username`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newUsername: editedData.username })
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Ошибка при смене username')
                setUserData(prev => ({ ...prev, username: editedData.username }))
                localStorage.setItem('username', editedData.username)
            }

            if (editedData.oldPassword && editedData.newPassword) {
                const res = await fetch(`${API_URL}/password`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ oldPassword: editedData.oldPassword, newPassword: editedData.newPassword })
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Ошибка при смене пароля')
            }

            setIsEditing(false)
            setEditedData({ ...userData, oldPassword: '', newPassword: '' })
            setNotification({ message: 'Профиль успешно обновлен!', type: 'success' })
        } catch (err) {
            setNotification({ message: err.message, type: 'error' })
        }
    }

    if (loading) return <div className={styles.profileContainer}>Загрузка профиля...</div>
    if (error) return <div className={styles.profileContainer}><div className={styles.errorMessage}>{error}</div></div>
    if (!userData) return null

    const stats = [
        { label: 'SOON™', value: `${userData.balance} ₽`, icon: styles.iconWallet },
        { label: 'SOON™', value: userData.playTime, icon: styles.iconTime }
    ]

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h1 className={styles.profileTitle}>Профиль</h1>
            </div>

            <div className={styles.profileContent}>
                <div className={styles.profileCard}>
                    <div className={styles.infoSection}>
                        <div className={styles.usernameRow}>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={editedData.username}
                                    onChange={handleInputChange}
                                    className={styles.editInput}
                                />
                            ) : (
                                <h2 className={styles.username}>{userData.username}</h2>
                            )}
                            <span className={styles.rankBadge}>{userData.rank}</span>
                        </div>

                        <div className={styles.userInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Email:</span>
                                <span className={styles.infoValue}>{userData.email}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Регистрация:</span>
                                <span className={styles.infoValue}>{userData.registrationDate}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Последний вход:</span>
                                <span className={styles.infoValue}>{userData.lastLogin}</span>
                            </div>

                            {isEditing && (
                                <div className={styles.editPassword}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Старый пароль:</span>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={editedData.oldPassword}
                                            onChange={handleInputChange}
                                            className={styles.editInput}
                                        />
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}>Новый пароль:</span>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={editedData.newPassword}
                                            onChange={handleInputChange}
                                            className={styles.editInput}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isEditing ? (
                            <div className={styles.buttonGroup}>
                                <button className={styles.editButton} onClick={handleEdit}>Редактировать профиль</button>
                                <button
                                    className={styles.logoutButton}
                                    onClick={() => {
                                        localStorage.clear()
                                        setUserData(null)
                                        router.push('/log-reg')
                                    }}
                                >
                                    Выйти
                                </button>

                                {userData.role === 'ROLE_ADMIN' && (
                                    <button
                                        className={styles.adminButton}
                                        onClick={() => router.push('/admin')}
                                    >
                                        Админка
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={styles.editActions}>
                                <button className={styles.saveButton} onClick={handleSave}>Сохранить</button>
                                <button className={styles.cancelButton} onClick={handleCancel}>Отмена</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statIconBg}>
                                <div className={`${styles.statIcon} ${stat.icon}`}></div>
                            </div>
                            <div className={styles.statContent}>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.serversSection}>
                    <h3 className={styles.sectionTitle}>Любимые сервера</h3>
                    <div className={styles.serversList}>
                        {userData.servers.map((server, index) => (
                            <div key={index} className={styles.serverBadge}>{server}</div>
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
