//GAMEBOARD UI
const gameBoard = (function () {

    let fields = ['', '', '', '', '', '', '', '', ''];

    const init = () => {
        console.log('init')
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute("id", `field-${i}`)
            square.textContent = fields[i];
            board.appendChild(square);
        }
    }

    const click = (e) => {
        console.log('click')
        if (fields[e.target.id.at(-1)] === '' || fields[e.target.id.at(-1)] === 'o') {
            fields[e.target.id.at(-1)] = 'x';
            const oldFields = document.querySelectorAll('.playingfield');
            oldFields.forEach((oldfield) => { oldfield.remove() })
            update();
            gamePlay.checkwin();
        } else {
            fields[e.target.id.at(-1)] = 'o';
            const oldFields = document.querySelectorAll('.playingfield');
            oldFields.forEach((oldfield) => { oldfield.remove() })
            update();
            gamePlay.checkwin();
        }
    };

    const update = () => {
        console.log('update')
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`)
            square.textContent = fields[i];
            board.appendChild(square);
        }
    };

    const reset = () => {
        window.location.reload();
    };

    return { fields, init, click, update, reset }

})();

//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    const checkwin = () => {
        console.log('checkwin')
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            winmsg('x');
        } if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            winmsg('o');
        }
    };

    const winmsg = (player) => {
        const modal = document.querySelector('.modal-outer');
        const header = document.querySelector('.modal-header');
        header.textContent = `${player} wins!`;
        modal.classList.add('open');
        console.log('winmsg')
        console.log(`yeah, ${player} wins`)
    };
    return { checkwin, winmsg }
})();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', gameBoard.init)

const board = document.querySelector('.playingboard');
board.addEventListener('click', gameBoard.click);

const btn = document.querySelector('.playbtn');
btn.addEventListener('click', closeModal)

function closeModal() {
    const modal = document.querySelector('.modal-outer');
    modal.classList.remove('open');
    gameBoard.reset();
}


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