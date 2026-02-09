export const updatedTime = (date: Date) => {
    const publishedAt = new Date(date)
    const now = new Date()
    const diff = now.getTime() - publishedAt.getTime()
    const diffMinutes = diff / 1000 / 60

    const HOUR = 60;
    const DAY = 60 * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30; // aproximação
    const YEAR = DAY * 365

    if (diffMinutes < 1) {
        return "há menos de 1 minuto";
    }

    if (diffMinutes < HOUR) {
        if (diffMinutes < 2) return `há ${Math.floor(diffMinutes)} minuto`;
        return `há ${Math.floor(diffMinutes)} minutos`;
    }

    if (diffMinutes < DAY) {
        const hours = Math.floor(diffMinutes / HOUR);
        if (hours < 2) return `há ${hours} hora`;
        return `há ${hours} horas`;
    }

    if (diffMinutes < WEEK) {
        const days = Math.floor(diffMinutes / DAY);
        if (days == 1) return `há ${days} dia`;
        return `há ${days} dias`;
    }

    if (diffMinutes < MONTH * 3) {
        const weeks = Math.floor(diffMinutes / WEEK);
        return `há ${weeks} semanas`;
    }

    if (diffMinutes < YEAR && diffMinutes < MONTH * 8) {
        const months = Math.floor(diffMinutes / MONTH);
        return `há ${months} meses`
    }

    return "em " + publishedAt.toLocaleDateString("pt-BR");
}