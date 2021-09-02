const CalendarDates = require("calendar-dates");
const calendarDates = new CalendarDates();
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date(2018, 4);
const date2 = new Date(year, month)
console.log(date);
console.log(date2);



module.exports = async () => {
  const mayMatrix = await calendarDates.getMatrix(date);

  console.log(mayMatrix);
};
