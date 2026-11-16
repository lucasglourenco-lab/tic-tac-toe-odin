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
    return false;
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

  const playRound = function (position) {
    let currentSymbol = getPlayer().symbol;
    if (gameTable.mark(position, currentSymbol)) {
      changePlayer();
      return true;
    } else return false;
  };

  return { getPlayer, playRound };
})();
