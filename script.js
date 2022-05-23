let i = 1;
let n = 1;
let o = 1;
let hor = true;
let count = 0;
let playerOverride = false;

let p1score = 0;
let p2score = 0;

const R = 5;
const C = 7;
const Rp = R + 1;
const Cp = C + 1;
let numofbtns;
let enabledBtns = [];
let commonH = [];
let commonU = [];
let commonD = [];
let commonV = [];
let commonR = [];
let commonL = [];

const body = document.getElementById("overview");
const pTurnText = document.getElementById("pTurnText");
const p1text = document.getElementById("p1scoreText");
const p2text = document.getElementById("p2scoreText");

let player = 1;
let playerColor = "red";
let playerDarkColor = "darkred";

// FORMULA
// 2 (R * C + (C - 1))
// OR
// 2 (R' * C' - C) // Where R' = R + 1 and C' = C + 1
// IF BOTH GIVE THE SAME ANSWER THEN THE ANSWER IS CORRECT
// IF BOTH GIVE DIFFERENT ANSWERS THEN THE ANSWER IS
// #1 + (#2 - #1) / 2

getBtnNums();
function getBtnNums() {
  let U1 = 2 * (R * C + (C - 1));
  let U2 = 2 * (Rp * Cp - C);

  if (U1 == U2) numofbtns = U1;
  else if (U1 != U2) {
    numofbtns = U1 + (U2 - U1) / 2;
  }

  // console.log(numofbtns);
}

for (let h = 0; h < R; h++) {
  CreateElements();
}
CreateEndRow();

function clicked(sender) {
  // console.log(getY(52));

  // console.log(sender);
  let btn = document.getElementById(sender);
  if (enabledBtns.includes(btn)) return;

  enabledBtns.push(btn);
  // console.log(btn.offsetWidth);

  // console.log(enabledBtns);
  CheckH(btn);
  CheckV(btn);

  Calculate();

  if (player == 1) {
    btn.style.background = "red";
    if (!playerOverride) {
      pTurnText.innerHTML = "P2";
      pTurnText.style.color = "blue";
      player = 2;
      playerColor = "blue";
      playerDarkColor = "darkblue";
    }
  } else if (player == 2) {
    btn.style.background = "blue";
    if (!playerOverride) {
      pTurnText.innerHTML = "P1";
      pTurnText.style.color = "red";
      player = 1;
      playerColor = "red";
      playerDarkColor = "darkred";
    }
  }
  playerOverride = false;

  UpdateScoreBoard();

  setTimeout(CheckScores, 1000);
}

function CheckScores() {
  if (p1score + p2score == C * R) {
    if (p1score > p2score) {
      alert("Game Over, Player 1 wins!");
    } else if (p2score > p1score) {
      alert("Game Over, Player 2 wins!");
    }
  }
}

function Calculate() {
  let spc;
  let y;
  let x;
  let trueid;
  let res;

  if (commonU.length == 4) {
    res = getLeast("U");
    y = getY(res);
    x = res % 15;

    trueid = x + 7 * y;

    spc = document.getElementById(`spc${trueid}`);

    spc.style.background = playerDarkColor;
    spc.className = "spc";

    console.log("U");
    playerOverride = true;

    AddScore(spc);
  }
  if (commonD.length == 4) {
    res = getLeast("D");
    y = getY(res);
    x = res % 15;

    trueid = x + 7 * y;

    spc = document.getElementById(`spc${trueid}`);

    spc.style.background = playerDarkColor;
    spc.className = "spc";

    console.log("D");
    playerOverride = true;

    AddScore(spc);
  }
  if (commonR.length == 4) {
    res = getLeast("R");
    y = getY(res);
    x = res % 15;

    trueid = x + 7 * y;

    spc = document.getElementById(`spc${trueid}`);

    spc.style.background = playerDarkColor;
    spc.className = "spc";

    console.log("R");
    playerOverride = true;

    AddScore(spc);
  }
  if (commonL.length == 4) {
    res = getLeast("L");
    y = getY(res);
    x = res % 15;

    trueid = x + 7 * y;

    spc = document.getElementById(`spc${trueid}`);

    spc.style.background = playerDarkColor;
    spc.className = "spc";

    console.log("L");
    playerOverride = true;

    AddScore(spc);
  }

  console.log(`X:${x} Y:${y}`);
  console.log(spc);
  console.log(trueid);
  console.log(res);
}

function CheckH(btn) {
  commonH = [];
  commonU = [];
  commonD = [];

  let btnID = btn.id;
  if (btnID.length == 4) {
    btnID = btnID.substring(3, 4);
  } else if (btnID.length == 5) {
    btnID = btnID.substring(3, 5);
  }

  if (btn.offsetWidth != "64") return;

  for (let x = 0; x < enabledBtns.length; x++) {
    let button = enabledBtns[x];
    let buttonID = button.id;
    if (buttonID.length == 4) {
      buttonID = buttonID.substring(3, 4);
    } else if (buttonID.length == 5) {
      buttonID = buttonID.substring(3, 5);
    }

    if (button == btn) {
      commonD.push(button);
      commonU.push(button);
    }

    let diff = buttonID - btnID;

    // console.log(diff);

    if (diff == 7 || diff == 8 || diff == 15) {
      commonD.push(button);
    } else if (diff == -7 || diff == -8 || diff == -15) {
      commonU.push(button);
    }
  }

  // console.log("Down");
  for (let i = 0; i < commonD.length; i++) {
    // console.log(commonD[i].id);
  }
  // console.log("Up");
  for (let i = 0; i < commonU.length; i++) {
    // console.log(commonU[i].id);
  }
}

function CheckV(btn) {
  commonV = [];
  commonR = [];
  commonL = [];

  let btnID = btn.id;
  if (btnID.length == 4) {
    btnID = btnID.substring(3, 4);
  } else if (btnID.length == 5) {
    btnID = btnID.substring(3, 5);
  }

  if (btn.offsetWidth != "16") return;

  for (let y = 0; y < enabledBtns.length; y++) {
    let button = enabledBtns[y];
    let buttonID = button.id;
    if (buttonID.length == 4) {
      buttonID = buttonID.substring(3, 4);
    } else if (buttonID.length == 5) {
      buttonID = buttonID.substring(3, 5);
    }

    if (button == btn) {
      commonR.push(button);
      commonL.push(button);
    }

    let diff = buttonID - btnID;

    // console.log(diff);

    if ((diff == -7 || diff == 1 || diff == 8) && btnID % 15 != 0) {
      commonR.push(button);
    } else if ((diff == -8 || diff == -1 || diff == 7) && btnID % 15 != 8) {
      commonL.push(button);
    }
  }

  // console.log("Right");
  for (let i = 0; i < commonR.length; i++) {
    // console.log(commonR[i].id);
  }
  // console.log("Left");
  for (let i = 0; i < commonL.length; i++) {
    // console.log(commonL[i].id);
  }
}

function AddScore(spc) {
  if (player == 1) {
    spc.innerHTML = "P1";
    p1score++;
  } else if (player == 2) {
    spc.innerHTML = "P2";
    p2score++;
  }
}

function getY(id) {
  for (let i = 0; i < R; i++) {
    if (id <= C + 15 * i) return i;
  }
}

function getLeast(list) {
  let result = 999;

  if (list == "U") {
    commonU.forEach((buton) => {
      let btnID = buton.id;

      if (btnID.length == 4) {
        btnID = btnID.substring(3, 4);
      } else if (btnID.length == 5) {
        btnID = btnID.substring(3, 5);
      }

      if (+btnID < result) {
        result = btnID;
      }
    });

    return result;
  }
  if (list == "D") {
    commonD.forEach((buton) => {
      let btnID = buton.id;

      if (btnID.length == 4) {
        btnID = btnID.substring(3, 4);
      } else if (btnID.length == 5) {
        btnID = btnID.substring(3, 5);
      }

      console.log(btnID);
      console.log(result);

      if (+btnID < result) {
        result = btnID;
      }
    });

    console.log(result);
    return result;
  }
  if (list == "R") {
    commonR.forEach((buton) => {
      let btnID = buton.id;

      if (btnID.length == 4) {
        btnID = btnID.substring(3, 4);
      } else if (btnID.length == 5) {
        btnID = btnID.substring(3, 5);
      }

      if (+btnID < result) {
        result = btnID;
      }
    });

    return result;
  }
  if (list == "L") {
    commonL.forEach((buton) => {
      let btnID = buton.id;

      if (btnID.length == 4) {
        btnID = btnID.substring(3, 4);
      } else if (btnID.length == 5) {
        btnID = btnID.substring(3, 5);
      }

      if (+btnID < result) {
        result = btnID;
      }
    });

    return result;
  }
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

      div.appendChild(btn);
    }
    body.appendChild(div);
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
    body.appendChild(div);
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
  body.appendChild(div);
}
