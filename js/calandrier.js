const calendarContainer = document.getElementById("calendar");
const today = new Date();
let selectedDate = null;

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    const endDay = lastDay.getDay();

    const prevMonthDays = startDay === 0 ? 6 : startDay - 1;
    const nextMonthDays = endDay === 0 ? 0 : 7 - endDay;

    let calendarHTML = "";

    // Previous month days
    for (let i = prevMonthDays; i > 0; i--) {
        const prevDate = new Date(year, month, -i);
        calendarHTML += `<div class="day other-month">${prevDate.getDate()}</div>`;
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i);
        const isToday = currentDate.toDateString() === today.toDateString();
        const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
        const classNames = `day ${isToday ? "current-month today" : "current-month"} ${isSelected ? "selected-day" : ""}`;
        calendarHTML += `<div class="${classNames}" onclick="selectDate(${currentDate.getTime()})">${i}</div>`;
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        calendarHTML += `<div class="day other-month">${i}</div>`;
    }

    calendarContainer.innerHTML = calendarHTML;
}

function selectDate(timestamp) {
    selectedDate = new Date(timestamp).toDateString();
    renderCalendar(today.getFullYear(), today.getMonth());
}

renderCalendar(today.getFullYear(), today.getMonth());
