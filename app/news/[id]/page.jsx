import NewsArticle from "@/components/NewsArticle/NewsArticle";

export async function generateMetadata({ params }) {
    try {
        const response = await fetch('http://localhost:8080/api/news')
        const data = await response.json()
        const newsItem = data.find(item => item.id == params.id)

        return {
            title: newsItem ? `${newsItem.title} — Новости — steamwave` : 'Новости проекта — steamwave',
            description: newsItem?.content ? `${newsItem.content.substring(0, 80)}...` : 'Скачайте лаунчер для игры на сервере STEAMWAVE'
        }
    } catch (error) {
        return {
            title: 'Новости проекта - steamwave',
            description: 'Скачайте лаунчер для игры на сервере STEAMWAVE'
        }
    }
}

export default function Home() {
    return (
        <main>
            <NewsArticle/>
        </main>
    );
}
