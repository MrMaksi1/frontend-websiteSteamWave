'use client'

import Image from "next/image";
import styles from "./ThemeToggle.module.css"

export default function ThemeToggle() {
    const toggleTheme = () => {
        document.body.classList.toggle("light");
    };

    return (
        <button className={styles.themeButton} onClick={toggleTheme}>
            {/*Toggle color theme*/}
            <Image className={styles.themeButtonIcon} src={"/vercel.svg"} alt={"Color theme toggle button."} width={320} height={38}/>
        </button>
    );
}