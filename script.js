(function () {

    const filledFields = ['x', 'x', 'o', 'x', 'o', 'x', 'o', 'o', 'x'];

    document.addEventListener('DOMContentLoaded', () => {
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < filledFields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute("id", `field-${i}`)
            const fill = document.createElement('span');
            fill.classList.add(`field-${i}`);
            fill.innerHTML = filledFields[i];
            square.appendChild(fill);
            board.appendChild(square);
        }
    });

    function changeField(e) {
        filledFields[e.target.id.at(-1)] = 'x';
        const fields = document.querySelectorAll('.playingfield');
        fields.forEach((field) => { field.remove() })
        updateFields();
    };

    function updateFields() {
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < filledFields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute("id", `field-${i}`)
            const fill = document.createElement('span');
            fill.classList.add(`field-${i}`);
            fill.innerHTML = filledFields[i];
            square.appendChild(fill);
            board.appendChild(square);
        }
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