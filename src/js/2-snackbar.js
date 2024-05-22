import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const delay = Number(e.target.delay.value);
	const state = e.target.state.value;
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (state === "fulfilled") {
				resolve(`✅ Fulfilled promise in ${delay} ms`);
			} else {
				reject(`❌ Rejected promise in ${delay} ms`);
			}
		}, delay);
	}).then((res) => {
		iziToast.success({ title: "Success", message: res });
	}).catch((rej) => {
		iziToast.error({ title: "Error", message: rej });
	});
});
