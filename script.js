document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const resultContainer = document.getElementById("result-container");
    const scoreContainer = document.getElementById("score-container");
    const scoreDisplay = document.getElementById("score");
    const submitBtn = document.getElementById("submit-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    const quizQuestions = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["<javascript>", "<js>", "<script>", "<scripting>"],
            correctAnswer: "<script>"
        },
        // Add more questions here in the same format
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            correctAnswer: "Cascading Style Sheets"
        },
        {
            question: "What does HTML stand for?",
            options: ["Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hypertext Machine Language"],
            correctAnswer: "Hypertext Markup Language"
        }
    ];

    startBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", saveScore);

    function startQuiz() {
        startBtn.classList.add("hide");
        questionContainer.classList.remove("hide");
        displayQuestion();
        startTimer();

        optionsContainer.addEventListener("click", checkAnswer);
    }

    function displayQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        document.getElementById("question-text").innerText = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(event) {
        const selectedOption = event.target.innerText;
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

        if (selectedOption === correctAnswer) {
            score += 1; // Add 1 point for each correct answer
            resultContainer.innerText = "Correct!";
        } else {
            resultContainer.innerText = "Incorrect!";
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timer = setInterval(function () {
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        questionContainer.classList.add("hide");
        resultContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        scoreDisplay.innerText = Math.max(score, 0); // Ensure score doesn't go below 0
    }

    function saveScore() {
        const initials = document.getElementById("initials").value;
        // Save the score and initials as needed (e.g., to local storage or server)
        // Implement your own logic for saving scores
    }
});