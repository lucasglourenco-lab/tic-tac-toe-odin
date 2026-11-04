// ============================================================
// PLANO
// ============================================================
// Regras: pouco código global. Tabuleiro e fluxo são IIFE (existem uma vez);
// jogadores são criados por factory (são dois). Primeiro tudo no console, sem DOM.

// O jogo
// - 2 jogadores e um tabuleiro de 9 casas, todas 'null' no início.
// - Cada jogador, na sua vez, marca uma casa vazia com a sua marca.
// - Vence quem primeiro preencher 3 casas com a mesma marca (linha, coluna ou diagonal).
// - Tabuleiro cheio sem vencedor: velha.

// Closure
// Função interna que continua lembrando as variáveis da função externa,
// mesmo depois de a externa terminar. A variável fica escondida de fora e só
// as funções internas devolvidas (os métodos) conseguem usá-la.

// Os 3 objetos
// Jogador (factory):   sabe nome e marca ('X' ou 'O').
// Tabuleiro (IIFE):    sabe as 9 casas (array, índice = posição, valor = marca ou null).
//                      Marca uma casa vazia e responde true (aceitou) ou false (recusou).
// Fluxo do jogo (IIFE): sabe de quem é a vez (X começa), o placar e se a rodada acabou.
//                      Na jogada: chama o tabuleiro; se aceitou, confere vitória e velha;
//                      se a rodada continua, passa a vez. Depois do fim, bloqueia jogadas.

// ============================================================
// FASE 1 — TABULEIRO (só console, sem DOM)
// ============================================================

// ---------- 1.1 Criar o tabuleiro ----------
// Objetivo: tabuleiro com 9 casas 'null', dentro de uma IIFE.

// Perguntas (responda antes de digitar)
// 1. O que é uma IIFE e o que ela devolve?
//    R: Função executada na hora em que é criada, no formato (() => { ... })().
//       Devolve: o return dentro de {}.
// 2. Onde fica o array das casas e quem o enxerga?
//    R: Em uma variável dentro da IIFE. Só as funções internas a enxergam.
// 3. Se o array é privado, como conferir o tabuleiro na 1.1, antes da leitura (1.2)?
//    R: Guardar a IIFE em uma variável retornando um objeto para essa variável com um método de leitura (console.log) do que foi desenvolvido ali.

// PREVER: se eu olhar o tabuleiro agora, vejo undefined, pois está oculta -
// mas se retorno o que foi desenvolvido dentro da arrow function dentro da IIFE,
// consigo ler o tabuleiro, que deve ser devolvido como um array de 9 elementos 'null' - index de 0 a 8.

// ==================================================================================
// FAZER ↓
// ===================================================================================
// Uma variável para guardar o resultado da IIFE.
const gameTable = (() => {
  let arr = [];
  for (let i = 0; i < 9; i++) {
    let item = null;
    arr.push(item);
  }
  function print() {
    console.log(arr);
  }
  return { print };
})();

gameTable.print();

// CONFERIR: Apareceu a array impressa pelo método.
// Bateu com a previsão? Sim.

// EXPLICAR (uma frase): por que o tabuleiro é IIFE e não factory?
// Pois será uma função executada somente uma vez e não precisará ser reutilizada para criar novas funções como uma factory é.

// COMMIT: "cria tabuleiro com nove casas vazias"

// ---------- 1.2 em diante ----------
// Antes da 1.2: faça o experimento do array devolvido num arquivo de rascunho.
