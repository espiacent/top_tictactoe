//GAMEBOARD UI
const gameBoard = (function () {

    let fields = ['', '', '', '', '', '', '', '', ''];
    let player = 1;

    const init = () => {
        player = 1;
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < gameBoard.fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`);
            square.textContent = fields[i];
            board.appendChild(square);
        }
    }

    const move = (e) => {
        if (player == 1) {
            if (gameBoard.fields[e.target.id.at(-1)] == '') {
                gameBoard.fields[e.target.id.at(-1)] = 'x';
                player = 2;
                const oldFields = document.querySelectorAll('.playingfield');
                oldFields.forEach((oldfield) => { oldfield.remove() })
                update();
                gamePlay.checkwin();
            }
        }
        if (player == 2) {
            if (gameBoard.fields[e.target.id.at(-1)] == '') {
                gameBoard.fields[e.target.id.at(-1)] = 'o';
                player = 1;
                const oldFields = document.querySelectorAll('.playingfield');
                oldFields.forEach((oldfield) => { oldfield.remove() })
                update();
                gamePlay.checkwin();
            }
        }
    };

    const update = () => {
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < gameBoard.fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`);
            square.textContent = fields[i];
            board.appendChild(square);
        }
    };

    const reset = () => {
        window.location.reload();
    };

    return { fields, init, move, reset }

})();

//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    const checkwin = () => {
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[3] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[5] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[3] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[5] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[6] == 'x' && gameBoard.fields[7] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[6] == 'o' && gameBoard.fields[7] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[3] == 'x' && gameBoard.fields[6] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[3] == 'o' && gameBoard.fields[6] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[1] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[7] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[1] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[7] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[5] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[5] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[6] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[6] == 'o') {
            winmsg('o');
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            winmsg('x');
        } else if (gameBoard.fields.every(field => field !== '')) {
            winmsg('draw');
        }
    };

    const winmsg = (player) => {
        if (player == 'draw') {
            // show modal
            const modal = document.querySelector('.modal-outer');
            const header = document.querySelector('.modal-header');
            header.textContent = 'Round draw';
            modal.classList.add('open');
            // modal button
            const btn = document.querySelector('.playbtn');
            btn.addEventListener('click', () => {
                const modal = document.querySelector('.modal-outer');
                modal.classList.remove('open');
                gameBoard.reset();
            })
        } else {
            // show modal
            const modal = document.querySelector('.modal-outer');
            const header = document.querySelector('.modal-header');
            header.textContent = `${player} wins!`;
            modal.classList.add('open');
            // modal button
            const btn = document.querySelector('.playbtn');
            btn.addEventListener('click', () => {
                const modal = document.querySelector('.modal-outer');
                modal.classList.remove('open');
                gameBoard.reset();
            })
        }
    };
    return { checkwin }
})();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', gameBoard.init)

const board = document.querySelector('.playingboard');
board.addEventListener('click', gameBoard.move);
