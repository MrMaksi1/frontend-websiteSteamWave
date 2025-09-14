'use client'

import Image from "next/image";

export default function ThemeToggle() {
    const toggleTheme = () => {
        document.body.classList.toggle("light");
    };

    return (
        <button className="theme-button" onClick={toggleTheme}>
            {/*Toggle color theme*/}
            <Image className={"theme-button-icon"} src={"/vercel.svg"} alt={"Color theme toggle button."} width={320} height={38}/>
        </button>
    );
}