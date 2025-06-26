export const getDateTime = () => {
    const now = new Date();

    const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
    const currentTime = now.toLocaleTimeString('en-US', {
        hour12: true, // 24-hour format. Set to true for 12-hour.
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return {formattedDate,currentTime}
};