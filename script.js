
const questions = [
    {
        question: "Who developed the C programming language?",
        options: [
            "James Gosling",
            "Dennis Ritchie",
            "Bjarne Stroustrup",
            "Guido van Rossum"
        ],
        answer: 1
    },
    {
        question: "Which symbol is used to end a statement in C?",
        options: [":", ";", ",", "."],
        answer: 1
    },
    {
        question: "Which function is the entry point of a typical C program?",
        options: ["start()", "run()", "main()", "printf()"],
        answer: 2
    },
    {
        question: "Which header file declares printf()?",
        options: ["<math.h>", "<stdio.h>", "<string.h>", "<time.h>"],
        answer: 1
    },
    {
        question: "Which format specifier is used for an int in printf()?",
        options: ["%f", "%c", "%d", "%s"],
        answer: 2
    },
    {
        question: "Which data type stores a single character?",
        options: ["int", "char", "float", "double"],
        answer: 1
    },
    {
        question: "Which operator checks equality between two values?",
        options: ["=", "==", "!=", "<="],
        answer: 1
    },
    {
        question: "What is the output of printf(\"%d\", 5 + 3 * 2)?",
        options: ["16", "11", "13", "10"],
        answer: 1
    },
    {
        question: "Which loop executes its body at least once?",
        options: ["for", "while", "do-while", "None of these"],
        answer: 2
    },
    {
        question: "Which keyword exits a loop immediately?",
        options: ["skip", "stop", "break", "continue"],
        answer: 2
    },
    {
        question: "Which keyword skips to the next loop iteration?",
        options: ["break", "continue", "exit", "return"],
        answer: 1
    },
    {
        question: "Array indexing in C normally starts at which value?",
        options: ["0", "1", "-1", "Depends on the compiler"],
        answer: 0
    },
    {
        question: "Which operator gives the address of a variable?",
        options: ["*", "&", "%", "#"],
        answer: 1
    },
    {
        question: "Which operator dereferences a pointer?",
        options: ["&", "*", "->", "%"],
        answer: 1
    },
    {
        question: "Which keyword returns a value from a function?",
        options: ["send", "print", "return", "break"],
        answer: 2
    },
    {
        question: "Which function reads formatted input from standard input?",
        options: ["printf()", "scanf()", "puts()", "strlen()"],
        answer: 1
    },
    {
        question: "Which header file declares strlen()?",
        options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<ctype.h>"],
        answer: 2
    },
    {
        question: "What is the value of 10 % 3 in C?",
        options: ["3", "1", "0", "3.33"],
        answer: 1
    },
    {
        question: "Which statement selects between alternatives based on an expression?",
        options: ["switch", "typedef", "sizeof", "goto"],
        answer: 0
    },
    {
        question: "What does the sizeof operator return?",
        options: [
            "Value of a variable",
            "Size in bytes",
            "Memory address",
            "Number of variables"
        ],
        answer: 1
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let answered = false;

// HTML elements
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progressBar");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const finalScoreEl = document.getElementById("finalScore");
const messageEl = document.getElementById("message");

// Display a question
function showQuestion() {
    answered = false;

    const questionData = questions[currentQuestion];

    progressEl.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreEl.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    questionEl.textContent = questionData.question;

    answersEl.replaceChildren();
    feedbackEl.textContent = "";
    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Show Result →"
            : "Next Question →";

    // Create answer buttons
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersEl.appendChild(button);
    });
}

// Check selected answer
function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].answer;
    const buttons = answersEl.querySelectorAll(".answer");

    // Disable options and show correct answer
    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (
            index === selectedIndex &&
            selectedIndex !== correctIndex
        ) {
            button.classList.add("wrong");
        }
    });

    // Update score and feedback
    if (selectedIndex === correctIndex) {
        score++;

        feedbackEl.textContent = "Correct answer! Well done.";
        feedbackEl.style.color = "#15803d";
    } else {
        feedbackEl.textContent =
            `Incorrect. Correct answer: ${
                questions[currentQuestion].options[correctIndex]
            }`;

        feedbackEl.style.color = "#b91c1c";
    }

    scoreEl.textContent = `Score: ${score}`;
    nextBtn.disabled = false;
}

// Move to the next question
nextBtn.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Display final result
function showResult() {
    quizEl.hidden = true;
    resultEl.hidden = false;

    progressBar.style.width = "100%";

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    finalScoreEl.textContent =
        `Your Score: ${score} / ${questions.length} (${percentage}%)`;

    if (percentage >= 80) {
        messageEl.textContent =
            "Excellent! You have a strong understanding of C programming.";
    } else if (percentage >= 60) {
        messageEl.textContent =
            "Good job! Keep practising to improve your score.";
    } else if (percentage >= 40) {
        messageEl.textContent =
            "Nice effort! Revise the concepts and try again.";
    } else {
        messageEl.textContent =
            "Keep learning C programming. You can do better next time!";
    }
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    quizEl.hidden = false;
    resultEl.hidden = true;

    showQuestion();
});

// Check required HTML elements
if (
    !quizEl ||
    !resultEl ||
    !questionEl ||
    !answersEl ||
    !progressEl ||
    !scoreEl ||
    !progressBar ||
    !feedbackEl ||
    !nextBtn ||
    !restartBtn ||
    !finalScoreEl ||
    !messageEl
) {
    console.error(
        "Quiz setup error: Check the element IDs in index.html."
    );
} else {
    showQuestion();
}
