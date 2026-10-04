export function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}


export function getSavedTheme() {
    return localStorage.getItem("theme");
}