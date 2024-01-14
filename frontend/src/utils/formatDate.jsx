export const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("de-DE", options);
};
export const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
