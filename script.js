let gameStarted = false;
let timeLeft = 15;
let score = 0;
let countdownInterval;
let gameInterval;
let scores = [];

function countdown() {
    if (timeLeft > 0) {
        countdownInterval = setTimeout(() => {
            timeLeft--;
            document.querySelector('.timer').textContent = timeLeft;
            countdown();
        }, 1000);
    } else {
        endGame();
    }
}

const gameContainer = document.querySelector('.game-container');

function createMoleHole() {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.addEventListener('click', () => bonk(hole));
    return hole;
}

function bonk(hole) {
    const mole = hole.querySelector('.mole');
    if (mole) {
        mole.remove();
        score++;
        updateScore();
    }
}

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function startGame() {
    gameInterval = setInterval(() => {
        const hole = randomHole();
        const mole = document.createElement('div');
        mole.classList.add('mole');
        const existingMole = hole.querySelector('.mole');
        if (!existingMole) {
            hole.innerHTML = '';
            hole.appendChild(mole);
            setTimeout(() => {
                hole.innerHTML = '';
            }, 450);
        }
    }, 1000);
}

function updateScore() {
    document.querySelector('.score').textContent = score;
}

const holes = Array(9).fill().map(createMoleHole);
holes.forEach(hole => gameContainer.appendChild(hole));

const scoreContainer = document.createElement('div');
scoreContainer.classList.add('score');
scoreContainer.textContent = '0';
gameContainer.appendChild(scoreContainer);

function resetGame() {
    timeLeft = 15;
    score = 0;
    updateScore();
    document.querySelector('.timer').textContent = timeLeft;
    gameStarted = false;
    clearInterval(countdownInterval);
    clearInterval(gameInterval);

    displayTopScores();
}

function endGame() {
    scores.push(score);
    const scoreString = score >= 10 && score <= 15 ? `Muito bom!\nSua pontuação foi: ${score}` : `Você pode fazer melhor! Sua pontuação foi: ${score}`;
    alert(scoreString);
    resetGame();
    document.getElementById('startButton').textContent = 'Iniciar';

    displayTopScores();
}


function displayTopScores() {
    const topScores = [...scores].sort((a, b) => b - a).slice(0, 3);

    const scoresList = document.querySelector('.scores');
    scoresList.innerHTML = '';

    topScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `Top ${index + 1}: ${score} pontos`;
        scoresList.appendChild(li);
    });
}

function updateScoreboard() {
    const scoresList = document.querySelector('.scores');
    scoresList.innerHTML = '';

    scores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `Rodada ${index + 1}: ${score} pontos`;
        scoresList.appendChild(li);
    });
}

document.getElementById('startButton').addEventListener('click', () => {
    if (!gameStarted || timeLeft < 15) {
        document.getElementById('startButton').textContent = 'Recomeçar';
    }

    resetGame();
    gameStarted = true;
    countdown();
    startGame();
});
