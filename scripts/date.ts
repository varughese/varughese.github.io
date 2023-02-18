export function formatDateShort(dateString) {
    const date = new Date(dateString);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dev",
    ];

    return months[date.getMonth()] + " " + date.getDate();
}
