'use client'

import { useEffect, useState } from 'react'
import styles from './News.module.css'

export default function NewsPage() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const API_URL = 'http://localhost:8080/api/news'
    const BACKEND_URL = 'http://localhost:8080'

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(API_URL)
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || 'Ошибка при загрузке новостей')

                // Преобразуем mediaUrl в полный URL
                const newsWithFullUrl = data.map(post => ({
                    ...post,
                    mediaUrl: post.mediaUrl ? `${BACKEND_URL}${post.mediaUrl}` : null
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
                    <div key={post.id} className={styles.newsCard}>
                        <h2 className={styles.newsPostTitle}>{post.title}</h2>
                        <p className={styles.newsContent}>{post.content}</p>
                        
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
                ))}
            </div>
        </div>
    )
}
