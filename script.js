
const questions = [
  {
    question: "Who developed the C programming language?",
    options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
    answer: 1
  },
  {
    question: "Which symbol ends a C statement?",
    options: [":", ".", ";", ","],
    answer: 2
  },
  {
    question: "Which function is the usual entry point of a C program?",
    options: ["start()", "run()", "main()", "init()"],
    answer: 2
  },
  {
    question: "Which header is commonly used for printf()?",
    options: ["<math.h>", "<stdio.h>", "<string.h>", "<stdlib.h>"],
    answer: 1
  },
  {
    question: "Which format specifier is used for an int in printf()?",
    options: ["%f", "%c", "%d", "%s"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

function showQuestion() {
  answered = false;
  const q = questions[current];

  progressEl.textContent =
    `Question ${current + 1} of ${questions.length}`;

  scoreEl.textContent = `Score: ${score}`;
  progressBar.style.width =
    `${(current / questions.length) * 100}%`;

  questionEl.textContent = q.question;
  answersEl.replaceChildren();
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(button);
  });
}

function selectAnswer(selected) {
  if (answered) return;

  answered = true;
  const correct = questions[current].answer;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === correct) {
      button.classList.add("correct");
    }

    if (index === selected && selected !== correct) {
      button.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Correct answer!";
    feedbackEl.style.color = "#039855";
  } else {
    feedbackEl.textContent =
      `Incorrect. Correct answer: ${questions[current].options[correct]}`;
    feedbackEl.style.color = "#d92d20";
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
  nextBtn.textContent =
    current === questions.length - 1 ? "Show Result" : "Next Question";
}

nextBtn.addEventListener("click", () => {
  if (!answered) return;

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizEl.hidden = true;
  resultEl.hidden = false;

  const percentage = Math.round((score / questions.length) * 100);

  document.getElementById("finalScore").textContent =
    `You scored ${score} out of ${questions.length} (${percentage}%).`;

  document.getElementById("message").textContent =
    percentage >= 80 ? "Excellent work!" :
    percentage >= 40 ? "Good effort. Keep practising!" :
    "Keep learning and try again!";
}

document.getElementById("restartBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  quizEl.hidden = false;
  resultEl.hidden = true;
  nextBtn.textContent = "Next Question";
  showQuestion();
});

showQuestion();
