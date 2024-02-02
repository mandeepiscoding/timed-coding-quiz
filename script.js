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
        // Add more questions as needed
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
            score += 10;
            resultContainer.innerText = "Correct!";
        } else {
            resultContainer.innerText = "Incorrect!";
            // Subtract time for incorrect answer (adjust time as needed)
            // For example, you can subtract 10 seconds for each incorrect answer
            // Modify the timer as per your requirements
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        // Implement timer logic as needed
        // For example, you can set a countdown timer from a specific duration
        timer = setInterval(function () {
            // Update timer display or handle timer logic
            // If the timer reaches 0, call endQuiz()
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        questionContainer.classList.add("hide");
        resultContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        scoreDisplay.innerText = score;
    }

    function saveScore() {
        const initials = document.getElementById("initials").value;
        // Save the score and initials as needed (e.g., to local storage or server)
        // Implement your own logic for saving scores
    }
});