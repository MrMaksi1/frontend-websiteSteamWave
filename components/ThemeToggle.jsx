'use client'

export default function ThemeToggle() {
    const toggleTheme = () => {
        document.body.classList.toggle("light");
    };

    return (
        <button className="button" onClick={toggleTheme}>
            Toggle color theme
        </button>
    );
}