export const getTimeInHoursMinutes = (time) =>
  new Date(time).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getDate = (date) => new Date(date).toLocaleDateString();

export const getMonthAndDate = (date) =>
  new Date(date).toLocaleDateString(navigator.language, {
    month: 'long',
    day: 'numeric',
  });

export const getTodayDate = () => getDate(new Date());

export const getTomorrowDate = () => {
  let today = new Date();
  let tomorrow = today.setDate(today.getDate() + 1);
  return getDate(tomorrow);
};
