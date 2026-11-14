// Tic Tac Toe — lógica no console (sem DOM ainda).
// Perguntas, previsões e explicações de cada tarefa: ver NOTAS.md.

// ---------- Tabuleiro (Fase 1: 1.1 a 1.6) ----------
const gameTable = (() => {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    let item = null;
    arr.push(item);
  }

  const table = function () {
    return [...arr];
  };

  const mark = function (position, playerSymbol) {
    if (
      Number.isInteger(position) &&
      position < arr.length &&
      position >= 0 &&
      arr[position] === null
    ) {
      arr[position] = playerSymbol;
      return true;
    } else {
      return false;
    }
  };

  const clear = function () {
    arr.forEach((item, index) => (arr[index] = null));
  };

  return { table, mark, clear };
})();

// ---------- Jogador (2.1) ----------
const createPlayer = function (_name, _mark) {
  let name = _name;
  let mark = _mark;
  const player = function () {
    return { name, mark };
  };
  return { player };
};

// ---------- Fluxo do jogo (2.2, 2.3 e 2.4) ----------
const gameFlow = (() => {
  let firstPlayer = null;
  let secondPlayer = null;
  let currentPlayer = null;
  let roundStatus = "waiting";

  function getRoundStatus() {
    return roundStatus;
  }

  function roundChange(status) {
    if (status !== "waiting" && status !== "playing" && status !== "over") {
      return false;
    }
    roundStatus = status;
    return true;
  }

  function markPlayer(_playerX, _playerO) {
    if (roundStatus === "playing" || roundStatus === "over") {
      return false;
    }
    firstPlayer = _playerX.player();
    secondPlayer = _playerO.player();
    currentPlayer = firstPlayer;
    roundChange("playing");
    return true;
  }

  function getPlayer() {
    if (currentPlayer === null) {
      return null;
    } else {
      return { ...currentPlayer };
    }
  }

  function nextPlayer() {
    if (currentPlayer === null || roundStatus === "over") {
      return false;
    } else if (getPlayer().mark === "X") {
      currentPlayer = secondPlayer;
      return true;
    } else if (getPlayer().mark === "O") {
      currentPlayer = firstPlayer;
      return true;
    }
    return false;
  }

  function playGame(position) {
    if (
      getRoundStatus() === "playing" &&
      gameTable.mark(position, getPlayer().mark)
    ) {
      nextPlayer();
      return true;
    }
    return false;
  }

  const winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [6, 7, 8],
    [2, 5, 8],
    [2, 4, 6],
  ];

  const getWinList = function () {
    return structuredClone(winArray);
  };

  return {
    getPlayer,
    markPlayer,
    nextPlayer,
    getRoundStatus,
    roundChange,
    playGame,
    getWinList,
  };
})();

// ------------------- Fase 3 ------------------------
// tabuleiro => gameTable (table, mark e clear);
// players => createPlayer;
// fluxo do jogo => gameFlow (getPlayer, markPlayer, nextPlayer, getRoundStatus, roundChange, playGame e getWinList)

const isWin = function (tabuleiro, winTest, playerMark) {
  if (
    tabuleiro[winTest[0]] === playerMark &&
    tabuleiro[winTest[1]] === playerMark &&
    tabuleiro[winTest[2]] === playerMark
  ) {
    return true;
  } else {
    return false;
  }
};
let test1 = isWin(
  ["X", "X", "X", null, null, null, null, null, null],
  [0, 1, 2],
  "X",
);

let arrayTest = ["X", "X", "X", null, null, null, null, null, null];

let test2 = isWin(arrayTest, [0, 1, 2], "O");
let test3 = isWin(
  [null, null, null, null, null, null, null, null, null],
  [0, 1, 2],
  "X",
);
let test4 = isWin(
  ["X", "X", "O", null, null, null, null, null, null],
  [0, 1, 2],
  "X",
);
let test5 = isWin(
  ["X", "X", null, null, null, null, null, null, null],
  [0, 1, 2],
  "X",
);
let test6 = isWin(
  [null, null, "X", null, "X", null, "X", null, null],
  [2, 4, 6],
  "X",
);

console.log("Teste 1: ", test1);
console.log("Teste 2: ", test2);
console.log("Teste 3: ", test3);
console.log("Teste 4: ", test4);
console.log("Teste 5: ", test5);
console.log("Teste 6: ", test6);
console.log(arrayTest);
