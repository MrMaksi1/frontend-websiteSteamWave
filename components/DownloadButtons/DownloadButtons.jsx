'use client'

import { useState } from 'react'
import styles from './DownloadButtons.module.css'

export default function DownloadButtons() {
    const [copied, setCopied] = useState(false)

    const copyIP = async () => {
        try {
            await navigator.clipboard.writeText('play.steamwave.ru')
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className={styles.container}>
            {/*<div className={styles.ipSection}>*/}
            {/*    <h3 className={styles.ipTitle}>IP адрес сервера</h3>*/}
            {/*    <div className={styles.ipContainer}>*/}
            {/*        <code className={styles.ip}>play.steamwave.ru</code>*/}
            {/*        <button*/}
            {/*            className={`${styles.copyButton} ${copied ? styles.copied : ''}`}*/}
            {/*            onClick={copyIP}*/}
            {/*        >*/}
            {/*            {copied ? '✓ Скопировано' : 'Копировать'}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className={styles.downloadSection}>
                <h3 className={styles.downloadTitle}>Скачать лаунчер</h3>
                <div className={styles.buttons}>
                    <a
                        href="http://launcher.steamwave.ru/SteamWave.exe"
                        className={styles.downloadButton}
                        download
                    >
                        <span className={styles.icon}>⚡</span>
                        <span className={styles.text}>
                            <span className={styles.os}>Windows</span>
                            <span className={styles.format}>.exe</span>
                        </span>
                    </a>

                    <a
                        href="http://launcher.steamwave.ru/SteamWave.jar"
                        className={styles.downloadButton}
                        download
                    >
                        <span className={styles.icon}>☕</span>
                        <span className={styles.text}>
                            <span className={styles.os}>Java</span>
                            <span className={styles.format}>.jar</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}