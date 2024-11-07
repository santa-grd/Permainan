const levels = [
    {
        question: 'Apa gambar ini?', 
        imageUrl: "img/lv1.jpg",
        htc1: "kucing",
        visiblePieces: [1, 2] 
    },
    {
        question: 'Apa gambar ini?', 
        imageUrl: "img/lv2.jpg",
        htc1: "oraquat",
        visiblePieces: [7, 8, 9] 
    },
    {
        question: 'Apa gambar ini?', 
        imageUrl: "img/lv3.jpg",
        htc1: "lufy",
        visiblePieces: [1, 9] 
    },
    {
        question: 'Apa gambar ini?', 
        imageUrl: "img/lv4.jpg",
        htc1: "Kuli",
        visiblePieces: [1, 9] 
    },

];

let currentLevel = 0;
let visiblePieceIndex = -1; 


function loadImagePieces() {
    const levelData = levels[currentLevel];

    const questionContainer = document.getElementById("question-container");
    questionContainer.textContent = levelData.question;  

    const imageUrl = levelData.imageUrl;
    const visiblePieces = levelData.visiblePieces;
    const pieces = document.querySelectorAll('.image-piece');

    pieces.forEach((piece, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        if (visiblePieces.includes(index + 1)) { 
            piece.style.backgroundImage = `url(${imageUrl})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            piece.classList.add('image-visible');
        } else {
            piece.style.backgroundImage = 'none';
            piece.classList.remove('image-visible');
        }
    });

    document.getElementById("user-answer").value = "";
    document.getElementById("feedback-container").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("submit-btn").classList.remove("hidden");
    document.getElementById("level-number").textContent = currentLevel + 1;
}

function checkAnswer() {
    const userAnswer = document.getElementById("user-answer").value.toLowerCase();
    const feedbackContainer = document.getElementById("feedback-container");

    if (userAnswer === levels[currentLevel].htc1) {
        const pieces = document.querySelectorAll('.image-piece');
        pieces.forEach((piece, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;

            piece.style.backgroundImage = `url(${levels[currentLevel].imageUrl})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            piece.classList.add('image-visible');
        });

        feedbackContainer.textContent = "Jawaban Benar!";
        feedbackContainer.classList.remove("hidden");

        document.getElementById("submit-btn").classList.add("hidden");

        if (currentLevel < levels.length - 1) {
            document.getElementById("next-btn").classList.remove("hidden");
        } else {
            feedbackContainer.textContent += " Selamat, kamu telah menyelesaikan semua level!";
        }
    } else {
        feedbackContainer.textContent = "Jawaban Salah. Coba lagi!";
        feedbackContainer.classList.remove("hidden");
    }
}

function nextLevel() {
    currentLevel++;
    loadImagePieces();
}

window.onload = loadImagePieces;