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

  return { getPlayer, markPlayer, nextPlayer, getRoundStatus, roundChange };
})();

// ---------- Fluxo do jogo (2.5) ----------
