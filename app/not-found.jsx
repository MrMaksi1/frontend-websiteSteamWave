import PagePlaceholder from "@/components/PagePlaceholder/PagePlaceholder";

export default function NotFound() {
    return <PagePlaceholder pageName="404" pageDescription="Кажется, эта страница не существует или была указана неправильно."/>
}

export const metadata = {
    title: 'Страница не найдена - STEAMWAVE',
    description: 'Страница не существует или была перемещена',
}