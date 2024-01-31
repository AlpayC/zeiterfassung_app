export const formatDate = (date) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("de-DE", options);
};
export const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
export const convertUtcToGermanTime = (date) => {
  const utcDateTime = new Date(date);
  const germanDateTime = new Date(utcDateTime);
  germanDateTime.setHours(germanDateTime.getHours() + 1);

  return germanDateTime.toISOString();
};
export const calculateTimeDifferenceInSeconds = (time1, time2) => {
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
  const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

  return Math.abs(totalSeconds1 - totalSeconds2);
};
