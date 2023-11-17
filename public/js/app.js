const { time } = require("console");

const qusElement = document.querySelector(".question");
const ansBtn = document.querySelector(".ans-btn");
const nextBtn = document.getElementById("next-btn");
const optionContainer = document.getElementById("option-container");
const qrImage = document.getElementById("qr-section");
const gradeCard = document.querySelector("#grade-card");

let currentQueIndex = 0;
let correctAnswerCount = 0;
let questions = [];

document.addEventListener("DOMContentLoaded", getQuestions);

async function getQuestions() {
  try {
    const res = await fetch("http://localhost:5000/questions");
    const q = await res.json();
    questions = [...q];
    showQuestion();
    callTimer();
  } catch (err) {
    console.log(err);
  }
}

function getGrade(a) {
  if (a < 6) {
    return "Nice Try";
  }

  if (a > 6 && a < 10) {
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
        <span>${getGrade(correctAnswerCount)}</span>
      </div>
    `;

    gradeCard.innerHTML = template;
  } else {
    qusElement.innerHTML = queNo + ". " + currentQue.question;

    const row = document.createElement("div");
    row.classList.add("row");
    row.id = "options";

    currentQue.answers.forEach((answer) => {
      const img = document.createElement("img");
      img.src = answer.image;
      img.classList.add("img-thumbnail");
      img.classList.add("img-opt");
      img.classList.add("col-lg-3");

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

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);

  if ((fiveMinutes = 0)) {
    currentQueIndex = 15;
  }
}
console.log(time.textContent);

function callTimer() {
  window.onload = function () {
    var fiveMinutes = 5,
      display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
  };
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
