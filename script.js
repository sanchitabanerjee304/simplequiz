const ques = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Delhi", correct: true },
            { text: "Pune", correct: false },
        ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Tiger", correct: true },
            { text: "Elephant", correct: false },
            { text: "Cow", correct: false },
            { text: "Lion", correct: false },
        ]
    },
    {
        question: "What is the national fruit of India?",
        answers: [
            { text: "Mango", correct: true },
            { text: "Apple", correct: false },
            { text: "Banana", correct: false },
            { text: "Orange", correct: false },
        ]
    },
    {
        question: "What is the national language of India?",
        answers: [
            { text: "Bengali", correct: false },
            { text: "English", correct: false },
            { text: "Marathi", correct: false },
            { text: "Hindi", correct: true },
        ]
    }
];

const question = document.getElementById("question");
const ansbtn = document.getElementById("ansbtn");
const nextbtn = document.getElementById("nextbtn");

let cqi = 0;
let score = 0;
let quizEnded = false;
function startquiz() {
    cqi = 0;
    score = 0;
    quizEnded = false;
    nextbtn.innerHTML = "Next";
    nextbtn.style.display = "none";
    showquestion();
}
function showquestion() {
    ansbtn.innerHTML = "";
    nextbtn.style.display = "none";

    let currentquestion = ques[cqi];
    let questionno = cqi + 1;

    question.innerHTML = questionno + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectanswer);
    });
}

function selectanswer(e) {
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";

    if (iscorrect) {
        selectedbtn.style.backgroundColor = "green";
        score++;
    } else {
        selectedbtn.style.backgroundColor = "red";
    }
    Array.from(ansbtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
        }
        button.disabled = true;
    });

    nextbtn.style.display = "block";
}

function showscore() {
    ansbtn.innerHTML = "";
    question.innerHTML = `You scored ${score} out of ${ques.length}`;
    nextbtn.innerHTML = "Restart";
    nextbtn.style.display = "block";
    quizEnded = true;
}
nextbtn.addEventListener("click", () => {
    if (quizEnded) {
        startquiz();
        return;
    }

    cqi++;

    if (cqi < ques.length) {
        showquestion();
    } else {
        showscore();
    }
});

startquiz();