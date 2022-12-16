// Array of questions
const questionsArray = [
  {
    question: "Commonly used data types do not include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with what?",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: "curly brackets",
  },
  {
    question: "Arrays in JavaScript can be used to store what?",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
  {
    question:
      "String values must be enclosed within what when being assigned to variables?",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing conent to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
];

const answersContainerElement = document.querySelector("#answers");
const correctIncorrectText = document.querySelector("#correct-incorrect");
const countdownElement = document.querySelector("#span__timer");
const doneContainerElement = document.querySelector("#done");
const introductionContainerElement = document.querySelector("#introduction");
const questionContainerElement = document.querySelector("#question");
const quizContainerElement = document.querySelector("#quiz");
const scoreContainerElement = document.querySelector("#score");
const startQuizButtonElement = document.querySelector("#button__start-quiz");

let currentQuestionIndex = 0;
let timeRemaining = 75;

startQuizButtonElement.addEventListener("click", startQuiz);

function startQuiz() {
  introductionContainerElement.classList.add("hidden");
  quizContainerElement.classList.remove("hidden");
  startTimer();
  showQuestion();
}

function startTimer() {
  countdownElement.textContent = timeRemaining;
  const timeInterval = setInterval(function () {
    timeRemaining--;
    countdownElement.textContent = timeRemaining;
    // Acceptance Criteria: When all questions are answered or the timer reaches 0, then the game is over.
    if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  questionContainerElement.textContent = currentQuestion.question;
  answersContainerElement.innerHTML = "";
  currentQuestion.answers.forEach(function (answer) {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answersContainerElement.appendChild(answerButton);
    answerButton.addEventListener("click", nextQuestion);
  });
}

function nextQuestion() {
  // When I answer a question correctly or incorrectly, I am presented with text telling me that I answered correctly or incorrectly.
  if (this.innerHTML === questionsArray[currentQuestionIndex].correct) {
    // this = button element; this.innerHTML = answer text
    correctIncorrectText.innerHTML = "Correct!";
    timeRemaining += 10;
  } else {
    correctIncorrectText.innerHTML = "Incorrect!";
    // Acceptance Criteria: When I answer a question incorrectly, time is subtracted from the clock.
    timeRemaining -= 10;
  }
  // Acceptance Criteria: When I answer a question, I am presented with another question.
  currentQuestionIndex++;
  // Acceptance Criteria: When all questions are answered or the timer reaches 0, then the game is over.
  if (timeRemaining == 0 || currentQuestionIndex == questionsArray.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

function endQuiz() {
  quizContainerElement.classList.add("hidden");
  doneContainerElement.classList.remove("hidden");
  scoreContainerElement.innerHTML = timeRemaining;
}

// Acceptance Criteria: When the game is over, then I can save my initials and score.
const clearScoresButtonElement = document.querySelector(
  "#button__clear-scores"
);
const initialsInputElement = document.querySelector("#initials");
const formElement = document.querySelector("#form");
const goBackButtonElement = document.querySelector("#button__go-back");
const highScoresContainerElement = document.querySelector("#ul__high-scores");
const scoresContainerElement = document.querySelector("#high-scores-board");

let scoresArray;
if (localStorage.getItem("scores")) {
  scoresArray = JSON.parse(localStorage.getItem("scores"));
} else {
  scoresArray = [];
}

localStorage.setItem("scores", JSON.stringify(scoresArray));
const data = JSON.parse(localStorage.getItem("scores"));

function liMaker(text) {
  const li = document.createElement("li");
  li.textContent = text;
  highScoresContainerElement.appendChild(li);
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  scoresArray.push(initialsInputElement.value + " - " + timeRemaining);
  localStorage.setItem("scores", JSON.stringify(scoresArray));
  liMaker(initialsInputElement.value + " - " + timeRemaining);
  initialsInputElement.value = "";
  doneContainerElement.classList.add("hidden");
  scoresContainerElement.classList.remove("hidden");
});

data.forEach((item) => {
  liMaker(item);
});

clearScoresButtonElement.addEventListener("click", function () {
  localStorage.clear();
  while (highScoresContainerElement.firstChild) {
    highScoresContainerElement.removeChild(
      highScoresContainerElement.firstChild
    );
  }
});

goBackButtonElement.addEventListener("click", function () {
  location.reload();
});

const viewHighScoresLinkElement = document.querySelector("#view-high-scores");

viewHighScoresLinkElement.addEventListener("click", function () {
  scoresContainerElement.classList.remove("hidden");
  introductionContainerElement.classList.add("hidden");
  quizContainerElement.classList.add("hidden");
  doneContainerElement.classList.add("hidden");
});
