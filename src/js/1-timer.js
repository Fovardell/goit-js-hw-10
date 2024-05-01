//? Якщо користувач вибрав дату в минулому, покажи window.alert() з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
//? Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
//? Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.
// Натисканням на кнопку «Start» починається зворотний відлік часу до обраної дати з моменту натискання.
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю 00:00:00:00.
//! Після запуску таймера натисканням кнопки Старт кнопка Старт і інпут стають неактивним, щоб користувач не міг обрати нову дату, поки йде відлік часу. Після зупинки таймера інпут стає активним, щоб користувач міг обрати наступну дату. Кнопка залишається не активною.
// Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart() і перед відмальовуванням інтерфейсу форматує значення.
// Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку iziToast.
//Накинути стилі



import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const input = document.querySelector('input#datetime-picker');
const button = document.querySelector('button[data-start]');
let userSelectedDate;
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const currentDate = new Date();
		userSelectedDate = selectedDates[0];
		const timeUntilEnd = userSelectedDate - currentDate;
		console.log(timeUntilEnd);
		if (timeUntilEnd <= 0) {
			alert("Please choose a date in the future");
			button.setAttribute('disabled', "");
			return;
		}
		button.removeAttribute('disabled');
	},
};

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}

flatpickr(input, options);