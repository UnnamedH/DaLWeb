let i = 1;
let n = 1;
let o = 1;
let hor = true;
let count = 0;
let playerOverride = false;

const R = 5;
const C = 7;
const Rp = R + 1;
const Cp = C + 1;
let room;
let playerNumber;
let enabled = false;

const socket = io("http://127.0.0.1:3000", {
  withCredentials: true,
});

const gameScreen = document.getElementById("gameScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const codeText = document.getElementById("codeText");
const pTurnText = document.getElementById("pTurnText");
const p1text = document.getElementById("p1scoreText");
const p2text = document.getElementById("p2scoreText");
const codeInput = document.getElementById("codeInput");
const connectioDiv = document.getElementById("connectioDiv");
const waitDiv = document.getElementById("waitDiv");
const youAreDiv = document.getElementById("youAreDiv");

let playerColor;
let playerDarkColor;

getBtnNums();
function getBtnNums() {
  let U1 = 2 * (R * C + (C - 1));
  let U2 = 2 * (Rp * Cp - C);

  if (U1 == U2) numofbtns = U1;
  else if (U1 != U2) {
    numofbtns = U1 + (U2 - U1) / 2;
  }
}

for (let h = 0; h < R; h++) {
  CreateElements();
}
CreateEndRow();

// FORMULA
// 2 (R * C + (C - 1))
// OR
// 2 (R' * C' - C) // Where R' = R + 1 and C' = C + 1
// IF BOTH GIVE THE SAME ANSWER THEN THE ANSWER IS CORRECT
// IF BOTH GIVE DIFFERENT ANSWERS THEN THE ANSWER IS
// #1 + (#2 - #1) / 2

socket.on("test", handleTest);
socket.on("update", handleUpdate);
socket.on("gameCode", handleGameCode);
socket.on("init", handleInit);
socket.on("start", handleStart);

function handleStart() {
  enabled = true;
}

function init() {
  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";
  youAreDiv.innerHTML = `You are Player ${playerNumber} (${playerColor.toUpperCase()})`;

  codeText.innerHTML = `The Code is: ${room}`;
}

function handleInit(number, p) {
  console.log("called");
  playerNumber = number;

  if (playerNumber == 1) {
    playerColor = "red";
    playerDarkColor = "darkred";
  }
  if (playerNumber == 2) {
    playerColor = "blue";
    playerDarkColor = "darkblue";
  }

  init();
}

function handleTest() {
  console.log("tested");
  connectionDiv.innerHTML = "Connected";
  waitDiv.style.display = "none";
}

function handleGameCode(gameCode) {
  room = gameCode;
}

function handleUpdate(state) {
  console.log(state.board);

  p1text.innerHTML = `P1: ${state.p1score}`;
  p2text.innerHTML = `P2: ${state.p2score}`;

  if (state.player == 1) {
    pTurnText.innerHTML = "P1";
    pTurnText.style.color = "red";
  } else if (state.player == 2) {
    pTurnText.innerHTML = "P2";
    pTurnText.style.color = "blue";
  }

  for (let index = 1; index < state.board.length + 1; index++) {
    let ch = state.board.charAt(index - 1);

    if (ch == "X") {
      btn = document.getElementById("btn" + index);
      btn.style.background = "gray";
    } else if (ch == "R") {
      btn = document.getElementById("btn" + index);
      btn.style.background = "red";
    } else if (ch == "B") {
      btn = document.getElementById("btn" + index);
      btn.style.background = "blue";
    }
  }

  for (let index = 1; index < state.space.length + 1; index++) {
    let spc;
    let ch = state.space.charAt(index - 1);

    if (ch == "X") {
      spc = document.getElementById("spc" + index);
      spc.style.background = "rgb(64, 64, 64)";
    } else if (ch == "R") {
      spc = document.getElementById("spc" + index);
      spc.style.background = "darkred";
      spc.innerHTML = "P1";
    } else if (ch == "B") {
      spc = document.getElementById("spc" + index);
      spc.style.background = "darkblue";
      spc.innerHTML = "P2";
    }
  }
}

function menuClicked(sender) {
  console.log(sender);
  if (sender == "createGameBtn") {
    socket.emit("newGame");
  } else if (sender == "joinGameBtn") {
    socket.emit("joinGame", codeInput.value);
  }
}

function clicked(sender) {
  if (!enabled) return;

  let btn = document.getElementById(sender);

  if (btn.style.background != "red" && btn.style.background != "blue") socket.emit("clicked", sender, room, playerNumber);
}

function UpdateScoreBoard() {
  p1text.innerHTML = `P1:${p1score}`;
  p2text.innerHTML = `P2:${p2score}`;
}

function CreateElements() {
  if (hor) {
    let div = document.createElement("div");
    div.className = `container c${i}`;
    i++;

    for (let j = 0; j < C; j++) {
      let btn = document.createElement("button");
      btn.id = `btn${n}`;
      n++;
      if (j == 0) {
        btn.className = "btn btn-hor btn-corner btn-left";
      } else if (j == 1 || j == 2) {
        btn.className = "btn btn-hor btn-left";
      } else if (j == 3) {
        btn.className = "btn btn-hor btn-left btn-mid";
      } else if (j == 4) {
        btn.className = "btn btn-hor btn-right btn-mid";
      } else if (j == 5 || j == 6) {
        btn.className = "btn btn-hor btn-right";
      } else if (j == 7) {
        btn.className = "btn btn-hor btn-corner btn-right";
      }
      btn.addEventListener("click", function () {
        clicked(btn.id);
      });

      btn.addEventListener("mouseover", function () {
        if (btn.style.background == "gray") btn.style.backgroundColor = "darkgray";
      });
      btn.addEventListener("mouseout", function () {
        if (btn.style.background == "darkgray") btn.style.backgroundColor = "gray";
      });

      div.appendChild(btn);
    }
    gameDiv.appendChild(div);
    hor = false;
  }
  if (!hor) {
    let div = document.createElement("div");
    div.className = `container c${i}`;
    i++;

    for (let j = 0; j < C + 1; j++) {
      let btn = document.createElement("button");
      btn.id = `btn${n}`;
      n++;
      if (j == 0) {
        btn.className = "btn btn-ver btn-corner btn-left";
      } else if (j == 1 || j == 2 || j == 3) {
        btn.className = "btn btn-ver btn-left";
      } else if (j == 4) {
        btn.className = "btn btn-ver btn-mid";
      } else if (j == 5 || j == 6 || j == 7) {
        btn.className = "btn btn-ver btn-right";
      } else if (j == 8) {
        btn.className = "btn btn-ver btn-corner btn-right";
      }
      btn.addEventListener("click", function () {
        clicked(btn.id);
      });

      btn.addEventListener("mouseover", function () {
        if (btn.style.background == "gray") btn.style.backgroundColor = "darkgray";
      });
      btn.addEventListener("mouseout", function () {
        if (btn.style.background == "darkgray") btn.style.backgroundColor = "gray";
      });

      div.appendChild(btn);

      if (j != C) {
        let newDiv = document.createElement("button");
        newDiv.style.height = "4rem";
        newDiv.style.width = "4rem";
        newDiv.style.margin = "0rem";
        newDiv.style.border = "none";
        newDiv.className = "spc";
        newDiv.id = `spc${o}`;
        o++;
        div.appendChild(newDiv);
      }
    }
    gameDiv.appendChild(div);
    hor = true;
  }
}

function CreateEndRow() {
  let div = document.createElement("div");
  div.className = `container c${i}`;
  i++;

  for (let j = 0; j < C; j++) {
    let btn = document.createElement("button");
    btn.id = `btn${n}`;
    n++;
    if (j == 0) {
      btn.className = "btn btn-hor btn-corner btn-left";
    } else if (j == 1 || j == 2) {
      btn.className = "btn btn-hor btn-left";
    } else if (j == 3) {
      btn.className = "btn btn-hor btn-left btn-mid";
    } else if (j == 4) {
      btn.className = "btn btn-hor btn-right btn-mid";
    } else if (j == 5 || j == 6) {
      btn.className = "btn btn-hor btn-right";
    } else if (j == 7) {
      btn.className = "btn btn-hor btn-corner btn-right";
    }
    btn.addEventListener("click", function () {
      clicked(btn.id);
    });
    div.appendChild(btn);
  }
  gameDiv.appendChild(div);
}
