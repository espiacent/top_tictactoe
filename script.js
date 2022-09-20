(function () {

    let filledFields = ['', '', '', '', '', '', '', '', ''];

    document.addEventListener('DOMContentLoaded', () => {
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < filledFields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute("id", `field-${i}`)
            square.textContent = filledFields[i];
            board.appendChild(square);
        }
    });

    function changeField(e) {
        if (filledFields[e.target.id.at(-1)] === '' || filledFields[e.target.id.at(-1)] === 'o') {
            filledFields[e.target.id.at(-1)] = 'x';
            const oldFields = document.querySelectorAll('.playingfield');
            oldFields.forEach((oldfield) => { oldfield.remove() })
            updateFields();
            checkWin();
        } else {
            filledFields[e.target.id.at(-1)] = 'o';
            const oldFields = document.querySelectorAll('.playingfield');
            oldFields.forEach((oldfield) => { oldfield.remove() })
            updateFields();
            checkWin();
        }
    };

    function updateFields() {
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < filledFields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`)
            square.textContent = filledFields[i];
            board.appendChild(square);
        }
    };

    function checkWin() {
        if (filledFields[0] == 'x' && filledFields[1] == 'x' && filledFields[2] == 'x') {
            winMsg('x');
        } if (filledFields[0] == 'o' && filledFields[1] == 'o' && filledFields[2] == 'o') {
            winMsg('o');
        }
    };

    function winMsg(player) {
        console.log(`yeah, ${player} wins`)
        filledFields = ['', '', '', '', '', '', '', '', ''];
        updateFields();
    };

    const board = document.querySelector('.playingboard');
    board.addEventListener('click', changeField);

})();

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