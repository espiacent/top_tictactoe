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
        gamePlay.emptyfields = gameBoard.fields.map((element, index) => {
            if (element == '') {
                return index;
            }
        }).filter(element => element >= 0);
        // let random = gamePlay.emptyfields[Math.floor((Math.random() * gamePlay.emptyfields.length))];
        // gameBoard.fields[random] = 'o';
        // gameBoard.update();
        // const page = document.querySelector('body');
        // page.style.pointerEvents = 'auto'
        checkwin();
        //minmax invocation
        gameBoard.update();
    };


    const checkwin = () => {
        console.log('checkwin');
        if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[1] == 'o' && gameBoard.fields[2] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[3] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[5] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[3] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[5] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[6] == 'x' && gameBoard.fields[7] == 'x' && gameBoard.fields[8] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[6] == 'o' && gameBoard.fields[7] == 'o' && gameBoard.fields[8] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[3] == 'x' && gameBoard.fields[6] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[3] == 'o' && gameBoard.fields[6] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[1] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[7] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[1] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[7] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[5] == 'x' && gameBoard.fields[8] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[5] == 'o' && gameBoard.fields[8] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[8] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[0] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[8] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[2] == 'x' && gameBoard.fields[4] == 'x' && gameBoard.fields[6] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields[2] == 'o' && gameBoard.fields[4] == 'o' && gameBoard.fields[6] == 'o') {
            // winmsg('o');
            return true;
        } else if (gameBoard.fields[0] == 'x' && gameBoard.fields[1] == 'x' && gameBoard.fields[2] == 'x') {
            // winmsg('x');
            return true;
        } else if (gameBoard.fields.every(field => field !== '')) {
            // winmsg('draw');
            return true;
        } else {
            return false;
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
    };

    const getBestMove = (gameBoard.fields, maximizing = true, callback = () => { }, depth = 0) => {
    //clear nodesMap if the function is called for a new move
    if (depth == 0) this.nodesMap.clear();

    //If the board state is a terminal one, return the heuristic value
    if (checkwin() || depth === this.maxDepth) {
        if (board.isTerminal().winner === 'x') {
            return 100 - depth;
        } else if (checkwin().winner === 'o') {
            return -100 + depth;
        }
        return 0;
    }
    if (maximizing) {
        //Initialize best to the lowest possible value
        let best = -100;
        //Loop through all empty cells
        board.getAvailableMoves().forEach(index => {
            //Initialize a new board with a copy of our current state 
            const child = new Board([...board.state]);
            //Create a child node by inserting the maximizing symbol x into the current empty cell
            child.insert('x', index);
            //Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
            const nodeValue = this.getBestMove(child, false, callback, depth + 1);
            //Updating best value
            best = Math.max(best, nodeValue);

            //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
            if (depth == 0) {
                //Comma separated indices if multiple moves have the same heuristic value
                const moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${index}` : index;
                this.nodesMap.set(nodeValue, moves);
            }
        });
        //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
        if (depth == 0) {
            let returnValue;
            if (typeof this.nodesMap.get(best) == 'string') {
                const arr = this.nodesMap.get(best).split(',');
                const rand = Math.floor(Math.random() * arr.length);
                returnValue = arr[rand];
            } else {
                returnValue = this.nodesMap.get(best);
            }
            //run a callback after calculation and return the index
            callback(returnValue);
            return returnValue;
        }
        //If not main call (recursive) return the heuristic value for next calculation
        return best;
    }

    if (!maximizing) {
        //Initialize best to the highest possible value
        let best = 100;
        //Loop through all empty cells
        board.getAvailableMoves().forEach(index => {
            //Initialize a new board with a copy of our current state 
            const child = new Board([...board.state]);

            //Create a child node by inserting the minimizing symbol o into the current empty cell
            child.insert('o', index);

            //Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
            let nodeValue = this.getBestMove(child, true, callback, depth + 1);
            //Updating best value
            best = Math.min(best, nodeValue);

            //If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
            if (depth == 0) {
                //Comma separated indices if multiple moves have the same heuristic value
                const moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + index : index;
                this.nodesMap.set(nodeValue, moves);
            }
        });
        //If it's the main call, return the index of the best move or a random index if multiple indices have the same value
        if (depth == 0) {
            let returnValue;
            if (typeof this.nodesMap.get(best) == 'string') {
                const arr = this.nodesMap.get(best).split(',');
                const rand = Math.floor(Math.random() * arr.length);
                returnValue = arr[rand];
            } else {
                returnValue = this.nodesMap.get(best);
            }
            //run a callback after calculation and return the index
            callback(returnValue);
            return returnValue;
        }
        //If not main call (recursive) return the heuristic value for next calculation
        return best;
    }
}

return { playermove, getBestMove }
}) ();

//GAMEBOARD UI
const gameBoard = (function () {

    let fields = ['o', 'o', '', 'x', '', '', 'x', '', ''];

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