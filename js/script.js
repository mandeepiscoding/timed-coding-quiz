document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const resultContainer = document.getElementById("result-container");
    const scoreContainer = document.getElementById("score-container");
    const scoreDisplay = document.getElementById("score");
    const submitBtn = document.getElementById("submit-btn");
    const highScoresContainer = document.getElementById("high-scores");
    const highScoresList = document.getElementById("high-scores-list");

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    const quizQuestions = [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["<javascript>", "<js>", "<script>", "<scripting>"],
            correctAnswer: "<script>"
        },
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
    restartBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", saveScore);

    function startQuiz() {
        restartBtn.classList.add("hide");
        highScoresContainer.classList.add("hide");
        startBtn.classList.add("hide");
        questionContainer.classList.remove("hide");
        resultContainer.classList.add("hide");
        scoreContainer.classList.add("hide");
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
        startTimer(); // Start the timer when the quiz begins
    }

    function displayQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        document.getElementById("question-text").innerText = currentQuestion.question;

        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.addEventListener("click", checkAnswer);
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(event) {
        const selectedOption = event.target.innerText;
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

        if (selectedOption === correctAnswer) {
            score += 1; 
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
        let timeLeft = 60; // Set the time limit to 60 seconds
        timer = setInterval(function () {
            document.getElementById("timer").innerText = timeLeft;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                endQuiz(); // End the quiz when time runs out
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        questionContainer.classList.add("hide");
        resultContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        restartBtn.classList.remove("hide");
        scoreDisplay.innerText = Math.max(score, 0);

        // Show high scores
        showHighScores();
    }

    function saveScore() {
        const initials = document.getElementById("initials").value;
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        const newScore = {
            initials: initials,
            score: score
        };

        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));

        // Show high scores
        showHighScores();
    }

    function showHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.sort((a, b) => b.score - a.score);

        highScoresList.innerHTML = "";

        highScores.forEach((score, index) => {
            if (index < 5) { // Display top 5 high scores
                const listItem = document.createElement("li");
                listItem.textContent = `${score.initials}: ${score.score}`;
                highScoresList.appendChild(listItem);
            }
        });

        highScoresContainer.classList.remove("hide");
    }
});