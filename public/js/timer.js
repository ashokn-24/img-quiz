let timer;

function startTime(duration, element, cb) {
	displayTimer(duration, element);
	timer = setInterval(() => {
		duration -= 1000;

		if (duration <= 0) {
			clearInterval(timer);
			cb();
		}

		displayTimer(duration, element);
	}, 1000);
}

function displayTimer(duration, element) {
	let seconds = Math.floor((duration % (1000 * 60)) / 1000);
	let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

	if (seconds < 10) {
		seconds = `0${seconds}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	element.innerText = `${minutes}:${seconds}`;
}

export default startTime;
