'use client'

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main>
          <div className="container">
              <section className="hero-section">
                  <div className="content">
                      <div className="hero-section-image">
                          <Image src={"/screenshot-6.png"} alt={"next"} width={100} height={100}/>
                      </div>
                      <div className="hero-section-text">
                          <h1>Create</h1>
                          <p>Сервер, где во главе угла стоит Create и его пешки. Никакого электричества, чистая механика.</p>
                          <div className="hero-buttons">
                              <Link href="/play" className="hero-button">Начать играть</Link>
                          </div>
                      </div>
                  </div>
              </section>
          </div>
      </main>
    // <div className="page font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //
    //   </main>
    // </div>
  );
}
