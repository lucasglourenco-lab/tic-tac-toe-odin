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

// ---------- Fluxo do jogo (2.2) ----------
const gameFlow = (() => {
  let firstPlayer = null;
  let secondPlayer = null;
  let currentPlayer = null;

  function markPlayer(_playerX, _playerO) {
    firstPlayer = _playerX.player();
    secondPlayer = _playerO.player();
    currentPlayer = firstPlayer;
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
    if (currentPlayer === null) {
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

  return { getPlayer, markPlayer, nextPlayer };
})();

// ---------- Testes provisórios (2.3) ----------
let playerX = createPlayer("Lucas", "X");
let playerO = createPlayer("Ana", "O");

// Teste 6 - Antes do registro (de marcar o jogador)
console.log("Teste 6: " + gameFlow.nextPlayer());

gameFlow.markPlayer(playerX, playerO);
// Teste 1
console.log("Teste 1: ", gameFlow.getPlayer());
// Teste 2
gameFlow.nextPlayer();
console.log("Teste 2: ", gameFlow.getPlayer());

// Teste 3
gameFlow.nextPlayer();
console.log("Teste 3: ", gameFlow.getPlayer());
// Teste 4
const nextValidation = gameFlow.nextPlayer();
console.log("Teste 4: ", gameFlow.getPlayer(), nextValidation);

// Teste 5 - não chama nextPlayer();
console.log("Teste 5: ", gameFlow.getPlayer());

// Teste 7
gameFlow.currentPlayer = null;
console.log("Teste 7: ", gameFlow.getPlayer());
