// Variables for elements
const countdownElement = document.querySelector("#span__timer");
const buttonStartQuizElement = document.querySelector("#button__start-quiz");
const introductionContainerElement = document.querySelector("#introduction");
const quizContainerElement = document.querySelector("#quiz");
const questionContainerElement = document.querySelector("#question");
const answersContainerElement = document.querySelector("#answers");

// Array for questions
let questionsArray = [
  {
    question: "Commonly used data types do not include:",
    answers: [
      { answer: "strings", isCorrect: false },
      { answer: "booleans", isCorrect: false },
      { answer: "alerts", isCorrect: true },
      { answer: "numbers", isCorrect: false },
    ],
  },
  {
    question: "The condition in an if/else statement is enclosed with what?",
    answers: [
      { answer: "quotes", isCorrect: false },
      { answer: "curly brackets", isCorrect: true },
      { answer: "parenthesis", isCorrect: false },
      { answer: "square brackets", isCorrect: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store what?",
    answers: [
      { answer: "numbers and strings", isCorrect: false },
      { answer: "other arrays", isCorrect: false },
      { answer: "booleans", isCorrect: false },
      { answer: "all of the above", isCorrect: true },
    ],
  },
  {
    question:
      "String values must be enclosed within what when being assigned to variables?",
    answers: [
      { answer: "commas", isCorrect: false },
      { answer: "curly brackets", isCorrect: false },
      { answer: "quotes", isCorrect: true },
      { answer: "parenthesis", isCorrect: false },
    ],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing conent to the debugger is:",
    answers: [
      { answer: "JavaScript", isCorrect: false },
      { answer: "terminal/bash", isCorrect: false },
      { answer: "for loops", isCorrect: false },
      { answer: "console.log", isCorrect: true },
    ],
  },
];

// When I click the start button, a timer starts and I am presented with a question.
buttonStartQuizElement.addEventListener("click", startQuiz);

function startQuiz() {
  introductionContainerElement.classList.add("hidden");
  quizContainerElement.classList.remove("hidden");
  startTimer();
  showQuestion();
}

function startTimer() {
  let timeRemaining = 75;
  countdownElement.textContent = timeRemaining;
  const timeInterval = setInterval(function () {
    timeRemaining--;
    countdownElement.textContent = timeRemaining;
    if (timeRemaining === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function showQuestion() {}

// When I answer a question, I am presented with another question.

// When I answer a question incorrectly, time is subtracted from the clock.

// When all questions are answered or the timer reaches 0, the game is over.

// The game is over, then I can save my initials and score.
