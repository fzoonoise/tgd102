'use strict';

let nav = 0;
let clickedDate = null;
let clickedNum = null;
let weekSchedule = null;
let weekByDefault = [];
let monthByDefault = [];
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const weeks = document.querySelectorAll('.week');
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function calendarLoad() {
  const dt = new Date();
  // console.log(dt);

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  // console.log(day, month + 1, year);

  const firstDayOfMonth = new Date(year, month, 1);
  // To get the last day in the this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric', //2-digit
    day: 'numeric', //2-digit
  });
  // console.log(dateString);
  // console.log(firstDayOfMonth, daysInMonth,dateString);
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  for (let i = 0; i < weeks.length; i++) {
    weeks[i].innerHTML = '';
  }

  document.querySelector('.monthDisplay').innerHTML = `${dt.toLocaleDateString(
    'en-us',
    { month: 'long' }
  )} ${year}`;

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dateString = `${month + 1}/${i - paddingDays}/${year}`;
    const result = i - paddingDays <= 0 ? null : dateString;

    monthByDefault.splice(i - 1, i, result);
    // console.log(monthByDefault);

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
        weekSchedule = Math.ceil(i / 7);
      }

      daySquare.addEventListener('click', () => openSchedule(dateString, i));
    } else {
      daySquare.classList.add('padding');
    }

    weeks[Math.ceil(i / 7) - 1].appendChild(daySquare);
  }
}

function openSchedule(date, locate) {
  let theWeek = Math.ceil(locate / 7);

  if (theWeek !== weekSchedule) {
    weekSchedule = theWeek;
    scheduleLoad();
  }
  // console.log(clicked, locate, theWeek, weekSchedule);
}

// === 課程表 ===
function scheduleLoad() {
  // weekSchedule
  weekByDefault.splice(0);
  for (let i = 0; i <= monthByDefault.length; i++) {
    if (Math.ceil(i / 7) === weekSchedule)
      weekByDefault.splice(i - 1, 0, monthByDefault[i - 1]);
  }
  // console.log(weekByDefault);

  const week6 = document.querySelector('.week6');

  if (week6.innerHTML === '') {
    week6.classList.add('-none');
  } else {
    week6.classList.remove('-none');
  }

  const container = document.querySelector('.container');
  let templateRoms =
    week6.innerHTML === ''
      ? ['1fr', '1fr', '1fr', '1fr', '1fr']
      : ['1fr', '1fr', '1fr', '1fr', '1fr', '1fr'];
  let templateAreas =
    week6.innerHTML === ''
      ? [
          '". weeka ."',
          '". weekb ."',
          '". weekc ."',
          '". weekd ."',
          '". weeke ."',
        ]
      : [
          '". weeka ."',
          '". weekb ."',
          '". weekc ."',
          '". weekd ."',
          '". weeke ."',
          '". weekf ."',
        ];

  templateRoms.splice(weekSchedule, 0, 'auto');
  templateAreas.splice(weekSchedule, 0, '"time time time"');

  // console.log(templateRoms.join(' '));
  // console.log(templateAreas.join(''));
  container.style.cssText = `
  grid-template-rows: ${templateRoms.join(' ')};
  grid-template-areas: ${templateAreas.join('')};
  `;

  const timeLine = document.querySelector('.timeline');
  timeLine.innerHTML = '';

  for (let i = 1; i <= 7 * 13; i++) {
    const timeSquire = document.createElement('div');
    // timeSquire.id = 'fdlkjg'
    timeSquire.classList.add('timeZone');
    timeLine.appendChild(timeSquire);
    // timeSquire.innerText = `${i % 7} ${Math.ceil(i / 7)}`;

    const dateString = weekByDefault[(i % 7 === 0 ? 7 : i % 7) - 1];
    // console.log(dateString, typeof(dateString));
    const classNum = Math.ceil(i / 7);

    const eventForClass = events.find(
      e => e.date === dateString && e.classNum === classNum
    );

    if (eventForClass) {
      const classDiv = document.createElement('div');
      classDiv.classList.add('event');
      classDiv.innerHTML = `
      <h4>${eventForClass.name}</h4>
      <p>${eventForClass.teacher}</p>
      `;
      timeSquire.appendChild(classDiv);
    }

    timeSquire.addEventListener('click', () => openModal(dateString, classNum));
  }
}

function initButtons() {
  document.querySelector('.btn-right').addEventListener('click', () => {
    nav++;
    calendarLoad();
    scheduleLoad();
  });

  document.querySelector('.btn-left').addEventListener('click', () => {
    nav--;
    calendarLoad();
    scheduleLoad();
  });
}

initButtons();
calendarLoad();
scheduleLoad();
