import News from "@/components/News/News";

export const metadata = {
    title: 'Новости проекта — steamwave',
    description: 'Новости проекта и его серверов',
}


export default function Home() {
  return (
      <main>
          <News/>
      </main>
  );
}
