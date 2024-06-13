export function formatDate(date: string) {
    const deathDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-GB').format(deathDate);
    const [day, month, year] = formattedDate.split('/');
    return `${day}.${month}.${year}`;
}
