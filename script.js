const questions = [
    {
        question: "Who is Luke Skywalker's father?",
        answers: [
            { text: "Darth Vader", correct: true },
            { text: "Obi-Wan Kenobi", correct: false },
            { text: "Han Solo", correct: false },
            { text: "Yoda", correct: false }
        ]
    },
    {
        question: "What is the name of Han Solo's ship?",
        answers: [
            { text: "Millennium Falcon", correct: true },
            { text: "X-Wing", correct: false },
            { text: "Star Destroyer", correct: false },
            { text: "TIE Fighter", correct: false }
        ]
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        startGame();
    }
});

startGame();
