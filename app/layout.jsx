import {Geist, Geist_Mono, Montserrat, Outfit, Inter} from "next/font/google";
import "./globals.css";
import './style/markdown.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./Layout.module.css"
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
    subsets: ["latin", "cyrillic"]
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"]
})

export const metadata = {
    title: {
        default: 'Игровые сервера Minecreaft — steamwave',
        template: '%s'
    },
    description: 'Скачайте лаунчер для игры на сервере steamwave',
}

export default function RootLayout({ children }) {

    return (
    <html lang="ru" className="dark:scheme-dark">
        <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${outfit.variable} ${inter.variable} antialiased`}>
            <div className={styles.appContainer}>
                <Header className={styles.headerWrapper}/>

                <div className={styles.mainContent}>
                    {children}
                </div>

                <Footer/>
            </div>
        </body>
    </html>
  );
}

