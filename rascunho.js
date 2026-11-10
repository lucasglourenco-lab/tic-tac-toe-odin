const gameTable = (() => {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    let item = null;
    arr.push(item);
  }

  function table() {
    return [...arr];
  }

  function mark(position, playerSymbol) {
    if (
      Number.isInteger(position) &&
      position >= 0 &&
      position < arr.length &&
      arr[position] === null
    ) {
      arr[position] = playerSymbol;
    }
  }

  return { table, mark };
})();
