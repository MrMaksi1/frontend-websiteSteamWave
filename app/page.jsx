'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./MainPage.module.css"

export default function Home() {
  return (
      <main>
          <div className={styles.pageContent}>
              <div className={styles.hero}>
                  <div className={styles.heroSection}>
                      <h1>steamwave</h1>
                      <p>Погрузись в удивительный мир игровых серверов Minecraft по самым разным тематикам.</p>

                      <div className={styles.heroBtnGroup}>
                          <Link className={`${styles.heroBtn} ${styles.btnPrimary}`} href="/play">
                              Начать играть
                          </Link>
                          <Link className={`${styles.heroBtn} ${styles.btnSecondary}`} href="/play">
                              Подробнее
                          </Link>
                      </div>
                  </div>

                  <div className={`${styles.heroSection} ${styles.heroImage}`}>
                      <Image src={"/screenshot-6.png"} alt={"next"} width={1920} height={1080}/>
                  </div>
              </div>
          </div>
      </main>
  );
}
