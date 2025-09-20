'use client'

import { useEffect, useState } from 'react'
import styles from './Notification.module.css'

export default function Notification({
                                         message,
                                         type = 'info',
                                         duration = 3000,
                                         onClose
                                     }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => onClose?.(), 300)
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className={`${styles.notification} ${styles[type]} ${isVisible ? styles.visible : ''}`}>
            <span className={styles.message}>{message}</span>
            <button
                className={styles.closeButton}
                onClick={() => {
                    setIsVisible(false)
                    setTimeout(() => onClose?.(), 300)
                }}
                aria-label="Закрыть уведомление"
            >
                ×
            </button>
        </div>
    )
}