function id(id) { return document.getElementById(id)}
for (let i = 0; i < 5; i++) {
    let cross = document.createElement("img");
    let circle = document.createElement("img");
    cross.setAttribute("src", "assets/images/cross.png");
    circle.setAttribute("src", "assets/images/circle.png");
    cross.setAttribute("class", "peice");
    circle.setAttribute("class", "peice");
    id("cross").appendChild(cross);
    id("circle").appendChild(circle);
}

let turn;
let turns = 0;
let grid = {
    rows:[["", "", ""], ["", "", ""], ["", "", ""]],
    cols:[["", "", ""], ["", "", ""], ["", "", ""]]
};

let num = Math.round(Math.random());
if (num == 0) {
    console.log("Player starts");
    id("info").innerHTML = "You Start";
    var list = document.getElementById("circle");   
    list.removeChild(list.childNodes[list.childNodes.length-1]);
    turn = 0;
}
else {
    console.log("AI starts");
    id("info").innerHTML = "AI starts";
    var list = document.getElementById("cross");   
    list.removeChild(list.childNodes[list.childNodes.length-1]);
    turn = 1;
}

if (num == 1) {
    ai();
}

function ai() {
    let count = 0;
    let c = setInterval(function() {
        id("aiText").innerHTML += ".";
        count++;
        if (count == 3) {
            clearInterval(c);
            aiTurn();
        }
    }, 100); 
}
function aiTurn() {
    let avail = [];
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (grid.rows[i][j] == "") {
                avail.push([i, j]);
            }
        }
    }
    //Decide which available position to play here: (random for now)
    let pos = Math.floor(Math.random() * avail.length);
    let a = avail[pos][0];
    let b = avail[pos][1];
    //console.log(a, b);
    grid.rows[a][b] = "O";
    grid.cols[b][a] = "O";
    let cell = b + (3 * a) + 1;
    //console.log(cell);
    id("img" + cell).setAttribute("src", "assets/images/circle.png");
    turns++;
    if (turns == 9) {
        console.log("GAMEOVER");
        id("stat").innerHTML = "GAMEOVER";
    }
    if (!check()) {
        var list = document.getElementById("circle");   
        list.removeChild(list.childNodes[list.childNodes.length-1]);
        if (turn == 1) turn = 0;
        id("info").innerHTML = "Your Turn";
        id("aiText").innerHTML = "AI";
    }
}
function sel(cell) {
    if (turn == 0) {
        let col = (cell - 1) % 3;
        let row = Math.floor((cell - 1) / 3);
        if (grid.rows[row][col] == "") {
            id("img" + cell).setAttribute("src", "assets/images/cross.png");
            grid.rows[row][col] = "X";
            grid.cols[col][row] = "X";
            turns++;
            if (turns == 9) {
                console.log("GAMEOVER");
                id("stat").innerHTML = "GAMEOVER";
            }
            if (!check()) {
                var list = document.getElementById("cross");   
                list.removeChild(list.childNodes[list.childNodes.length-1]);
                if (turn != -1) {
                    turn = 1;
                    id("info").innerHTML = "AI TURN";
                    ai();
                }
            }
        }
        else {
            console.log("UR A CHEATER GET OUTTA HERE");
            id("stat").innerHTML = "You Cannot Do That You CHEATER";
        }
    }
}

function check() {
    grid.rows.forEach(e => {
       if(e[0] == e[1] && e[1] == e[2] && e[0] != "") {
            if (e[0] == "X") id("stat").innerHTML = "PLAYER WINS - ROWS";
            else id("stat").innerHTML = "AI WINS - ROWS";
            turn = -1;
            return true;
       } 
    });
    grid.cols.forEach(e => {
       if(e[0] == e[1] && e[1] == e[2] && e[0] != "") {
            if (e[0] == "X") id("stat").innerHTML = "PLAYER WINS - COLS";
            else id("stat").innerHTML = "AI WINS - COLS";
            turn = -1;
            return true;
       } 
    });
    if (grid.rows[1][1] != "") {
         if(grid.rows[0][0] == grid.rows[1][1] && grid.rows[1][1] == grid.rows[2][2] || grid.rows[0][2] == grid.rows[1][1] && grid.rows[1][1] == grid.rows[2][0]) {
            if (grid.rows[1][1] == "X") id("stat").innerHTML = "PLAYER WINS - DIAGS";
            else id("stat").innerHTML = "AI WINS - DIAGS";
            turn = -1;
            return true;
        } 
    }
    return false;
}