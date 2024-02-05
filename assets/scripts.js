// scripts.js

import questions from "./questions.js";

const startButton = document.getElementById("start-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;

function startQuiz() {
    startButton.style.display = "none";
    nextButton.style.display = "block";
    renderQuestion();
}

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
        <p>${currentQuestion.question}</p>
        <ul>
            ${currentQuestion.options.map((option, index) => `<li><input type="radio" name="q" value="${index}">${option}</li>`).join("")}
        </ul>
    `;

    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);

    updateButtonsVisibility();
}

function updateButtonsVisibility() {
    prevButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
    nextButton.style.display = currentQuestionIndex < questions.length - 1 ? "block" : "none";
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? "block" : "none";
}

function nextQuestion() {
    currentQuestionIndex++;
    renderQuestion();
}

function prevQuestion() {
    currentQuestionIndex--;
    renderQuestion();
}

function submitQuiz() {

     let score = 0;

     // Loop through each question
     questions.forEach((question, index) => {
         const selectedAnswerIndex = document.querySelector(`input[name="q"]:checked`);
 
         // If an answer is selected, check if it's correct
         if (selectedAnswerIndex !== null) {
             const userAnswer = parseInt(selectedAnswerIndex.value, 10);
             if (userAnswer === question.correctAnswerIndex) {
                 // Increment the score for correct answers
                 score++;
             }
         }
     });
     resultContainer.textContent = "Quiz submitted!"; // You can display the result here or perform further actions.

 
     // Display the result
     resultContainer.textContent = `Your score: ${score} out of ${questions.length}`;
     hideQuizButtons(); // Optional: Hide the buttons after submission
     // Apply dynamic styles to result container
    resultContainer.style.display = "block";
    resultContainer.style.width = "200px";  // Adjust the width as needed
    resultContainer.style.height = "50px";  // Adjust the height as needed
    resultContainer.style.textAlign = "center";
    resultContainer.style.lineHeight = "1.5";
    resultContainer.style.backgroundColor = "rgb(201, 110, 36)";
 }
 


function hideQuizButtons() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
}

// Add event listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);
submitButton.addEventListener("click", submitQuiz);
