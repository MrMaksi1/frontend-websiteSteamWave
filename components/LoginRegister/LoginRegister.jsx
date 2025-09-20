'use client'

import { useState } from 'react'
import styles from './LoginRegister.module.css'
import Popup from "@/components/Popup/Popup";
import Notification from '@/components/Notification/Notification'
import CopyToClipboard from "@/components/ClipboardCopy/ClipboardCopy";

export default function LoginRegister() {
    const [activeTab, setActiveTab] = useState('login')
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        username: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [notification, setNotification] = useState(null)

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setError('')
        setSuccess('')
        setFormData({
            password: '',
            confirmPassword: '',
            username: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (activeTab === 'login') {
            if (!formData.username || !formData.password) {
                setError('Заполните все поля')
                return
            }
            console.log('Вход:', formData)
            setNotification({
                message: 'Вход выполнен успешно!',
                type: 'success'
            })
        } else {
            if (!formData.username || !formData.password || !formData.confirmPassword) {
                setError('Заполните все поля')
                return
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Пароли не совпадают')
                return
            }
            console.log('Регистрация:', formData)
            setNotification({
                message: 'Регистрация прошла успешно!',
                type: 'success'
            })
        }
    }

    const handleForgotPassword = () => {
        setShowForgotPassword(true)
    }

    return (
        <>
            <div className={styles.loginRegisterContainer}>
                <div className={styles.formWrapper}>
                    <div className={styles.tabs}>
                        <button
                            className={activeTab === 'login' ? styles.tabActive : styles.tab}
                            onClick={() => handleTabChange('login')}
                        >
                            Вход
                        </button>
                        <button
                            className={activeTab === 'register' ? styles.tabActive : styles.tab}
                            onClick={() => handleTabChange('register')}
                        >
                            Регистрация
                        </button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Логин</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Введите ваш никнейм"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Пароль</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Введите пароль"
                            />
                        </div>

                        {activeTab === 'register' && (
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Подтверждение пароля</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Повторите пароль"
                                />
                            </div>
                        )}

                        <button type="submit" className={styles.submitButton}>
                            {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </button>

                        {error && <div className={styles.errorMessage}>{error}</div>}

                        {activeTab === 'login' && (
                            <div className={styles.additionalOptions}>
                                <button
                                    type="button"
                                    className={styles.forgotPassword}
                                    onClick={handleForgotPassword}
                                >
                                    Забыли пароль?
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            <Popup
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
            >
                <div className={styles.forgotPasswordContent}>
                    <h3>Восстановление пароля</h3>
                    <p>Для восстановления пароля напишите нам в Discord:</p>
                    <CopyToClipboard text="steamwave_support">
                        <div className={styles.discordInfo}>
                            <span>@steamwave_support</span>
                        </div>
                    </CopyToClipboard>

                    <p>Или на почту:</p>

                    <CopyToClipboard text="support@steamwave.ru">
                        <div className={styles.tgInfo}>
                            <strong>support@steamwave.ru</strong>
                        </div>
                    </CopyToClipboard>
                </div>
            </Popup>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={3000}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    )
}