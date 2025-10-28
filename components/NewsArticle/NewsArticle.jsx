'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from './NewsArticle.module.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function NewsArticle() {
    const [newsItem, setNewsItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const router = useRouter()
    const params = useParams()
    const newsId = params.id

    const API_URL = `http://localhost:8080/api/news`
    const BACKEND_URL = 'http://localhost:8080'

    useEffect(() => {
        const findNewsItem = async () => {
            try {
                const res = await fetch(API_URL)

                if (!res.ok) throw new Error('Ошибка при загрузке новостей')

                const allNews = await res.json()

                const foundItem = allNews.find(item => item.id == newsId)

                if (!foundItem) {
                    throw new Error('Новость не найдена')
                }

                const newsWithFullUrl = {
                    ...foundItem,
                    mediaUrl: foundItem.mediaUrl ? `${BACKEND_URL}${foundItem.mediaUrl}` : null
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
            findNewsItem()
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
                        {newsItem.createdAt && (
                            <span>Опубликовано: {new Date(newsItem.createdAt).toLocaleDateString('ru-RU')}</span>
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