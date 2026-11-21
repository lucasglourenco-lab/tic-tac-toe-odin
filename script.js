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
  let playerX = createPlayer("Lucas", "X");
  let playerO = createPlayer("Ana", "O");

  let currentPlayer = playerX;
  let roundStatus = "waiting";

  const getPlayer = function () {
    return { ...currentPlayer };
  };

  const changePlayer = function () {
    if (getRoundStatus() === "waiting") {
      currentPlayer === playerX
        ? (currentPlayer = playerO)
        : (currentPlayer = playerX);
    }
  };

  const playRound = function (position) {
    if (roundStatus === "waiting") {
      let currentSymbol = getPlayer().read().symbol;

      if (gameTable.mark(position, currentSymbol)) {
        if (checkWin(currentSymbol)) {
          roundStatus = "finished";
        }
        if (gameTable.read().every((i) => i !== null)) {
          roundStatus = "finished";
        }

        changePlayer();
      }
    }
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
        let winner = arr;
        console.log(winner);
        roundStatus = "finished";
      }
    }
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

// Passo 5 - Tela.

const board = (() => {
  const boardNode = Array.from(document.querySelectorAll("#board button"));
  const restartBtn = document.querySelector("#restartGame");

  const finishGame = function () {
    boardNode.forEach((el) => (el.disabled = true));
    restartBtn.disabled = false;
  };

  restartBtn.addEventListener("click", () => {
    gameFlow.restartGame();
    render();
    restartBtn.disabled = true;
  });

  boardNode.forEach((el) => {
    el.addEventListener("click", (e) => {
      const currentHouse = +e.currentTarget.dataset.index;
      gameFlow.playRound(currentHouse);
      render();
      activatePlayerCard();
    });
  });

  const render = function () {
    const table = gameTable.read();
    boardNode.forEach((el) => (el.disabled = false));
    boardNode.forEach((el, i) => {
      el.textContent = table[i];
      if (table[i] === null) {
        el.removeAttribute("data-mark");
      } else {
        el.dataset.mark = table[i];
        el.disabled = true;
      }

      const linha = i > 5 ? 3 : i > 2 ? 2 : 1;
      const coluna = i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3;
      el.ariaLabel = `Linha ${linha}, coluna ${coluna}, marca ${table[i] === null ? "nenhuma" : table[i]}`;
    });
    if (gameFlow.getRoundStatus() === "finished") {
      finishGame();
    }
  };
  const card = document.querySelectorAll(".player-card");

  const activatePlayerCard = function () {
    card.forEach((item) => (item.dataset.active = false));
    let playerTime = gameFlow.getPlayer();
    card.forEach((i) => {
      if (i.querySelector("span").textContent === playerTime.read().symbol) {
        i.dataset.active = true;
      }
    });
  };

  render();
  activatePlayerCard();
  return { render, activatePlayerCard };
})();
