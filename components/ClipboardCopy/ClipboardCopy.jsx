'use client'

import { useState } from 'react'
import copy from 'copy-to-clipboard'
import styles from './ClipboardCopy.module.css'

export default function CopyToClipboardBetter({ text, children }) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const success = copy(text, {
            debug: false,
            message: 'Нажмите #{key} чтобы скопировать'
        })

        if (success) {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        }
    }

    return (
        <div
            className={styles.copyContainer}
            onClick={handleCopy}
            onTouchStart={(e) => e.preventDefault()}
        >
            {children || (
                <span className={styles.text}>{text}</span>
            )}
            <div className={`${styles.tooltip} ${isCopied ? styles.visible : ''}`}>
                {isCopied ? 'Скопировано!' : 'Нажмите чтобы скопировать'}
            </div>
        </div>
    )
}