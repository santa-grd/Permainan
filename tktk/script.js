const questions = {
    tekaTekiSulit: [
        { 
            question: 'Saya selalu di depan kamu, tapi kamu tidak bisa melihat saya. Apakah saya?', 
            correctAnswer: 'MASADEPAN',
            letterkeys: 'DPEMSAADNA'
        },
        { 
            question: 'Apa yang lebih berat, satu kilogram kapas atau satu kilogram besi?', 
            correctAnswer: 'SAMABERATNYA',
            letterkeys: 'SERABMASANABTY'
        },
        { 
            question: 'Saya bisa naik tapi tidak bisa turun. Apakah saya?', 
            correctAnswer: 'USIA',
            letterkeys: 'AISU'
        },
        { 
            question: 'Saya memiliki banyak sisi, tapi tidak punya ujung. Apakah saya?', 
            correctAnswer: 'BOLA',
            letterkeys: 'OLAB'
        },
        { 
            question: 'Saya tidak bisa melihat, tapi sering disebut mata. Apakah saya?', 
            correctAnswer: 'MATAKAKI',
            letterkeys: 'IKTAKAMA'
        },
        { 
            question: 'Pagi pagi aku ada 2,\n di siang hari aku ada 3,\n kalau malam aku gak ada, \naku ada di ujung api dan ditengah air,\n aku punya kepala sayangnya gak punya leher,\n dan kalau aku udah besar dan tinggi biasanya kepala ku hilang,\ntanpa aku dunia dan cinta tidak akan ada, siapakah aku?', 
            correctAnswer: 'HURUFI',
            letterkeys: 'UIRUHF'
        },
    ]
};

let currentQuestionIndex = 0;
let currentAnswer = [];
let correctAnswer = [];

function showQuestion() {
    const questionObj = questions.tekaTekiSulit[currentQuestionIndex];
	document.getElementById('level-display').innerText = `Level ${currentQuestionIndex + 1}`;
    document.getElementById('question-container').innerHTML = `<p>${questionObj.question}</p>`;
	
    const answerBoxes = document.getElementById('answer-boxes');
    answerBoxes.innerHTML = '';
    correctAnswer = questionObj.correctAnswer.split(''); 
    currentAnswer = Array(correctAnswer.length).fill(''); 
    
    correctAnswer.forEach((char, index) => {
        const input = document.createElement('input');
        input.setAttribute('readonly', true); 
        input.id = `box-${index}`;
        answerBoxes.appendChild(input);
    });

    const letterButtons = document.getElementById('letter-buttons');
    letterButtons.innerHTML = '';
    
    const letters = questionObj.letterkeys.split(''); 
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.onclick = () => selectLetter(letter);
        letterButtons.appendChild(button);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus';
    deleteButton.onclick = deleteLetter;
    letterButtons.appendChild(deleteButton);

    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('feedback-container').classList.add('hidden');
}

let currentLetterIndex = 0;

function selectLetter(letter) {
    if (currentLetterIndex < correctAnswer.length) {
        document.getElementById(`box-${currentLetterIndex}`).value = letter;
        currentAnswer[currentLetterIndex] = letter;
        currentLetterIndex++;
    }
    
    if (currentAnswer.join('') === correctAnswer.join('')) {
        checkAnswer();
    }
}

function deleteLetter() {
    if (currentLetterIndex > 0) {
        currentLetterIndex--;
        document.getElementById(`box-${currentLetterIndex}`).value = '';
        currentAnswer[currentLetterIndex] = '';
    }
}

function checkAnswer() {
    const feedback = document.getElementById('feedback-container');
    
    if (currentAnswer.join('') === correctAnswer.join('')) {
        feedback.innerText = 'Jawaban Benar!';
        feedback.style.color = 'green';
    } else {
        feedback.innerText = 'Jawaban Salah!';
        feedback.style.color = 'red';
    }

    feedback.classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.tekaTekiSulit.length) {
        currentLetterIndex = 0;
        showQuestion();
    } else {
        document.getElementById('feedback-container').innerText = 'Permainan Selesai!';
        document.getElementById('next-btn').classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', showQuestion);
