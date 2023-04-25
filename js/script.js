const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('#restart-button');
const tryAgainMessage = document.querySelector('.try-again-message');



// função para exibir a mensagem "TENTE NOVAMENTE"
const showTryAgainMessage = () => {
    tryAgainMessage.style.display = 'block'; // torna a mensagem visível
    mario.style.display = 'none'; // esconde o personagem Mario
    restartButton.style.display = 'block'; // exibe o botão de reinício
    clearInterval(loop); // para a animação do jogo
  }

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const audio = new Audio('song.mp3');

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 80) {
        showTryAgainMessage(); // chama a função para exibir a mensagem

        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        audio.pause();
        restartButton.style.display = 'block'; // exibe o botão de reinício
        
    }

}, 10);


document.addEventListener('keydown', () => {
    jump();
    audio.play();
});

restartButton.addEventListener('click', () => {
    window.location.reload(); // recarrega a página para reiniciar o jogo
});
