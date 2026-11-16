// Tic Tac Toe — escreva seu código aqui, seguindo o TODO.md.

//IIFE de tabuleiro com três funções: gerar o tabuleiro, marcar e limpar.
const gameTable = (() => {
  let arr = [];
  const table = function () {
    for (let i = 0; i < 9; i++) {
      arr.push(null);
    }
  };
  table();

  const read = function () {
    return [...arr];
  };

  const mark = function (position, symbol) {
    if (
      Number.isInteger(position) !== true ||
      position > 8 ||
      position < 0 ||
      arr[position] !== null
    ) {
      return false;
    }
    arr[position] = symbol;
    return true;
  };

  const clear = function () {
    arr = [];
    table();
  };

  return { read, mark, clear };
})();

// Factory de jogadores

const createPlayer = function (_name, _symbol) {
  if (_symbol !== "X" && _symbol !== "O") {
    return 'The symbol needs to be "X" or "O"';
  }

  let name = _name;
  let symbol = _symbol;

  const read = function () {
    return {
      name,
      symbol,
    };
  };

  return { read };
};

// Controle do jogo - passo 3 (IIFE)

const gameFlow = (() => {
  const playerX = createPlayer("Lucas", "X").read();
  const playerO = createPlayer("Ana", "O").read();

  let currentPlayer = playerX;

  const getPlayer = function () {
    return { ...currentPlayer };
  };

  const changePlayer = function () {
    currentPlayer === playerX
      ? (currentPlayer = playerO)
      : (currentPlayer = playerX);
  };

  let roundStatus = "waiting";

  const playRound = function (position) {
    if (roundStatus === "waiting") {
      let currentSymbol = getPlayer().symbol;

      if (gameTable.mark(position, currentSymbol)) {
        if (checkWin(currentSymbol)) {
          roundStatus = "finished";
          return "You win! The game has ended";
        }
        if (gameTable.read().every((i) => i !== null)) {
          roundStatus = "finished";
          return "It's even";
        }

        changePlayer();
        return "The next player should play";
      } else return "The round was not accepted";
    }
    return "The game is end";
  };

  const winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const checkWin = function (symbolCompared) {
    const table = gameTable.read();

    for (const arr of winArray) {
      if (
        table[arr[0]] === symbolCompared &&
        table[arr[1]] === symbolCompared &&
        table[arr[2]] === symbolCompared
      ) {
        return true;
      }
    }
    return false;
  };

  const restartGame = function () {
    gameTable.clear();
    roundStatus = "waiting";
    currentPlayer = playerX;
  };

  const getRoundStatus = function () {
    return roundStatus;
  };

  return { getPlayer, playRound, restartGame, getRoundStatus };
})();

// Passo 4 - Checagem de Vitória/Derrota ou Velha. --- O Maior de todos.
