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

// ---------- Fluxo do jogo (2.2, em andamento) ----------
const gameFlow = (() => {
  let firstPlayer = null;
  let secondPlayer = null;
  let currentPlayer;

  function markPlayer(_playerX, _playerO) {
    firstPlayer = _playerX.player();
    secondPlayer = _playerO.player();
    currentPlayer = firstPlayer;
    return true;
  }

  function getPlayer() {
    return { ...currentPlayer };
  }

  return { getPlayer, markPlayer };
})();

// ---------- Testes provisórios (2.2) ----------
let playerX = createPlayer("Lucas", "X");
let playerO = createPlayer("Ana", "O");

gameFlow.markPlayer(playerX, playerO);

console.log(gameFlow.getPlayer());
