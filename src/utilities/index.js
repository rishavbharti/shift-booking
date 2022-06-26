export const getTimeInHoursMinutes = (time) =>
  new Date(time).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
