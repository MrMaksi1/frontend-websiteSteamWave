'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './NewsArticle.module.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {API_URL} from "@/config/config";

export default function NewsArticle() {
    const [newsItem, setNewsItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const router = useRouter()
    const params = useParams()
    const newsId = params.id

    const NEWS_URL = `${API_URL}/news`
    const BACKEND_URL = `${API_URL}`

    const parseDateArray = (dateArray) => {
        if (!dateArray || !Array.isArray(dateArray)) return null

        try {
            const [year, month, day, hours, minutes] = dateArray

            return new Date(year, month - 1, day, hours, minutes)
        } catch (error) {
            console.error('Ошибка получения даты публикации:', error)
            return null
        }
    }

    const formatDateTime = (date) => {
        if (!date) return 'Дата не указана'

        try {
            const dateStr = date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            const timeStr = date.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            })
            return `${dateStr}`
        } catch (error) {
            console.error('Ошибка форматирования даты:', error)
            return 'Неверный формат даты'
        }
    }

    useEffect(() => {

        const fetchNews = async () => {
            try {
                const response = await fetch(NEWS_URL, {
                    method: 'GET'
                })

                const data = await response.json()

                if (!response.ok) throw new Error('Ошибка при загрузке новостей')

                const foundItem = data.find(item => item.id == newsId)

                if (!foundItem) {
                    throw new Error('Новость не найдена')
                }

                const creationDate = parseDateArray(foundItem.createdAt);

                const newsWithFullUrl = {
                    ...foundItem,
                    mediaUrl: foundItem.mediaUrl ? `${BACKEND_URL}${foundItem.mediaUrl}` : null,
                    createdAt: creationDate
                }

                setNewsItem(newsWithFullUrl)
            } catch (err) {
                console.error('Error fetching news:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (newsId) {
            fetchNews()
        }
    }, [newsId])

    if (loading) return <div className={styles.newsArticleContainer}>Загрузка новости...</div>
    if (error) return <div className={styles.newsArticleContainer}>Ошибка: {error}</div>
    if (!newsItem) return <div className={styles.newsArticleContainer}>Новость не найдена</div>

    return (
        <div className={styles.newsArticleContainer}>
            <button
                className={styles.backButton}
                onClick={() => router.back()}
            >
                ← Назад
            </button>

            <article className={styles.newsArticleCard}>
                <header className={styles.newsArticleHeader}>
                    <h1 className={styles.newsArticleTitle}>{newsItem.title}</h1>
                    <div className={styles.newsMeta}>
                        {newsItem.createdAt ? (
                            <span>{formatDateTime(newsItem.createdAt)}</span>
                        ) : (
                            <span>Дата публикации не указана</span>
                        )}
                    </div>
                </header>

                {newsItem.mediaUrl && (
                    <div className={styles.newsMediaContainer}>
                        {newsItem.mediaType === 'image' ? (
                            <img
                                src={newsItem.mediaUrl}
                                alt={newsItem.title}
                                className={styles.newsArticleMedia}
                            />
                        ) : (
                            <video
                                src={newsItem.mediaUrl}
                                controls
                                className={styles.newsArticleMedia}
                            />
                        )}
                    </div>
                )}

                <div className={`${styles.newsContent} markdown-content`} >
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
                        {newsItem.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    )
}