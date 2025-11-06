'use client'

import { useEffect, useState } from 'react'
import styles from './News.module.css'
import {useRouter} from "next/navigation";
import {API_URL, BACKEND_URL} from "@/config/config.jsx";

export default function NewsPage() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const NEWS_URL = `${API_URL}/news`

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    const handleNewsClick = (newsId) => {
        router.push(`/news/${newsId}`)
    }

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(NEWS_URL)
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Ошибка при загрузке новостей')

                const newsWithFullUrl = data.map(post => ({
                    ...post,
                    mediaUrl: post.mediaUrl ? `${BACKEND_URL}${post.mediaUrl}` : null,
                    fullContentUrl: `/news/${post.id}`
                }))

                setNews(newsWithFullUrl)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchNews()
    }, [])

    if (loading) return <div className={styles.newsContainer}>Загрузка новостей...</div>
    if (error) return <div className={styles.newsContainer}>{error}</div>

    return (
        <div className={styles.newsContainer}>
            <h1 className={styles.newsTitle}>Новости</h1>
            <div className={styles.newsGrid}>
                {news.map(post => (
                    <div
                        key={post.id}
                        className={styles.newsCard}
                        onClick={() => handleNewsClick(post.id)}
                    >
                        <div className={styles.newsMediaContainer}>
                            {post.mediaUrl && post.mediaType === 'image' && (
                                <img
                                    src={post.mediaUrl}
                                    alt={post.title}
                                    className={styles.newsMedia}
                                />
                            )}

                            {post.mediaUrl && post.mediaType === 'video' && (
                                <video
                                    src={post.mediaUrl}
                                    controls
                                    className={styles.newsMedia}
                                />
                            )}
                        </div>

                        <div className={styles.textOverlay}>
                            <h2 className={styles.newsPostTitle}>{truncateText(post.title, 50)}</h2>
                            <p className={styles.newsContent}>{truncateText(post.content)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
