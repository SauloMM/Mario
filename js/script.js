const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('#restart-button');
const tryAgainMessage = document.querySelector('.try-again-message');

const audioJump = new Audio('pulo.mp3');
const audioSong = new Audio('song.mp3');
const audioGameOver = new Audio('game-over.mp3');

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

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'game-over.png'
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'

    // Adiciona o som de Game Over
    
    audioSong.pause(); // Pausa a música "song.mp3"
    audioGameOver.play(); // Toca a música "game-over.mp3"
  }
}, 10);

document.addEventListener('keydown', () => {
  jump();
  audioSong.play();
});
