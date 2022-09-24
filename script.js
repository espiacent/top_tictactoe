//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    let gameover = false;
    let player = 'player';
    let brain = 'stupid';
    let emptyfields = [];

    const playermove = (e) => {
        console.log('playermove');
        gamePlay.player = 'player';
        gamePlay.gameover = false;
        if (gameBoard.fields[e.target.id.at(-1)] == '') {
            gameBoard.fields[e.target.id.at(-1)] = 'x';
            gameBoard.update();
            const page = document.querySelector('body');
            page.style.pointerEvents = 'none'
            checkwin();
            if (gamePlay.gameover !== true) {
                pausing(1000).then(() => aimove());
            }
        }
    };

    const pausing = (time) => {
        console.log('pausing');
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const aimove = () => {
        console.log('aimove');
        gamePlay.player = 'ai';
        if (findBestMove(gameBoard.fields) == -1) {
            gamePlay.emptyfields = gameBoard.fields.map((element, index) => {
                if (element == '') {
                    return index;
                }
            }).filter(element => element >= 0);
            let random = gamePlay.emptyfields[Math.floor((Math.random() * gamePlay.emptyfields.length))];
            gameBoard.fields[random] = 'o';
        } else {
            gameBoard.fields[findBestMove(gameBoard.fields)] = 'o';
        }
        gameBoard.update();
        const page = document.querySelector('body');
        page.style.pointerEvents = 'auto'
        checkwin();
        gameBoard.update();
    };

    const checkwin = () => {
        console.log('checkwin');
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
        console.log('winmsg');
        gamePlay.gameover = true;
        const page = document.querySelector('body');
        page.style.pointerEvents = 'auto'
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
            btn.addEventListener('mouseup', () => {
                const modal = document.querySelector('.modal-outer');
                modal.classList.remove('open');
                gameBoard.reset();
            })
        }
    }

    const evaluate = () => {
        console.log('evaluate');
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            return +10;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            return -10;
        } else if (gameBoard.fields[3] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[5] == 'x') {
            return +10;
        } else if (gameBoard.fields[3] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[5] == 'o') {
            return -10;
        } else if (gameBoard.fields[6] == 'x' && gameBoard.fields[7] == 'x' && gameBoard.fields[8] == 'x') {
            return +10;
        } else if (gameBoard.fields[6] == 'o' && gameBoard.fields[7] == 'o' && gameBoard.fields[8] == 'o') {
            return -10;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[3] == 'x' && gameBoard.fields[6] == 'x') {
            return +10;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[3] == 'o' && gameBoard.fields[6] == 'o') {
            return -10;
        } else if (gameBoard.fields[1] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[7] == 'x') {
            return +10;
        } else if (gameBoard.fields[1] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[7] == 'o') {
            return -10;
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[5] == 'x' && gameBoard.fields[8] == 'x') {
            return +10;
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[5] == 'o' && gameBoard.fields[8] == 'o') {
            return -10;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[8] == 'x') {
            return +10;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[8] == 'o') {
            return -10;
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[6] == 'x') {
            return +10;
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[6] == 'o') {
            return -10;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            return +10;
        } else if (gameBoard.fields.every(field => field !== '')) {
            return 0;
        }
    };


    const minimax = (board, depth, isMax) => {
        console.log('minimax');
        let score = gamePlay.evaluate(board);

        if (score == 10)
            return score;

        if (score == -10)
            return score;

        if (score == 0)
            return score;

        if (isMax) {
            let best = -1000;

            // Traverse all cells
            for (let i = 0; i < 9; i++) {

                // Check if cell is empty
                if (board[i] == '_') {

                    // Make the move
                    board[i] = 'x';

                    // Call minimax recursively
                    // and choose the maximum value
                    best = Math.max(best, minimax(board,
                        depth + 1, !isMax));

                    // Undo the move
                    board[i] = '';
                }
            }
            console.log(board);
            console.log(best);
            return best;
        }

        // If this minimizer's move
        else {
            let best = 1000;

            // Traverse all cells
            for (let i = 0; i < 9; i++) {

                // Check if cell is empty
                if (board[i] == '') {

                    // Make the move
                    board[i] = 'o';

                    // Call minimax recursively and
                    // choose the minimum value
                    best = Math.min(best, minimax(board,
                        depth + 1, !isMax));

                    // Undo the move
                    board[i] = '';
                }
            }
            console.log(board);
            console.log(best);
            return best;
        }
    }

    // This will return the best possible
    // move for the player
    const findBestMove = (board) => {
        console.log('findbestmove');
        let bestVal = -1000;
        let bestMove = {};
        bestMove.index = -1;

        // Traverse all cells, evaluate
        // minimax function for all empty
        // cells. And return the cell
        // with optimal value.
        for (let i = 0; i < 9; i++) {

            // Check if cell is empty
            if (board[i] == '') {

                // Make the move
                board[i] = 'x';

                // compute evaluation function
                // for this move.
                let moveVal = minimax(gameBoard.fields, 0, false);

                // Undo the move
                board[i] = '';

                // If the value of the current move
                // is more than the best value, then
                // update best
                if (moveVal > bestVal) {
                    bestMove.index = i;
                    bestVal = moveVal;
                }
            }
        }

        console.log(bestMove);

        return bestMove.index;
    }

    return { playermove, evaluate, minimax, findBestMove }
})();

//GAMEBOARD UI
const gameBoard = (function () {

    // let fields = ['x', 'o', '', '', '', '', '', '', ''];
    let fields = ['', '', '', '', '', '', '', '', ''];

    const init = () => {
        console.log('init');
        gamePlay.brain = 'stupid';
        const other = document.querySelector('.stupid')
        other.classList.add('highlight');
        const board = document.querySelector('.playingboard');
        for (let i = 0; i < fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`);
            square.innerText = fields[i];
            board.appendChild(square);
        }
    }

    const update = () => {
        console.log('update');
        const board = document.querySelector('.playingboard');
        board.innerHTML = '';
        for (let i = 0; i < gameBoard.fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`);
            square.innerText = gameBoard.fields[i];
            board.appendChild(square);
        }
    };

    const reset = () => {
        console.log('reset');
        gamePlay.gameover = false;
        gamePlay.player = 'player';
        gameBoard.fields = ['', '', '', '', '', '', '', '', ''];
        fields = ['', '', '', '', '', '', '', '', ''];
        const board = document.querySelector('.playingboard');
        board.innerHTML = '';
        for (let i = 0; i < fields.length; i++) {
            const square = document.createElement('div');
            square.classList.add('playingfield');
            square.setAttribute('id', `field-${i}`);
            square.innerText = fields[i];
            board.appendChild(square);
        }
    };

    return { fields, init, reset, update }

})();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', gameBoard.init)

const board = document.querySelector('.playingboard');
board.addEventListener('mouseup', gamePlay.playermove);

const choicebtn = document.querySelector('.choicebtn');
choicebtn.addEventListener('mouseup', highlight);

function highlight(e) {
    if (e.originalTarget.className == 'stupid') {
        e.originalTarget.classList.add('highlight');
        const other = document.querySelector('.smart')
        other.classList.remove('highlight');
        gamePlay.brain = 'stupid';
        gameBoard.reset();

    } if (e.originalTarget.className == 'smart') {
        e.originalTarget.classList.add('highlight');
        const other = document.querySelector('.stupid')
        other.classList.remove('highlight');
        gamePlay.brain = 'smart';
        gameBoard.reset();
    }
}
