//GAMEBOARD UI
const gameBoard = (function () {

    let fields = ['', '', '', '', '', '', '', '', ''];
    let player = 1;

    const init = () => {
        gameBoard.player = 1;
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
        if (gameBoard.player == 1) {
            console.log('player1');
            if (gameBoard.fields[e.target.id.at(-1)] == '') {
                gameBoard.fields[e.target.id.at(-1)] = 'x';
                gameBoard.player = 2;
                const oldFields = document.querySelectorAll('.playingfield');
                oldFields.forEach((oldfield) => { oldfield.remove() })
                update();
                gamePlay.checkwin();
            }
        }
        if (gameBoard.player == 2) {
            console.log('player2');
            if (gameBoard.fields[e.target.id.at(-1)] == '') {
                gameBoard.fields[e.target.id.at(-1)] = 'o';
                gameBoard.player = 1;
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

    return { fields, init, move, update, reset, player }

})();

//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    const checkwin = () => {
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            winmsg('x');
        } if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            winmsg('o');
        }
    };

    const winmsg = (player) => {
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
    };
    return { checkwin, winmsg }
})();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', gameBoard.init)

const board = document.querySelector('.playingboard');
board.addEventListener('click', gameBoard.move);

// const gameBoard = (function () {

//     const assets = () => {
//         const board = ['x', 'x', 'o', 'x', 'o', 'x', 'o', 'o', 'x'];
//         const playerOne = '';
//         const playerTwo = '';
//         return board, playerOne, playerTwo;
//     };

//     function fillBoard() {
//         const board = ['x', 'x', 'o', 'x', 'o', 'x', 'o', 'o', 'x'];
//         const square = document.createElement('span');
//         const field = document.querySelector('.playing-field');
//         board.forEach((field) => {
//             square.innerHTMl += field;
//         });
//         field.appendChild(square);

//     };
//     return { assets, fillBoard }
// })();