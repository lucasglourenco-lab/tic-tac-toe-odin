const funcA = (() => {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    let item = null;
    arr.push(item);
  }

  function read() {
    return [...arr];
  }
  return { read };
})();

const gameTabuleiro = funcA.read();
gameTabuleiro[3] = "x";

console.log(gameTabuleiro);
console.log(funcA.read());
