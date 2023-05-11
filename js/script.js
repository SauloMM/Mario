const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('#restart-button');
const tryAgainMessage = document.querySelector('.try-again-message');
const score = document.querySelector('.score');
const audioJump = new Audio('pulo.mp3');
const audioSong = new Audio('song.mp3');
const audioGameOver = new Audio('game-over.mp3');
const easyButton = document.getElementById('easy');
const hardButton = document.getElementById('hard');
const coin = document.querySelector('.coin');
let coinPosition = 0;
const coinSpeed = 5; // pixels per interval
const intervalTime = 50; // milliseconds

function moveCoin() {
  coinPosition += coinSpeed;
  coin.style.left = coinPosition + 'px';
  // Check for collision with character here
}

setInterval(moveCoin, intervalTime);

let difficulty = 'easy'; // começa com dificuldade fácil por padrão

easyButton.addEventListener('click', () => {
  difficulty = 'easy';
});

hardButton.addEventListener('click', () => {
  difficulty = 'hard';
});


let pipeSpeed = 7; // define a velocidade do cano

// função para exibir a mensagem "TENTE NOVAMENTE"
const showTryAgainMessage = () => {
  tryAgainMessage.style.display = 'block'; // torna a mensagem visível
  mario.style.display = 'none'; // esconde o personagem Mario
  restartButton.style.display = 'block'; // exibe o botão de reinício
  clearInterval(loop); // para a animação do jogo
};

const jump = () => {
  mario.classList.add('jump');
  audioJump.play(); // Adiciona o som ao pular

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

const updateScore = () => {
  let currentScore = parseInt(score.textContent);
  score.textContent = ++currentScore;
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'facada.png'
    mario.style.width = '100px'
    mario.style.marginLeft = '75px'

    // Adiciona o som de Game Over
    
    audioSong.pause(); // Pausa a música "song.mp3"
    audioGameOver.play(); // Toca a música "game-over.mp3"
    
    showTryAgainMessage();
  }

  if (pipePosition <= -100) { // quando o cano sair do quadro
    pipe.style.left = '100%';
    updateScore(); // atualiza a pontuação
  } else {
    pipe.style.left = `${pipePosition - pipeSpeed}px`; // movimenta o cano para a esquerda
  }
}, 10);

document.addEventListener('keydown', () => {
  jump();
  audioSong.play();
});
