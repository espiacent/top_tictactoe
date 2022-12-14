//GAMEPLAY FUNCTIONS
const gamePlay = (function () {

    const playermove = (e) => {
        gamePlay.gameover = false;
        if (gameBoard.fields[e.target.id.at(-1)] == '') {
            gameBoard.fields[e.target.id.at(-1)] = 'x';
            gameBoard.update();
            const audio1 = document.getElementById('audio1');
            audio1.volume = 0.7;
            audio1.play();
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
        if (brain == 0) {
            if (Math.random() < 0.5) {
                gameBoard.fields[findbestmove(gameBoard.fields)] = 'o';
            } else {
                gamePlay.emptyfields = gameBoard.fields.map((element, index) => {
                    if (element == '') {
                        return index;
                    }
                }).filter(element => element >= 0);
                let random = gamePlay.emptyfields[Math.floor((Math.random() * gamePlay.emptyfields.length))];
                gameBoard.fields[random] = 'o';
            }
        }
        if (brain == 1) {
            if (Math.random() < 0.8) {
                gameBoard.fields[findbestmove(gameBoard.fields)] = 'o';
            } else {
                gamePlay.emptyfields = gameBoard.fields.map((element, index) => {
                    if (element == '') {
                        return index;
                    }
                }).filter(element => element >= 0);
                let random = gamePlay.emptyfields[Math.floor((Math.random() * gamePlay.emptyfields.length))];
                gameBoard.fields[random] = 'o';
            }
        }
        if (brain == 2) {
            gameBoard.fields[findbestmove(gameBoard.fields)] = 'o';
        }
        gameBoard.update();
        const audio2 = document.getElementById('audio2');
        audio2.volume = 0.7;
        audio2.play();
        const page = document.querySelector('body');
        page.style.pointerEvents = 'auto'
        checkwin();
    };

    const checkwin = () => {
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            winmsg('x');
            drawLine(ctx, [20, 25], [280, 25], 'red', 4);
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            drawLine(ctx, [20, 25], [280, 25], 'red', 4);
            winmsg('o');
        } else if (gameBoard.fields[3] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[5] == 'x') {
            winmsg('x');
            drawLine(ctx, [20, 75], [280, 75], 'red', 4);
        } else if (gameBoard.fields[3] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[5] == 'o') {
            winmsg('o');
            drawLine(ctx, [20, 75], [280, 75], 'red', 4);
        } else if (gameBoard.fields[6] == 'x' && gameBoard.fields[7] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
            drawLine(ctx, [20, 125], [280, 125], 'red', 4);
        } else if (gameBoard.fields[6] == 'o' && gameBoard.fields[7] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
            drawLine(ctx, [20, 125], [280, 125], 'red', 4);
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[3] == 'x' && gameBoard.fields[6] == 'x') {
            winmsg('x');
            drawLine(ctx, [50, 20], [50, 130], 'red', 6);
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[3] == 'o' && gameBoard.fields[6] == 'o') {
            winmsg('o');
            drawLine(ctx, [50, 20], [50, 130], 'red', 6);
        } else if (gameBoard.fields[1] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[7] == 'x') {
            winmsg('x');
            drawLine(ctx, [150, 20], [150, 130], 'red', 6);
        } else if (gameBoard.fields[1] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[7] == 'o') {
            winmsg('o');
            drawLine(ctx, [150, 20], [150, 130], 'red', 6);
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[5] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
            drawLine(ctx, [250, 20], [250, 130], 'red', 6);
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[5] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
            drawLine(ctx, [250, 20], [250, 130], 'red', 6);
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[8] == 'x') {
            winmsg('x');
            drawLine(ctx, [30, 15], [260, 130], 'red', 5);
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[8] == 'o') {
            winmsg('o');
            drawLine(ctx, [30, 15], [260, 130], 'red', 5);
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[6] == 'x') {
            winmsg('x');
            drawLine(ctx, [250, 25], [40, 130], 'red', 4);
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[6] == 'o') {
            winmsg('o');
            drawLine(ctx, [250, 25], [40, 130], 'red', 4);
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
            const audio4 = document.getElementById('audio4');
            audio4.volume = 0.1;
            audio4.play();
            console.log('draw');
            const modal = document.querySelector('.modal-outer');
            const header = document.querySelector('.modal-header');
            header.textContent = 'Round draw!';
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
            const audio3 = document.getElementById('audio3');
            audio3.volume = 0.9;
            audio3.play();
            console.log('win');
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
    };

    const evaluate = (board, max) => {
        if (max == true) {
            if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') return -25;
            if (gameBoard.fields[3] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[5] == 'x') return -25;
            if (gameBoard.fields[6] == 'x' && gameBoard.fields[7] == 'x' && gameBoard.fields[8] == 'x') return -25;
            if (gameBoard.fields[0] == 'x' && gameBoard.fields[3] == 'x' && gameBoard.fields[6] == 'x') return -25;
            if (gameBoard.fields[1] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[7] == 'x') return -25;
            if (gameBoard.fields[2] == 'x' && gameBoard.fields[5] == 'x' && gameBoard.fields[8] == 'x') return -25;
            if (gameBoard.fields[0] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[8] == 'x') return -25;
            if (gameBoard.fields[2] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[6] == 'x') return -25;
            if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') return -25;
            if (gameBoard.fields.every(field => field !== '') == true) return 0;
        } else {
            if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') return 25;
            if (gameBoard.fields[3] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[5] == 'o') return 25;
            if (gameBoard.fields[6] == 'o' && gameBoard.fields[7] == 'o' && gameBoard.fields[8] == 'o') return 25;
            if (gameBoard.fields[0] == 'o' && gameBoard.fields[3] == 'o' && gameBoard.fields[6] == 'o') return 25;
            if (gameBoard.fields[1] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[7] == 'o') return 25;
            if (gameBoard.fields[2] == 'o' && gameBoard.fields[5] == 'o' && gameBoard.fields[8] == 'o') return 25;
            if (gameBoard.fields[0] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[8] == 'o') return 25;
            if (gameBoard.fields[2] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[6] == 'o') return 25;
            if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') return 25;
            if (gameBoard.fields.every(field => field !== '') == true) return 0;
        }
    };

    const findbestmove = (board) => {
        let Min = -1000;
        let Max = 1000;
        let bestval = -Infinity;
        let bestmove;
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = 'o';
                let moveval = minimax(board, 0, 0, false, Min, Max);
                board[i] = '';
                if (moveval > bestval) {
                    bestmove = i;
                    bestval = moveval;
                }
            }
        }
        return bestmove;
    };

    const minimax = (board, depth, node, max, alpha, beta) => {
        let score = evaluate(board, max);
        if (score == 25)
            return score;
        if (score == -25)
            return score;
        if (score == 0)
            return score;
        if (max == true) {
            let best = alpha;
            for (let i = 0; i < 9; i++) {
                if (board[i] == '') {
                    board[i] = 'o';
                    best = Math.max(best, minimax(board, depth + 1, node * 2 + i, false, alpha, beta));
                    alpha = Math.max(alpha, best);
                    board[i] = '';
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            let result = best - (depth * 2);
            return result;
        } else {
            let best = beta;
            for (let i = 0; i < 9; i++) {
                if (board[i] == '') {
                    board[i] = 'x';
                    best = Math.min(best, minimax(board, depth + 1, node * 2 + i, true, alpha, beta));
                    beta = Math.min(beta, best);
                    board[i] = '';
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            let result = best + (depth * 2);
            return result;
        }
    };
    return { playermove, minimax }
})();

//GAMEBOARD UI
const gameBoard = (function () {

    let fields = Array(9).fill('');

    const init = () => {
        const audio5 = document.getElementById('audio5');
        audio5.volume = 0.15;
        audio5.play();
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
    };

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gamePlay.gameover = false;
        gameBoard.fields = Array(9).fill('');
        fields = Array(9).fill('');
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
var brain = 0;
document.addEventListener('DOMContentLoaded', gameBoard.init)
const board = document.querySelector('.playingboard');
board.addEventListener('mouseup', gamePlay.playermove);
const choicebtn = document.querySelector('.choicebtn');
choicebtn.addEventListener('mouseup', highlight);

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
        ctx.lineCap = 'square';
    }
    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function highlight(e) {
    if (e.originalTarget.className == 'stupid') {
        e.originalTarget.classList.add('highlight');
        const other1 = document.querySelector('.smart')
        const other2 = document.querySelector('.smarter')
        other1.classList.remove('highlight');
        other2.classList.remove('highlight');
        brain = 0;
        gameBoard.reset();
    } if (e.originalTarget.className == 'smart') {
        e.originalTarget.classList.add('highlight');
        const other = document.querySelector('.stupid')
        const other2 = document.querySelector('.smarter')
        other.classList.remove('highlight');
        other2.classList.remove('highlight');
        brain = 1;
        gameBoard.reset();
    } if (e.originalTarget.className == 'smarter') {
        e.originalTarget.classList.add('highlight');
        const other = document.querySelector('.stupid')
        const other2 = document.querySelector('.smart')
        other.classList.remove('highlight');
        other2.classList.remove('highlight');
        brain = 2;
        gameBoard.reset();
    }
};
