// Element variables
const countdownElement = document.querySelector("#span__timer");

const introductionContainerElement = document.querySelector("#introduction");
const startQuizButtonElement = document.querySelector("#button__start-quiz");

const quizContainerElement = document.querySelector("#quiz");
const questionContainerElement = document.querySelector("#question");
const answersContainerElement = document.querySelector("#answers");

const correctIncorrectText = document.querySelector("#correct-incorrect");

const doneContainerElement = document.querySelector("#done");
const scoreContainerElement = document.querySelector("#score");

const highScoreForm = document.querySelector("#form");
const highScoreInput = document.querySelector("#text-input");

// Other variables
let timeRemaining = 75;
let currentQuestionIndex = 0;

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

// Acceptance criteria: When I click the start button, a timer starts and I am presented with a question.
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

// Acceptance Criteria: When the game is over, then I can save my initials and score.
