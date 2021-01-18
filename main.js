function id(id) {return document.getElementById(id)}

let grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const player = "O";
const ai = "X";
let turn = player;
var blocks = document.querySelectorAll('.block');
blocks.forEach(e => {
    e.addEventListener('mouseover', mouseOver);
    e.addEventListener('mouseout', mouseOut);
    e.addEventListener('mousedown', mouseDown);
});

function mouseOver(e) {
    if (checkEmpty(e.target.id)) {
        e.target.innerHTML = "O";
    }
}

function mouseOut(e) {
    if (checkEmpty(e.target.id)) {
        e.target.innerHTML = "";
    }
}

function mouseDown(e) {
    if (checkEmpty(e.target.id) && turn == player) {
        e.target.innerHTML = "O";
        let int = e.target.id
        grid[int.charAt(int.length - 1)] = "O";
        if (checkWin(grid, player, 0)) {
            alert(player + " Wins")
            end(); 
        }
        else if (checkTie()) {
            alert("Gameover - Tie");
            end();
        }
        else {
            turn = ai;
            let chance = Math.floor(Math.random() * Math.floor(5));
            let daBestMove;
            if (chance == 2) {
                let empty = emptySquares();
                daBestMove = empty[Math.floor(Math.random() * Math.floor(emptySquares.length))];
                console.log(daBestMove);
            }
            else {
                daBestMove = bestMove();  
            }
            aiTurn(daBestMove); 
        }
    }
}


startGame();
function startGame() {
    turn = player;
    grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 9; i++) { id("block_" + i).innerHTML = "";}
}

function checkEmpty(index) {
    let empty = emptySquares(); 
    if (empty.includes(parseInt(index.charAt(index.length - 1)))) {
        return true;
    }
    return false;
}

function emptySquares() {
	return grid.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0) {
        return true;
    }
    return false;
}

function checkWin(board, play, type) {
	let plays = board.reduce((a, e, i) =>
		(e === play) ? a.concat(i) : a, []);
	let gameWon = false;
    let game = null;
	for (let [index, win] of wc.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = true;
            game = {index: index, player: play};
			break;
		}
	}
    if (gameWon && type == 0) {
        return gameWon;  
    }
    else {
        return game;
    }
}

function bestMove() { 
    return minimax(grid, ai).index;   
}

function minimax(newBoard, turn) {
    var availSpots = emptySquares();
    
    if (checkWin(newBoard, player)) {
        return {score: -10};
    } else if (checkWin(newBoard, ai)) {
        return {score: 10};
    } else if (availSpots.length === 0) {
        return {score: 0};
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = turn;

        if (turn === ai) {
			var result = minimax(newBoard, player);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, ai);
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;
		moves.push(move);     
    }
    
    var bestMove;
	if(turn === ai) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

function aiTurn(move) {
    grid[move] = "X";
    id("block_" + move).innerHTML = "X";
    if (checkWin(grid, ai, 0)) {
        alert(ai + " Wins")
        end(); 
    }
    else if (checkTie()) {
        alert("Gameover - Tie");
        end();
    }
    else {
        turn = player;
    }
}

function end() {
    
}