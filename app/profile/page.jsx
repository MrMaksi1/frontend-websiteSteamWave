import Profile from "@/components/Profile/Profile";

export const metadata = {
    title: 'Профиль — steamwave',
    description: 'Личный кабинет',
}

export default function Home() {
  return (
      <main>
        <div className="container">
          <section className="logRegSection">
            <Profile />
          </section>
        </div>
      </main>
  );
}
