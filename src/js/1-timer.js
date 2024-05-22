


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const selectors = {
	input: document.querySelector('input#datetime-picker'),
	button: document.querySelector('button[data-start]'),
	days: document.querySelector('span[data-days]'),
	hours: document.querySelector('span[data-hours]'),
	minutes: document.querySelector('span[data-minutes]'),
	seconds: document.querySelector('span[data-seconds]'),
};
const { input, button, days, hours, minutes, seconds } = selectors;

let userSelectedDate;
let options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	allowInput: false,
	onClose(selectedDates) {
		userSelectedDate = selectedDates[0];
		const timeUntilEnd = userSelectedDate - new Date();
		if (timeUntilEnd <= 0) {
			iziToast.error({ title: "Error", message: "Please choose a date in the future" });
			button.setAttribute('disabled', "");
			return;
		}
		button.removeAttribute('disabled');
	},
};
button.addEventListener('click', () => {
	const intervalId = setInterval(() => {
		const dateDifference = userSelectedDate - new Date();
		const dateObj = convertMs(dateDifference);
		days.innerHTML = addLeadingZero(dateObj.days);
		hours.innerHTML = addLeadingZero(dateObj.hours);
		minutes.innerHTML = addLeadingZero(dateObj.minutes);
		seconds.innerHTML = addLeadingZero(dateObj.seconds);
		button.setAttribute('disabled', "");
		input.setAttribute('disabled', "");
		if (dateDifference <= 0 || !dateDifference) {
			clearInterval(intervalId);
			days.innerHTML = "00";
			hours.innerHTML = "00";
			minutes.innerHTML = "00";
			seconds.innerHTML = "00";
			input.removeAttribute('disabled');
		}
	}, 1000);

});
function addLeadingZero(value) {
	return value.toString().padStart(2, "0");
}
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

flatpickr(input, options);;

