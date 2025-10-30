'use client'

import { useState, useEffect } from 'react'
import styles from './AdminPage.module.css'
import Notification from '@/components/Notification/Notification'
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditor'

export default function AdminPage({ activeSection = 'users' }) { // Принимаем activeSection как пропс
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

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + '...'
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
        if (name === 'media' && files[0]) {
            setNewPost(prev => ({ ...prev, media: files[0], preview: URL.createObjectURL(files[0]) }))
        } else if (name === 'content') {
            setNewPost(prev => ({ ...prev, content: value }))
        } else {
            setNewPost(prev => ({ ...prev, [name]: value }))
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
                                                <button onClick={() =>
                                                    handleSave(user.id)} className={styles.saveButton}>Сохранить
                                                </button>

                                                <button onClick={handleCancelEdit} className={styles.cancelButton}>Отмена</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() =>
                                                    handleEditClick(user)} className={styles.editButton}>Редактировать
                                                </button>

                                                <button onClick={() =>
                                                    handleDelete(user.id)} className={styles.deleteButton}>Удалить
                                                </button>
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
                        <input className={styles.newsFormTitle} type="text" name="title" placeholder="Заголовок новости" value={newPost.title}
                               onChange={handleNewPostChange}/>

                        <MarkdownEditor
                            value={newPost.content}
                            onChange={(value) => setNewPost(prev => ({ ...prev, content: value }))}
                            placeholder="Содержание новости (поддерживается Markdown)."
                        />

                        <div className={styles.attachments}>
                            <input className={styles.newsFormMedia} type="file" name="media" onChange={handleNewPostChange}/>
                            {newPost.preview && (newPost.media.type.startsWith('image') ?
                                    <img src={newPost.preview} alt="preview" className={styles.previewMedia}/> :
                                    <video src={newPost.preview} controls className={styles.previewMedia}/>
                            )}
                        </div>

                        <button className={styles.newsFormCreateButton} onClick={handleCreatePost}>Создать новость</button>
                    </div>

                    <span className={styles.separator}></span>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>Заголовок</th>
                                <th>Содержание</th>
                                <th>Медиа</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {news.map(n => (
                                <tr key={n.id}>
                                    <td>{truncateText(n.title, 80)}</td>
                                    <td>{truncateText(n.content)}</td>
                                    <td>
                                        {n.mediaUrl && (n.mediaType === 'image' ?
                                                <img src={n.mediaUrl} alt="media" className={styles.newsMedia}/> :
                                                <video src={n.mediaUrl} controls className={styles.newsMedia}/>
                                        )}
                                    </td>
                                    <td><button onClick={() =>
                                        handleDeleteNews(n.id)} className={styles.deleteButton}>Удалить
                                    </button></td>
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