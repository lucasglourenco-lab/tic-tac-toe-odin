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
// const gameTable = (() => {
//   let arr = [];
//   for (let i = 0; i < 9; i++) {
//     let item = null;
//     arr.push(item);
//   }
//   function table() {
//     return [...arr];
//   }
//   return { table };
// })();

// CONFERIR: Apareceu a array impressa pelo método.
// Bateu com a previsão? Sim.

// EXPLICAR (uma frase): por que o tabuleiro é IIFE e não factory?
// Pois será uma função executada somente uma vez e não precisará ser reutilizada para criar novas funções como uma factory é.

// COMMIT: "cria tabuleiro com nove casas vazias"

// ---------- 1.2 Ler o estado do tabuleiro ----------
// Objetivo: uma operação de leitura que mostra as casas,
// mas NÃO permite alterar o tabuleiro de fora.

// Experimento (num arquivo de rascunho, fora do script.js)
// A) Função com um array privado e um método que devolve o PRÓPRIO array.
//    Altere uma posição do resultado, fora da função, e leia de novo.

// B) Repita devolvendo uma CÓPIA do array.
// Antes de rodar, escreva: no A eu espero a array modificada ; no B eu espero a cópia da array original como na maneira que foi inicialmente criada .
// Depois de rodar: aconteceu o que esperava.

// Perguntas (responda antes de digitar)
// 1. Por que, no A, o tabuleiro muda mesmo com o array "escondido"?
//    R: Porque a variável recebe a array original como referência. Mudá-la por fora, muda ela por dentro
// 2. O que é uma cópia do array e como ela difere de outra variável apontando para o mesmo array?
//    R: Com 'b = a', a e b são dois nomes para o MESMO array: mudar um muda o outro.
//       Com '[...a]', nasce um array NOVO com os mesmos valores: mudar a cópia não afeta o original.
// 3. Por que uma cópia rasa basta aqui? (o que o array guarda: textos, null ou objetos?)
//    R: Basta pois não há objetos, somente uma propriedade primitiva. Se fosse objeto, ambas arrays apontariam para a mesma referência e alterar uma também alteraria outra.
// 4. O print da 1.1 continua necessário depois da leitura? Mantenho, troco ou removo?
//    R: Desnecessário, já que foi visto que o retorno é do que se queria.

// PREVER: se eu ler o tabuleiro, mudar a posição 4 da cópia e ler de novo,
// a casa 4 do tabuleiro vai estar 'null' (previsão).

// FAZER ↓
// const tabuleiro = gameTable.table();
// tabuleiro[4] = "X";
// const tabuleiroB = gameTable.table();

// console.log(tabuleiro);
// console.log(tabuleiroB);

// CONFERIR: apareceu 'X' na primeira e null na segunda chamada. Bateu com a previsão? Sim

// EXPLICAR (uma frase): por que a leitura devolve uma cópia? Pois caso devolvesse a array original, essa array poderia ser modificada por fora da função, o que não é desejável.

// COMMIT: "adiciona leitura do tabuleiro sem expor o array"

// ---------- 1.3 Marcar uma casa ----------
// Objetivo: uma operação do tabuleiro que recebe a posição e a marca e
// coloca a marca nessa posição do array.
// Ainda SEM validação (vem na 1.4) e SEM responder true/false (vem na 1.5).
// Dica: comente os testes da 1.2 (linhas acima) para não misturar as saídas.

// Perguntas (responda antes de digitar)
// 1. Onde essa operação deve ficar: dentro da IIFE ou fora? Por quê?
//    R: Dentro da IIFE. Será executada uma vez na criação e posteriormente será acessada.
// 2. Quais dois dados ela precisa receber?
//    R: Recebe como parâmetros a posição e a marca do player que irá inserir naquela posição
// 3. Ela altera o 'arr' original ou uma cópia? Lembre da 1.2.
//    R: O original, posteriormente uma cópia é servida.
// 4. O que muda no 'return { table }' para a operação poder ser chamada de fora?
//    R: acrescenta-se uma vírgula e retorna-se uma função (método)
// 5. Nome da operação (mantenha o mesmo idioma de gameTable e table):
//    R: Darei o nome de play

// PREVER:
// - Marco a posição 4 com 'X' e leio o tabuleiro: a posição 4 mostra 'X'
// - Marco a posição 4 de novo com 'O' (ainda sem validação): a posição 4 fica 'O'

// FAZER ↓

// const gameTable = (() => {
//   let arr = [];
//   for (let i = 0; i < 9; i++) {
//     let item = null;
//     arr.push(item);
//   }

//   function table() {
//     return [...arr];
//   }
//   function mark(position, mark) {
//     arr[position] = mark;
//   }

//   return { table, mark };
// })();

// CONFERIR: apareceu 'X' e depois 'O'. Bateu com a previsão? Sim, nos dois casos.

// EXPLICAR (uma frase): por que a marcação acontece dentro do tabuleiro e não fora?
// A marcação ocorre dentro de gameTable (tabuleiro) pois é lá que vive a array original que será modificada.

// COMMIT: "adiciona operação de marcar casa no tabuleiro"

// ---------- 1.4 Recusar jogadas inválidas ----------
// Objetivo: a operação de marcar NÃO altera o tabuleiro quando a posição é
// inválida ou a casa já está ocupada. Ainda sem responder true/false (vem na 1.5).

// Passo 1: PREVER ANTES de proteger. Preencha a coluna do meio ANTES de rodar.
// Caso               | o que eu espero que a marcação faça hoje | o que aconteceu
// casa já ocupada    | Remarca a casa                           | Remarcou a casa.
// posição -1         | Cria uma propriedade                     | Criou a propriedade.
// posição 9          | Aumenta o tamanho da array               | Aumentou o tamanho da array.
// posição "abc"      | Não marque                               | Não marcou.
// posição 1.5        | Não marque                               | Não marcou.
// Atenção: nem todo efeito aparece na leitura (que devolve uma cópia).
// Como enxergar também o que ficou "estranho" dentro do array? Pense em um teste provisório.
// Não entendi.

// Perguntas (responda antes de digitar)
// 1. Que condições uma posição precisa cumprir para ser válida? Liste todas.
//    R: Number maior ou igual a zero e menor que length. Casa igual a null.
// 2. Em que ordem verificar? Checar "casa vazia" antes da faixa muda o resultado? (o que arr[9] devolve?)
//    R: Primeiro verifico se é um number e se está dentro do que espero (>=0 && < arr.length), depois se é integer, por fim se está vazio ou não. Creio que não mudaria o resultado, arr[9] retornaria undefined.
// 3. Como interromper a função sem alterar nada quando a jogada é inválida?
//    R: com 'return'
// 4. Pesquise no MDN: Number.isInteger. Ele resolve quais dos cinco casos?
//    R: Tanto confirma se é number, como se é integer - casos 4 e 5.
// 5. Quem deve validar: o tabuleiro ou quem o chama? Por quê?
//    R: o próprio tabuleiro, pois ele que irá modificar ou não a array originalmente criada.

// PREVER (depois de proteger): as cinco tentativas inválidas deixam o tabuleiro com a arr inicial (todas null)

// FAZER ↓

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

// CONFERIR: apareceu da forma prevista . Bateu com a previsão? Sim

// EXPLICAR (uma frase): por que o tabuleiro valida em vez de confiar em quem o chama?
// Pois é ele que salvará a array com as posições corretas das jogadas, não podendo depender de
//  quem o chama, já que esse que o chama pode passar parâmetros inválidos.

// COMMIT: "recusa jogadas inválidas no tabuleiro"

// ---------- 1.5 em diante ----------
