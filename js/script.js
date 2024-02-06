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
    const timerDisplay = document.getElementById("timer");

    // Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 60; // Initial time

    // Questions
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

    // Event listeners
    startBtn.addEventListener("click", startQuiz);
    restartBtn.addEventListener("click", startQuiz);
    submitBtn.addEventListener("click", saveScore);

    // Start quiz function
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
        document.getElementById("answer-feedback").innerText = ""; // Reset feedback content
        document.getElementById("answer-feedback").classList.add("hide"); // Hide feedback
    }

    // Display question function
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

    // Check answer function
    function checkAnswer(event) {
        const selectedOption = event.target.innerText;
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    
        if (selectedOption === correctAnswer) {
            score += 1;
            resultContainer.innerText = "Correct!";
            document.getElementById("answer-feedback").innerText = ""; // Reset feedback content
            document.getElementById("answer-feedback").classList.add("hide"); // Hide feedback
        } else {
            resultContainer.innerText = "Incorrect!";
            document.getElementById("answer-feedback").innerText = "Wrong! 5 seconds deducted.";
            document.getElementById("answer-feedback").classList.remove("hide"); // Show feedback
            timeLeft -= 5; // Deduct 5 seconds
    
            // Update the timer display after deducting 5 seconds
            timerDisplay.innerText = timeLeft;
        }
    
        currentQuestionIndex++;
    
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    // Start timer function
    function startTimer() {
        const startTime = new Date().getTime(); // Get the current time when the quiz starts
        const initialTimeLeft = 60; // Set the initial time limit to 60 seconds
    
        timer = setInterval(function () {
            const currentTime = new Date().getTime(); 
            const elapsedTime = (currentTime - startTime) / 1000; 
            const timeLeft = Math.max(initialTimeLeft - elapsedTime, 0);
    
            timerDisplay.innerText = Math.floor(timeLeft); // Update the timer display
    
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz(); // End the quiz when time runs out
            }
        }, 1000);
    }

    // End quiz function
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

    // Save score function
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

    // Show high scores function
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