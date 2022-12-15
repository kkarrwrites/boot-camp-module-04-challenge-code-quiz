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
  } else {
    correctIncorrectText.innerHTML = "Incorrect!";
    // Acceptance Criteria: When I answer a question incorrectly, time is subtracted from the clock.
    timeRemaining -= 15;
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

/*

// Acceptance Criteria: When the game is over, then I can save my initials and score.

const formContainer = document.querySelector("#form");
const initialsInput = document.querySelector("#initials");
const submitButton = document.querySelector("#submit");
const highScoresContainer = document.querySelector("#ul__high-scores");

let userInitials = [];

function renderScore() {
  highScoresContainer.innerHTML = "";
  for (let i = 0; i < userInitials.length; i++) {
    let initials = userInitials[i];
    let finalScore = timeRemaining;
    let li = document.createElement("li");
    li.textContent = userInitials.initials + " - " + finalScore;
    li.setAttribute("data-index", i);
    highScoresContainer.appendChild(li);
  }
}

function init() {
  var storedInitials = JSON.parse(localStorage.getItem("Initials"));
  if (storedInitials !== null) {
    userInitials = storedInitials;
  }
  renderScore();
}

function storeScore() {
  localStorage.setItem("Initials", JSON.stringify(userInitials));
}

formContainer.addEventListener("submit", function (event) {
  event.preventDefault();
  var initialsText = initialsInput.value.trim();
  if (initialsText === "") {
    return;
  }
  userInitials.push(initialsText);
  initialsInput.value = "";
  storeScore();
  renderScore();
});

init();

*/
