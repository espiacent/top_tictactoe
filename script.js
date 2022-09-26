//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    const playermove = (e) => {
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
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const aimove = () => {
        if (window.brain == 0) {
            gamePlay.emptyfields = gameBoard.fields.map((element, index) => {
                if (element == '') {
                    return index;
                }
            }).filter(element => element >= 0);
            let random = gamePlay.emptyfields[Math.floor((Math.random() * gamePlay.emptyfields.length))];
            gameBoard.fields[random] = 'o';
        } else if (window.brain == 1) {
            gameBoard.fields[findbestmove(gameBoard.fields)] = 'o';
        }
        gameBoard.update();
        const page = document.querySelector('body');
        page.style.pointerEvents = 'auto'
        checkwin();
    };

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
        }
    };

    const findbestmove = (board) => {
        let bestval = -1000;
        let bestmove = -1;

        for (let i = 0; i < 9; i++) {

            if (board[i] == '') {
                board[i] = 'x';
                let moveval = minimax(board, 8, true);
                console.log('MOVEVAL :' + moveval);
                board[i] = '';

                if (moveval > bestval) {
                    bestmove = i;
                    bestval = moveval;
                }
            }
        }
        console.log('BEST :' + bestmove);
        return bestmove;
    }

    const minimax = (board, depth, max) => {
        let score = gamePlay.evaluate(board);

        if (score == 10)
            return score;
        if (score == -10)
            return score;
        if (gameBoard.fields.every(field => field !== '') == true) return 0;
        if (max == true) {
            let best = -Infinity;

            for (let i = 0; i < 9; i++) {

                if (board[i] == '') {
                    board[i] = 'x';
                    best = Math.max(best, minimax(board, depth - 1, false));
                    board[i] = '';
                }
            }
            let result = best - depth;
            console.log('MAX:' + result);
            return result;
        }
        else if (max == false) {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {

                if (board[i] == '') {
                    board[i] = 'o';
                    best = Math.min(best, minimax(board, depth - 1, true));
                    board[i] = '';
                }
            }
            let result = best + depth;
            console.log('MIN:' + result);
            return result;
        }
    }
    return { playermove, evaluate, minimax, findbestmove }
})();

//GAMEBOARD UI
const gameBoard = (function () {

    let fields = ['', '', '', '', '', '', '', '', ''];

    const init = () => {
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
        gamePlay.gameover = false;
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
window.brain = 0;

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
        window.brain = 0;
        gameBoard.reset();

    } if (e.originalTarget.className == 'smart') {
        e.originalTarget.classList.add('highlight');
        const other = document.querySelector('.stupid')
        other.classList.remove('highlight');
        window.brain = 1;
        gameBoard.reset();
    }
}
