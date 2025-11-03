'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./MainPage.module.css"

export default function Home() {
  return (
      <main>
          <div className={styles.container}>
              <div className={styles.heroSection}>
                  <div className={styles.heroTop}>
                      <div className={styles.heroImage}>
                          <Image src={"/screenshot-6.png"} alt={"next"} width={1920} height={1080}/>
                      </div>

                      <div className={styles.heroTopText}>
                          <h1 className={styles.heroTitle}>steamwave</h1>
                          <p>steamwave — это мир, где технологии встречаются с искусством. Наш проект построен вокруг мода Create, открывающего безграничные возможности для творчества и раскрытия своего инженерного потенциала.</p>
                      </div>
                  </div>

                  <div className={styles.heroContent}>
                      <div className={styles.heroSubtitle}>
                          <p>Мы создали пространство для тех, кто любит имаджинировать, проектировать и медитировать, создавая невообразимые проекты, наполненные красотой и механикой.</p>
                      </div>
                      <Link className={styles.heroButton} href="/play">
                          Начать играть
                      </Link>
                  </div>
              </div>
          </div>
      </main>
  );
}
