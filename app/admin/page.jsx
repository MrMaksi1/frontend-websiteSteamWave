import Image from "next/image";
import Link from "next/link";
import AdminPage from '@/components/Admin/AdminPage'

export default function Home() {
    return (
        <main>
            <section className="AdminPage">
                <AdminPage />
            </section>
        </main>
    );
}
