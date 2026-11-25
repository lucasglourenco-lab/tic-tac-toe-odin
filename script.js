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
  let roundStatus = "waiting";
  let playerX;
  let playerO;
  let winner;
  let combinationWinner;
  let currentPlayer;
  let winX = 0;
  let winO = 0;
  let draw = 0;

  const getXScore = function () {
    return winX;
  };
  const getOScore = function () {
    return winO;
  };
  const getDrawScore = function () {
    return draw;
  };

  const createPlayers = function (X, O) {
    gameTable.clear();
    combinationWinner = undefined;
    winner = undefined;
    playerX = createPlayer(X, "X");
    playerO = createPlayer(O, "O");
    currentPlayer = playerX;
    roundStatus = "playing";
    winX = 0;
    winO = 0;
    draw = 0;
  };

  const getPlayer = function () {
    return { ...currentPlayer };
  };

  const changePlayer = function () {
    currentPlayer === playerX
      ? (currentPlayer = playerO)
      : (currentPlayer = playerX);
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
        combinationWinner = arr;
        // Aqui vale currentPlayer porque o checkWin roda ANTES do changePlayer.
        winner = currentPlayer;
        return true;
      }
    }
    return false;
  };

  const playRound = function (position) {
    if (roundStatus === "playing") {
      let currentSymbol = getPlayer().read().symbol;
      if (gameTable.mark(position, currentSymbol)) {
        if (checkWin(currentSymbol)) {
          roundStatus = "finished";
          if (getWinner().read().symbol === "X") {
            winX++;
            return;
          } else {
            winO++;
            return;
          }
        }
        changePlayer();

        if (gameTable.read().every((i) => i !== null)) {
          roundStatus = "finished";
          draw++;
        }
      }
    }
  };

  const restartGame = function () {
    gameTable.clear();
    roundStatus = "playing";
    currentPlayer = playerX;
    combinationWinner = undefined;
    winner = undefined;
  };

  const getRoundStatus = function () {
    return roundStatus;
  };

  const getCombinationWinner = function () {
    if (winner) {
      return [...combinationWinner];
    }
  };

  const getWinner = function () {
    return winner;
  };

  return {
    getPlayer,
    playRound,
    restartGame,
    getRoundStatus,
    getCombinationWinner,
    getWinner,
    createPlayers,
    getXScore,
    getOScore,
    getDrawScore,
  };
})();

// Passo 5 - Tela.

const board = (() => {
  const boardNode = Array.from(document.querySelectorAll("#board button"));
  const restartBtn = document.querySelector("#restartGame");
  const playersForm = document.querySelector("#playersForm");
  const playAgainBtn = document.querySelector("#playAgain");
  const resultModal = document.querySelector("#resultDialog");
  const resultTitle = document.querySelector("#resultTitle");
  const resultMessage = document.querySelector("#resultMessage");

  restartBtn.addEventListener("click", () => {
    gameFlow.restartGame();
    render();
  });

  playAgainBtn.addEventListener("click", () => {
    gameFlow.restartGame();
    render();
    resultModal.close();
  });

  let XName;
  let OName;

  playersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputX = document.querySelector("#playerXInput");
    const inputO = document.querySelector("#playerOInput");

    if (inputX.value.trim() === "" || inputO.value.trim() === "") {
      alert("Informe os nomes dos dois jogadores");
      return;
    } else if (
      inputO.value.trim().toLowerCase() === inputX.value.trim().toLowerCase()
    ) {
      alert("Os nomes não podem ser iguais");
      return;
    }

    gameFlow.createPlayers(inputX.value.trim(), inputO.value.trim());

    XName = inputX.value.trim();
    OName = inputO.value.trim();

    inputX.value = "";
    inputO.value = "";

    render();
  });

  boardNode.forEach((el) => {
    el.addEventListener("click", (e) => {
      const currentHouse = +e.currentTarget.dataset.index;
      gameFlow.playRound(currentHouse);
      render();
    });
  });

  const render = function () {
    const playerXName = document.querySelector("#playerXName");
    const playerOName = document.querySelector("#playerOName");
    playerXName.textContent = XName;
    playerOName.textContent = OName;
    let winner = gameFlow.getWinner();

    const XScore = gameFlow.getXScore();
    const OScore = gameFlow.getOScore();
    const tie = gameFlow.getDrawScore();
    document.querySelector("#playerXScore").textContent = XScore;
    document.querySelector("#playerOScore").textContent = OScore;
    document.querySelector("#tieScore").textContent = tie;

    const table = gameTable.read();
    restartBtn.disabled = true;
    const gameStatus = document.querySelector("#gameStatus");
    let roundPlayer = gameFlow.getPlayer();

    boardNode.forEach((el) => {
      el.removeAttribute("disabled");
      el.removeAttribute("data-win");
    });

    boardNode.forEach((el, i) => {
      el.textContent = table[i];
      if (table[i] === null) {
        el.removeAttribute("data-mark");
      } else {
        el.dataset.mark = table[i];
        el.disabled = true;
      }

      const linha = Math.floor(i / 3 + 1);
      const coluna = (i % 3) + 1;
      el.ariaLabel = `Linha ${linha}, coluna ${coluna}, marca ${table[i] === null ? "nenhuma" : table[i]}`;
    });

    let roundStatus = gameFlow.getRoundStatus();
    if (roundStatus === "waiting") {
      boardNode.forEach((b) => b.setAttribute("disabled", ""));
      return;
    } else if (roundStatus === "finished") {
      let combinationWinner = gameFlow.getCombinationWinner();
      if (combinationWinner !== undefined) {
        combinationWinner.forEach((el) => {
          boardNode[el].dataset.win = true;
        });
      }
      boardNode.forEach((el) => {
        el.disabled = true;
      });
      restartBtn.disabled = false;
      resultModal.showModal();
      resultTitle.textContent = "Fim de Jogo!";

      if (winner !== undefined) {
        resultMessage.textContent = `Vitória de ${winner.read().name}`;
      } else {
        resultMessage.textContent = "Foi um empate, jogue novamente!";
      }
    }
    activatePlayerOfTheRound();
    let roundPlayerName = roundPlayer.read().name;

    if (roundStatus === "playing") {
      restartBtn.disabled = false;

      gameStatus.textContent = `Em andamento, é a vez de ${roundPlayerName}`;
    } else if (winner !== undefined) {
      gameStatus.textContent = `Vitória de ${winner.read().name}`;
    } else {
      gameStatus.textContent = "Empate";
    }
  };

  const activatePlayerOfTheRound = function () {
    let roundPlayer = gameFlow.getPlayer();

    const cardX = document.querySelector("#playerXCard");
    const cardO = document.querySelector("#playerOCard");

    if (gameFlow.getRoundStatus() === "finished") {
      cardX.removeAttribute("data-active");
      cardO.removeAttribute("data-active");
      return;
    }

    if (roundPlayer.read().symbol === "X") {
      cardO.removeAttribute("data-active");
      cardX.dataset.active = true;
    } else if (roundPlayer.read().symbol === "O") {
      cardX.removeAttribute("data-active");
      cardO.dataset.active = true;
    }
  };

  return { render, activatePlayerOfTheRound };
})();
