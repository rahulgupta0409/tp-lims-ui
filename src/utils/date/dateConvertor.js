export function convertTimestampToDate(timestamp) {
  const dateObject = new Date(timestamp);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const date = dateObject.getDate();
  const monthName = monthNames[monthIndex];
  return `${date} ${monthName} ${year}`;
}
