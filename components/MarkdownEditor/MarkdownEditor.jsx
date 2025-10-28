'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './MarkdownEditor.module.css'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownEditor({ value, onChange, placeholder = "Напишите вашу новость..." }) {
    const [isPreview, setIsPreview] = useState(false)

    return (
        <div className={styles.markdownEditor}>
            <div className={styles.editorHeader}>
                <button
                    type="button"
                    className={`${styles.tabButton} ${!isPreview ? styles.active : ''}`}
                    onClick={() => setIsPreview(false)}
                >
                    Редактор
                </button>
                <button
                    type="button"
                    className={`${styles.tabButton} ${isPreview ? styles.active : ''}`}
                    onClick={() => setIsPreview(true)}
                >
                    Предпросмотр
                </button>
            </div>

            <div className={styles.editorContent}>
                {!isPreview ? (
                    <textarea
                        className={styles.textarea}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        rows={15}
                    />
                ) : (
                    <div className={`${styles.preview} markdown-content`}>
                        {value ? (
                            <ReactMarkdown
                                components={{
                                    table: ({node, ...props}) => (
                                        <div className="table-wrapper">
                                            <table {...props} />
                                        </div>
                                    )
                                }}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {value}
                            </ReactMarkdown>
                        ) : (
                            <div className={styles.emptyPreview}>Текст не введен</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}