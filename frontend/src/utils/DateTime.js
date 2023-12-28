export const DateTimeComponent = () => {
  // Get the current date and time
  const currentDate = new Date();
  // Format the date to display month, day, and time
  const formattedDate = currentDate.toLocaleString(undefined, {
    month: "long", // or 'long' for full month name
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
    year: "numeric",
  });

  return formattedDate;
};
