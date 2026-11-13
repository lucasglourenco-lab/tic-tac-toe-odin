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

  return {
    getPlayer,
    markPlayer,
    nextPlayer,
    getRoundStatus,
    roundChange,
    playGame,
  };
})();

// ---------- Fluxo do jogo (2.5) ----------

// 2.5a

let playerX = createPlayer("Lucas", "X");
let playerO = createPlayer("Ana", "O");

console.log(
  "Chamo a operação antes de registrar os jogadores, retorna: ",
  gameFlow.playGame(0),
);

gameFlow.markPlayer(playerX, playerO);

console.log("Após a jogada na casa 0, devolve: " + gameFlow.playGame(0));
console.log("Tabuleiro: " + gameTable.table());
console.log("É a vez de: " + gameFlow.getPlayer().name);

// 2.5b

console.log(
  "Após repetir a jogada na casa 0, devolve: " + gameFlow.playGame(0),
);
console.log("Tabuleiro: " + gameTable.table());
console.log("É a vez de: " + gameFlow.getPlayer().name);

// 2.5c
console.log("Após a jogada na casa 4, devolve: " + gameFlow.playGame(4));
console.log("Tabuleiro: " + gameTable.table());
console.log("É a vez de: " + gameFlow.getPlayer().name);

console.log("Após a jogada na casa 9 'fora', devolve: " + gameFlow.playGame(9));
console.log("Tabuleiro: " + gameTable.table());
console.log("É a vez de: " + gameFlow.getPlayer().name);

console.log("Após a jogada na casa 8, devolve: " + gameFlow.playGame(8));
console.log("Tabuleiro: " + gameTable.table());
console.log("É a vez de: " + gameFlow.getPlayer().name);

gameFlow.roundChange("over");
console.log(
  "Mudo o estado para over e chamo uma operação nova, retorna: ",
  gameFlow.playGame(3),
);
