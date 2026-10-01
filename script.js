/* =========================================
   PHISHGUARD
   CODEALPHA TASK 2
   PHISHING AWARENESS TRAINING
========================================= */


/* =========================================
   SMOOTH NAVIGATION
========================================= */

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }

}


/* =========================================
   QUIZ QUESTIONS
========================================= */

const questions = [

    {
        question:
            "You receive an email saying your bank account will be closed in 10 minutes unless you click a link. What should you do?",

        answers: [
            "Click the link immediately",
            "Reply with your account details",
            "Open your bank's official app or website separately",
            "Forward the email to friends"
        ],

        correct: 2
    },


    {
        question:
            "Which of these is a common sign of a phishing email?",

        answers: [
            "Unexpected urgency",
            "A normal greeting",
            "A message you were expecting",
            "An email from a known contact that you verified"
        ],

        correct: 0
    },


    {
        question:
            "Someone claiming to be from your bank asks for your OTP over the phone. What should you do?",

        answers: [
            "Give the OTP because they are from the bank",
            "Share only the first three digits",
            "Do not share the OTP and verify through an official channel",
            "Send your password instead"
        ],

        correct: 2
    },


    {
        question:
            "Which URL should make you more cautious?",

        answers: [
            "https://www.example.com",
            "https://accounts.example.com",
            "https://example.com",
            "https://example-login-security.fake-site.example"
        ],

        correct: 3
    },


    {
        question:
            "What does MFA provide?",

        answers: [
            "A second layer of authentication",
            "A faster internet connection",
            "Automatic virus removal",
            "A replacement for all passwords"
        ],

        correct: 0
    },


    {
        question:
            "Which social engineering tactic creates pressure to act immediately?",

        answers: [
            "Urgency",
            "Encryption",
            "Backup",
            "Firewall"
        ],

        correct: 0
    },


    {
        question:
            "What is the safest way to access your bank account after receiving a suspicious email?",

        answers: [
            "Click the email link",
            "Use the phone number in the email",
            "Open the official banking app or manually type the official website",
            "Reply to the sender"
        ],

        correct: 2
    },


    {
        question:
            "What should you do if you receive a suspicious phishing message?",

        answers: [
            "Click the link to investigate",
            "Share it publicly",
            "Report it through the appropriate channel and avoid interacting with it",
            "Send your credentials to confirm your identity"
        ],

        correct: 2
    }

];


/* =========================================
   QUIZ VARIABLES
========================================= */

let currentQuestion = 0;
let score = 0;
let selectedAnswer = false;


/* =========================================
   DOM ELEMENTS
========================================= */

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const progressBar =
    document.getElementById("quizProgress");

const nextButton =
    document.getElementById("nextButton");

const quizContent =
    document.getElementById("quizContent");

const quizResult =
    document.getElementById("quizResult");

const finalScore =
    document.getElementById("finalScore");

const resultMessage =
    document.getElementById("resultMessage");


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    selectedAnswer = false;

    nextButton.disabled = true;

    const question = questions[currentQuestion];

    questionText.textContent = question.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    answersContainer.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.addEventListener(
            "click",
            () => selectAnswer(index, button)
        );

        answersContainer.appendChild(button);

    });

}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(index, selectedButton) {

    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const question =
        questions[currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer-btn");


    allButtons.forEach(button => {
        button.disabled = true;
    });


    if (index === question.correct) {

        selectedButton.classList.add("correct");

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;

    } else {

        selectedButton.classList.add("wrong");

        allButtons[question.correct]
            .classList.add("correct");

    }


    nextButton.disabled = false;

}


/* =========================================
   NEXT QUESTION
========================================= */

function nextQuestion() {

    if (!selectedAnswer) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}


/* =========================================
   SHOW RESULT
========================================= */

function showResult() {

    quizContent.classList.add("hidden");

    quizResult.classList.remove("hidden");

    finalScore.textContent = score;


    if (score === questions.length) {

        resultMessage.textContent =
            "Excellent! You demonstrated a strong understanding of phishing awareness.";

    }

    else if (score >= 6) {

        resultMessage.textContent =
            "Great job! You have a good understanding of common phishing threats.";

    }

    else if (score >= 4) {

        resultMessage.textContent =
            "Good effort! Review the red flags and social engineering sections once more.";

    }

    else {

        resultMessage.textContent =
            "Keep learning! Review the training material and try the quiz again.";

    }

}


/* =========================================
   RESTART QUIZ
========================================= */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = false;

    quizContent.classList.remove("hidden");

    quizResult.classList.add("hidden");

    loadQuestion();

    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   INITIALIZE QUIZ
========================================= */

loadQuestion();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".info-card, .tactic-card, .check-item, .email-card, .protection-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-card"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("hidden-card");

    observer.observe(element);

});


/* =========================================
   DYNAMIC CARD ANIMATION STYLES
========================================= */

const animationStyle =
    document.createElement("style");

animationStyle.textContent = `

    .hidden-card {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.6s ease,
            transform 0.6s ease;
    }

    .show-card {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(animationStyle);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks =
    document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    const sections =
        document.querySelectorAll("section[id]");


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (
            window.scrollY >= sectionTop
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   PREVENT DEMO FORM SUBMISSION
========================================= */

document
    .querySelectorAll(".login-box input")
    .forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                alert(
                    "Training Demo: Never enter your real credentials into a suspicious website."
                );

                input.blur();

            }
        );

    });


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "PhishGuard - CodeAlpha Task 2 loaded successfully."
);

console.log(
    "Remember: Only enter credentials on trusted websites."
);