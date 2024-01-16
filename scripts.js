const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNameElement = document.getElementById('month-name');
const calendarBody = document.getElementById('calendar-body');

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
  if (month === 1) { // February
      return isLeapYear(year) ? 29 : 28;
  } else {
      return daysInMonth[month];
  }
}

function updateCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = getDaysInMonth(month, year);

  monthNameElement.textContent = `${monthNames[month]} ${year}`;
  calendarBody.innerHTML = '';

  let date = 1;
  for (let row = 0; row < 6; row++) {
      const tr = document.createElement('tr');
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          const td = document.createElement('td');
          if (row === 0 && dayOfWeek < firstDay) {
              td.classList.add('empty');
              td.textContent = '';
          } else if (date > daysInCurrentMonth) {
              td.classList.add('empty');
              td.textContent = '';
          } else {
              td.textContent = date;
              if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
                  td.classList.add('weekend');
              }
              date++;
          }
          tr.appendChild(td);
      }
      calendarBody.appendChild(tr);
  }
}

updateCalendar(currentMonth, currentYear);

document.getElementById('prev-month').addEventListener('click', function() {
  currentMonth = currentMonth - 1;
  if (currentMonth < 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
  }
  updateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', function() {
  currentMonth = currentMonth + 1;
  if (currentMonth > 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
  }
  updateCalendar(currentMonth, currentYear);
});
