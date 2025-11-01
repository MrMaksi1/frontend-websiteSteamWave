'use client'

import { useState, useEffect } from 'react'
import styles from './AdminPage.module.css'
import Notification from '@/components/Notification/Notification'
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor'

export default function AdminPage({ activeSection = 'users' }) {
    const [users, setUsers] = useState([])
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [notification, setNotification] = useState(null)
    const [editingUserId, setEditingUserId] = useState(null)
    const [editedData, setEditedData] = useState({ username: '', email: '', role: '' })
    const [newPost, setNewPost] = useState({ title: '', content: '', media: null, preview: null })

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const USERS_API = 'http://localhost:8080/api/admin/users'
    const NEWS_API = 'http://localhost:8080/api/admin/news'

    /** ----- NEWS EDITING ----- */
    const [editingNewsId, setEditingNewsId] = useState(null)
    const [editNewsData, setEditNewsData] = useState({ title: '', content: '', media: null, preview: null })

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
    }

    const parseDateArray = (dateArray) => {
        if (!dateArray || !Array.isArray(dateArray)) return null

        try {
            const [year, month, day, hours, minutes, seconds] = dateArray

            return new Date(year, month - 1, day, hours, minutes, seconds)
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
                month: 'numeric',
                day: 'numeric'
            })
            const timeStr = date.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
            return `${dateStr} \n ${timeStr}`
        } catch (error) {
            console.error('Ошибка форматирования даты:', error)
            return 'Неверный формат даты'
        }
    }


    /** ------------------ USERS ------------------ */

    useEffect(() => {
        if (!token) return
        const fetchUsers = async () => {
            try {
                const res = await fetch(USERS_API, { headers: { 'Authorization': `Bearer ${token}` } })

                if (res.status === 403) throw new Error('ONLY ADMIN — доступ запрещён')
                if (res.status === 401) throw new Error('Не авторизован. Войдите снова.')

                if (!res.ok) throw new Error('Ошибка при загрузке пользователей')
                const data = await res.json()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            } finally { setLoading(false) }
        }
        fetchUsers()
    }, [token])


    /** ------------------ NEWS ------------------ */

    useEffect(() => {
        if (!token) return
        const fetchNews = async () => {
            try {
                const res = await fetch(NEWS_API, { headers: { 'Authorization': `Bearer ${token}` } })

                if (res.status === 403) throw new Error('ONLY ADMIN — доступ запрещён')
                if (res.status === 401) throw new Error('Не авторизован. Войдите снова.')

                if (!res.ok) throw new Error('Ошибка при загрузке новостей')
                const data = await res.json()

                console.log(data)

                setNews(data)
            } catch (err) { setError(err.message) }
        }
        fetchNews()
    }, [token])


    /** ------------------ USER ACTIONS ------------------ */

    const handleEditClick = (user) => {
        setEditingUserId(user.id)
        setEditedData({ username: user.username, email: user.email, role: user.role })
    }
    const handleCancelEdit = () => setEditingUserId(null)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedData(prev => ({ ...prev, [name]: value }))
    }
    const handleSave = async (userId) => {
        try {
            const res = await fetch(`${USERS_API}/${userId}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(editedData)
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Ошибка при сохранении')
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...editedData } : u))
            setEditingUserId(null)
            setNotification({ message: 'Данные успешно обновлены', type: 'success' })
        } catch (err) { setNotification({ message: err.message, type: 'error' }) }
    }
    const handleDelete = async (userId) => {
        if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return
        try {
            const res = await fetch(`${USERS_API}/${userId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }})
            if (!res.ok) throw new Error('Ошибка при удалении пользователя')
            setUsers(prev => prev.filter(u => u.id !== userId))
            setNotification({ message: 'Пользователь удалён', type: 'success' })
        } catch (err) { setNotification({ message: err.message, type: 'error' }) }
    }

    /** ------------------ NEWS ACTIONS ------------------ */
    const handleNewPostChange = (e) => {
        const { name, value, files } = e.target
        const targetData = editingNewsId ? editNewsData : newPost
        const setter = editingNewsId ? setEditNewsData : setNewPost

        if (name === 'media' && files[0]) {
            setter(prev => ({ ...prev, media: files[0], preview: URL.createObjectURL(files[0]) }))
        } else if (name === 'content') {
            setter(prev => ({ ...prev, content: value }))
        } else {
            setter(prev => ({ ...prev, [name]: value }))
        }
    }
    const handleCreatePost = async () => {
        try {
            const formData = new FormData()
            formData.append('title', newPost.title)
            formData.append('content', newPost.content)

            if (newPost.media) formData.append('media', newPost.media)

            const res = await fetch(NEWS_API, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData })
            const data = await res.json()

            console.log('Ответ от сервера:', data)

            if (!res.ok) throw new Error(data.message || 'Ошибка при создании новости')

            setNews(prev => [data, ...prev])
            setNewPost({ title: '', content: '', media: null, preview: null })
            setNotification({ message: 'Новость создана', type: 'success' })
        } catch (err) { setNotification({ message: err.message, type: 'error' }) }
    }
    const handleDeleteNews = async (id) => {
        if (!confirm('Удалить эту новость?')) return
        try {
            const res = await fetch(`${NEWS_API}/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }})
            if (!res.ok) throw new Error('Ошибка при удалении новости')
            setNews(prev => prev.filter(n => n.id !== id))
            setNotification({ message: 'Новость удалена', type: 'success' })
        } catch (err) { setNotification({ message: err.message, type: 'error' }) }
    }


    /** ------------------ NEWS EDITING ------------------ */
    const handleEditNews = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/news`, {
                method: 'GET'
            })

            if (!res.ok) throw new Error('Ошибка при загрузке новостей')

            const data = await res.json()
            const foundItem = data.find(item => item.id == id)

            if (!foundItem) throw new Error('Новость не найдена')

            setEditingNewsId(id)
            setEditNewsData({
                title: foundItem.title,
                content: foundItem.content,
                media: null,
                preview: foundItem.mediaUrl ? `http://localhost:8080${foundItem.mediaUrl}` : null
            })
            setNewPost({ title: '', content: '', media: null, preview: null })
        } catch (err) {
            console.error('Edit news error:', err)
            setNotification({ message: `Ошибка загрузки: ${err.message}`, type: 'error' })
        }
    }

    const handleUpdateNews = async () => {
        if (!editingNewsId) return

        try {
            const formData = new FormData()
            formData.append('title', editNewsData.title)
            formData.append('content', editNewsData.content)

            if (editNewsData.media) {
                formData.append('media', editNewsData.media)
            }

            const res = await fetch(`${NEWS_API}/${editingNewsId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`)
            }

            const data = await res.json()

            setNews(prev => prev.map(n => n.id === editingNewsId ? data : n))
            setEditingNewsId(null)
            setEditNewsData({ title: '', content: '', media: null, preview: null })
            setNotification({ message: 'Новость обновлена', type: 'success' })
        } catch (err) {
            console.error('Update news error:', err)
            setNotification({ message: `Ошибка обновления: ${err.message}`, type: 'error' })
        }
    }

    const handleCancelEditNews = () => {
        setEditingNewsId(null)
        setEditNewsData({ title: '', content: '', media: null, preview: null })
    }


    /** ------------------ RENDER ------------------ */
    if (loading) return <div className={styles.adminContainer}>Загрузка...</div>
    if (error) return <div className={styles.adminContainer}><h1>⛔ {error}</h1></div>

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminHeader}>
                <h1 className={styles.adminTitle}>Админ-панель</h1>
            </div>

            {/* ===== USERS ===== */}
            {activeSection === 'users' && (
                <section className={styles.contentSection}>
                    <div className={styles.tableHeader}>
                        <h2>Пользователи</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя</th>
                                <th>Email</th>
                                <th>Роль</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{editingUserId === user.id ? <input type="text" name="username" value={editedData.username}
                                                                            onChange={handleInputChange} className={styles.editInput}/> : user.username}</td>
                                    <td>{editingUserId === user.id ? <input type="email" name="email" value={editedData.email}
                                                                            onChange={handleInputChange} className={styles.editInput}/> : user.email}</td>

                                    <td>{editingUserId === user.id ? (
                                        <select name="role" value={editedData.role} onChange={handleInputChange} className={styles.editSelect}>
                                            <option value="ROLE_USER">Пользователь</option>
                                            <option value="ROLE_ADMIN">Админ</option>
                                        </select>
                                    ) : user.role}</td>
                                    <td>
                                        {editingUserId === user.id ? (
                                            <>
                                                <div className={styles.buttonContainer}>
                                                    <button onClick={handleCancelEdit} className={styles.cancelButton}>
                                                        Отмена
                                                    </button>

                                                    <button onClick={() =>
                                                        handleSave(user.id)} className={styles.saveButton}>Сохранить
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.buttonContainer}>
                                                    <button onClick={() =>
                                                        handleEditClick(user)} className={styles.editButton}>Редактировать
                                                    </button>

                                                    <button onClick={() =>
                                                        handleDelete(user.id)} className={styles.deleteButton}>Удалить
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* ===== NEWS ===== */}
            {activeSection === 'news' && (
                <section className={styles.contentSection}>
                    <div className={styles.tableHeader}>
                        <h2>Новости</h2>
                    </div>
                    <div className={styles.newsForm}>
                        <input
                            className={styles.newsFormTitle}
                            type="text"
                            name="title"
                            placeholder="Заголовок новости"
                            value={editingNewsId ? editNewsData.title : newPost.title}
                            onChange={handleNewPostChange}
                        />

                        <MarkdownEditor
                            value={editingNewsId ? editNewsData.content : newPost.content}
                            onChange={(value) => {
                                const setter = editingNewsId ? setEditNewsData : setNewPost
                                setter(prev => ({ ...prev, content: value }))
                            }}
                            placeholder="Содержание новости (поддерживается Markdown)."
                        />

                        <div className={styles.attachments}>
                            <input
                                className={styles.newsFormMedia}
                                type="file"
                                name="media"
                                onChange={handleNewPostChange}
                            />
                            {(editingNewsId ? editNewsData.preview : newPost.preview) &&
                                ((editingNewsId ? editNewsData.media?.type : newPost.media?.type)?.startsWith('image') ?
                                        <img src={editingNewsId ? editNewsData.preview : newPost.preview} alt="preview" className={styles.previewMedia}/> :
                                        <video src={editingNewsId ? editNewsData.preview : newPost.preview} controls className={styles.previewMedia}/>
                                )
                            }
                        </div>

                        <div className={styles.newsFormActions}>
                            {editingNewsId ? (
                                <>
                                    <button className={styles.newsFormUpdateButton} onClick={handleUpdateNews}>
                                        Обновить новость
                                    </button>
                                    <button className={styles.newsFormCancelButton} onClick={handleCancelEditNews}>
                                        Отмена
                                    </button>
                                </>
                            ) : (
                                <button className={styles.newsFormCreateButton} onClick={handleCreatePost}>
                                    Создать новость
                                </button>
                            )}
                        </div>
                    </div>

                    <span className={styles.separator}></span>

                    <div className={styles.tableWrapper}>
                        <table className={`${styles.table} ${styles.newsTable}`}>
                            <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Заголовок</th>
                                <th>Медиа</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {news.map(n => (
                                <tr key={n.id}>
                                    <td>{formatDateTime(parseDateArray(n.createdAt))}</td>
                                    <td><a href={`/news/${n.id}`}>{truncateText(n.title, 80)}</a></td>
                                    <td>
                                        {n.mediaUrl && (n.mediaType === 'image' ?
                                                <img src={n.mediaUrl} alt="media" className={styles.newsMedia}/> :
                                                <video src={n.mediaUrl} controls className={styles.newsMedia}/>
                                        )}
                                    </td>
                                    <td>
                                        <div className={styles.buttonContainer}>
                                            <button onClick={() => handleEditNews(n.id)} className={styles.editButton}>
                                                Редактировать
                                            </button>
                                            <button onClick={() => handleDeleteNews(n.id)} className={styles.deleteButton}>
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {notification && <Notification message={notification.message} type={notification.type} duration={3000} onClose={() =>
                setNotification(null)}/>}
        </div>
    )
}