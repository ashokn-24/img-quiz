import startTimer from "/js/timer.js";
import { ENDPOINT } from "/js/endpoint.js";

const qusElement = document.querySelector(".question");
const ansBtn = document.querySelector(".ans-btn");
const nextBtn = document.getElementById("next-btn");
const optionContainer = document.getElementById("option-container");
const qrImage = document.getElementById("qr-section");
const gradeCard = document.querySelector("#grade-card");
const timerElement = document.getElementById("time");

const ONE_MINUTE_MILLISECONDS = 1000 * 60;
const FIVE_MINUTES_MILLISECONDS = ONE_MINUTE_MILLISECONDS * 5;

let currentQueIndex = 15;
let correctAnswerCount = 0;
let questions = [];

document.addEventListener("DOMContentLoaded", getQuestions);

async function getQuestions() {
	try {
		const res = await fetch(ENDPOINT);
		const q = await res.json();
		questions = [...q];
		showQuestion();
		startTimer(FIVE_MINUTES_MILLISECONDS, timerElement, () => {
			currentQueIndex = 15;
			showQuestion();
		});
	} catch (err) {
		console.log(err);
	}
}

function getGrade(a) {
	if (a <= 6) {
		return "Nice Try";
	}

	if (a > 6 && a <= 10) {
		return "Good !";
	}

	if (a > 10) {
		return "Excellent";
	}
}

function showQuestion() {
	let currentQue = questions[currentQueIndex];
	let queNo = currentQueIndex + 1;

	if (currentQueIndex > questions.length - 1) {
		let template = `
      <div>
        <h3>Congratulations, You've got ${correctAnswerCount} questions right out of ${
			questions.length
		} questions.!</h3>
        <p class="text-center fw-large text-success " style="font-size:22px; font-weight:bold;">${getGrade(correctAnswerCount)}</p>
        <div class="d-grid">
          <a href="/form" class="btn btn-primary">Generate E-Certificate</a>
        </div>
      </div>
    `;

		gradeCard.innerHTML = template;
		const cardFooter = document.getElementById("footer");
		cardFooter.style.display = "none";
	} else {
		qusElement.innerHTML = queNo + ". " + currentQue.question;

		const row = document.createElement("div");
		row.classList.add("row");
		row.id = "options";

		currentQue.answers.forEach(answer => {
			const img = document.createElement("img");
			img.src = answer.image;
			img.classList.add("img-thumbnail");
			img.classList.add("img-opt");
			img.classList.add("d-flex");
			img.classList.add("gap-3");
			img.classList.add("col-lg-3");
			//

			if (answer.correct) {
				img.dataset.correct = "true";
			}

			img.addEventListener("click", selectAns);

			row.append(img);
		});

		optionContainer.append(row);
	}
}

function selectAns(e) {
	const target = e.target;
	const isCorrect = target.dataset.correct === "true";
	if (isCorrect) {
		target.classList.add("btn-success");
		correctAnswerCount++;
	} else {
		target.classList.add("btn-danger");
	}

	nextBtn.disabled = false;

	console.log(optionContainer.tagName);

	const options = document.getElementById("options").children;
	console.log(options);

	for (let i = 0; i < options.length; i++) {
		let option = options[i];

		if (option.dataset.correct === "true") {
			option.classList.add("btn-success");
		} else {
			option.classList.add("disable");
			removeClick(option);
		}
	}
}

nextBtn.addEventListener("click", () => {
	currentQueIndex++;
	reset();
	showQuestion();
});

function reset() {
	optionContainer.innerHTML = "";
	nextBtn.disabled = true;
}

function removeClick(option) {
	option.removeEventListener("click", selectAns);
}
