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

// const gameTable = (() => {
//   let arr = [];
//   for (let i = 0; i < 9; i++) {
//     let item = null;
//     arr.push(item);
//   }

//   function table() {
//     return [...arr];
//   }

//   function mark(position, playerSymbol) {
//     if (
//       Number.isInteger(position) &&
//       position >= 0 &&
//       position < arr.length &&
//       arr[position] === null
//     ) {
//       arr[position] = playerSymbol;
//     }
//   }

//   return { table, mark };
// })();

// CONFERIR: apareceu da forma prevista . Bateu com a previsão? Sim

// EXPLICAR (uma frase): por que o tabuleiro valida em vez de confiar em quem o chama?
// Pois é ele que salvará a array com as posições corretas das jogadas, não podendo depender de
//  quem o chama, já que esse que o chama pode passar parâmetros inválidos.

// COMMIT: "recusa jogadas inválidas no tabuleiro"

// ---------- 1.5 Informar o resultado da jogada ----------
// Objetivo: a marcação passa a responder true (marcou) ou false (recusou).
// O tabuleiro só informa; quem o chama decide o que fazer (ex.: passar a vez).

// Perguntas (responda antes de digitar)
// 1. O que o fluxo do jogo vai fazer com um true? E com um false?
//    R: com um true ele confere se há uma vitória ou velha, se não houver, passa a vez.
// 2. Por que é melhor o tabuleiro apenas informar do que decidir sozinho o que
//    fazer depois (passar a vez, por exemplo)? Lembre quem faz o quê no plano dos 3 objetos.
//    R: o tabuleiro só informa pois quem controla o fluxo é outra função, que chama o tabuleiro
//    ao sinal de true.
// 3. Hoje a mark não tem return com valor. O que ela devolve quando é chamada?
//    Teste: guarde o retorno numa variável e imprima.
//    R: retorna 'undefined'
// 4. Se ela devolvesse undefined na jogada recusada, seria o mesmo que false?
//    Teste no console: undefined === false e if (undefined) { ... }.
//    R: Não, apesar de if (undefined) ser false, undefined não é igual a false.
// 5. Quais são os dois caminhos dentro da função (marcou / recusou)?
//    Quantos return você precisa e onde ficam?
//    R: São dois caminhos, um quando há o true no if com um return no fim, outro caso esse if não seja executado.

// PREVER: preencha ANTES de rodar.
// Caso                          | retorno esperado | a casa mudou?
// marcar 4 com 'X' (vazia)      | undefined        | Sim
// marcar 4 de novo com 'O'      | undefined        | Não
// posição -1                    | undefined        | Não
// posição 9                     | undefined        | Não
// posição "abc"                 | undefined        | Não
// posição 1.5                   | undefined        | Não

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

//   function mark(position, playerSymbol) {
//     if (
//       Number.isInteger(position) &&
//       position >= 0 &&
//       position < arr.length &&
//       arr[position] === null
//     ) {
//       arr[position] = playerSymbol;
//       return true;
//     } else {
//       return false;
//     }
//   }

//   return { mark, table };
// })();

// CONFERIR: os retornos foram true e false . Bateu com a previsão? Sim

// EXPLICAR (uma frase): por que a marcação devolve true/false em vez de passar a vez sozinha? Pois passar a vez
// não é dever do tabuleiro, mas sim de outra função que controla o jogo

// COMMIT: "tabuleiro informa se a jogada foi aceita"

// ---------- 1.6 Limpar o tabuleiro ----------
// Objetivo: uma operação do tabuleiro que devolve as 9 casas a 'null',
// para começar uma nova rodada.

// Perguntas (responda antes de digitar)
// 1. Quem executa a limpeza: o tabuleiro ou quem o chama? Por quê?
//    R: O tabuleiro executa com uma função que está dentro dele.
//    Pois há uma closure que só o tabuleiro tem acesso.
// 2. O laço que cria as 9 casas já existe na IIFE. Se eu copiar esse laço dentro da
//    limpeza, o que acontece no dia em que o tabuleiro mudar de tamanho?
//    Como evitar repetir o mesmo código em dois lugares?
//    R: Se o tabuleiro mudar de tamanho a limpeza não alcança o novo tamanho.
//    Não repito o mesmo código, mas passo um novo loop com forEach item do tabuleiro.
// 3. Há duas formas de pensar: (a) trocar o array por um novo cheio de null;
//    (b) mudar os valores dentro do mesmo array. Qual escolho e por quê?
//    R: O segundo. Pois o array já está criado, basta passar uma função que modifica todos itens
//    que já existem.
// 4. A limpeza pode falhar? Ela precisa devolver true/false como a mark?
//    R: Não. Ela não precisa devolver pois sempre executará o código de limpeza.
// 5. Nome da operação (mesmo idioma de gameTable, table e mark):
//    R: clear

// PREVER:
// - Marco as posições 0, 4 e 8, limpo e leio o tabuleiro: tudo marcará como null
// - Depois de limpar, ele é idêntico ao inicial (9 casas, todas null)? Deve ser
// - Depois de limpar, marcar a posição 4 de novo retorna: o que foi marcado
// - Limpar um tabuleiro que já estava vazio resulta em: o mesmo tabuleiro todo null

// FAZER ↓
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

// CONFERIR: apareceu o item marcado . Bateu com a previsão? Não

// EXPLICAR (uma frase): por que a limpeza fica dentro do tabuleiro e não fora?
// Pois ela precisa ter acesso às variáveis do ambiente que quem está de fora não possui.
// É uma 'closure'.

// COMMIT: "adiciona limpeza do tabuleiro"

// ---------- Fechamento da Fase 1 ----------
// Antes de passar para os jogadores, confira em sequência, só pelo console:
// - tabuleiro novo tem 9 casas null;
// - mark aceita jogada válida (true) e recusa inválida e ocupada (false), sem alterar nada;
// - table devolve cópia (alterar a cópia não muda o tabuleiro);
// - limpar volta ao estado inicial e o tabuleiro continua jogável.
// Se tudo passar, marque a Fase 1 como concluída no TODO e faça o commit.

// ============================================================
// FASE 2 — JOGADORES E TURNOS (só console, sem DOM)
// ============================================================
// Pergunta guia: por que o jogador é uma factory e o tabuleiro é uma IIFE?
// Etapas: 2.1 factory de jogador | 2.2 jogador atual | 2.3 passar a vez
//         2.4 estado da rodada   | 2.5 controlador do jogo

// ---------- 2.1 Factory de jogador ----------
// Objetivo: uma função que cria jogadores (nome e marca) e devolve um objeto
// novo a cada chamada. Criar os dois: um com 'X' e outro com 'O'.

// Perguntas (responda antes de digitar)
// 1. Qual a diferença entre a IIFE do tabuleiro e uma factory? Quando cada uma roda e quantas vezes?
//    R: A IIFE é executada imediatamente e uma vez somente.
//    A factory é uma função que fabrica objetos. Ela irá ser executada duas vezes, uma para cada jogador.
// 2. O que a factory recebe e o que ela devolve?
//    R: Recebe o nome e a marca do jogador e devolve um objeto com os dois valores.
// 3. A marca de um jogador não pode mudar depois de criado. Como o objeto devolvido
//    pode mostrar nome e marca sem permitir trocar a marca de fora? Lembre da 1.2.
//    R: Retorna uma função que lê uma constante que está numa closure (executada na criação e não mais alterada por fora).
// 4. E se o nome vier vazio ou só com espaços? Decida quem aplica a regra
//    ("Jogador X" / "Jogador O"): a factory ou a interface? Por quê?
//    R: Se vier vazio, a interface valida se aceita ou não o conteúdo como parâmetro, para que a factory só execute.
// 5. Nome da factory (convenção, mesmo idioma do restante do código):
//    R: createPlayer

// PREVER:
// - Crio dois jogadores e os imprimo: playerX = {name: 'Lucas', mark: 'X'}; playerO = {name: 'Ana', mark: 'O'}
// - Tento trocar a marca de um deles por fora e leio de novo: Não altera pois há proteção.
// - Crio um terceiro jogador: o que impede de ele ter a mesma marca de outro?
//   Nada. Enquanto não houver algo que cheque e valide, será possível criar infinitas funções com a marca
//   que for desejada.

// FAZER ↓

// CONFERIR: apareceu 2 objects, com as marcações que previ . Bateu com a previsão? Sim

// EXPLICAR (uma frase): por que jogador é factory e tabuleiro é IIFE? Jogador será criado mais de uma vez, tabuleiro somente uma.

// COMMIT: "cria factory de jogadores"

// ---------- 2.2 Guardar o jogador atual ----------
// Objetivo: o jogo sabe quem é o jogador da vez (X começa) e só o dono dessa
// informação pode mudá-la. Ainda SEM passar a vez (isso é a 2.3).

// Perguntas (responda antes de digitar)
// 1. Onde fica a informação "jogador da vez": no tabuleiro, no jogador ou no fluxo do jogo? Por quê?
//    (Lembre do plano dos 3 objetos no começo do arquivo.)
//    R: No fluxo do jogo, pois ele que controla quem joga e só ele deve ser capaz de alterar.
// 2. Quem pode apenas LER essa informação? Quem pode MUDAR? Como o objeto do fluxo
//    mostra a leitura sem permitir a escrita de fora? (mesma ideia da 1.2)
//    R: O fluxo lê a informação de quem é a vez. Quem muda é somente o fluxo.
//    O objeto permitirá a leitura e não a escrita por fora a partir de closures.
// 3. O fluxo precisa conhecer os dois jogadores. Ele os cria lá dentro ou os recebe de fora?
//    O que ganho recebendo de fora?
//    R: Ele os recebe de fora após eles serem criados pela interação com o formulário.
//    Ao receber de fora, o fluxo só chama os jogadores, eu divido as responsabilidades.
//    Dentro de fluxo deve haver uma função que recebe os parâmetros (markPlayer) do formulário após
//    interação com a interface e atualiza duas variáveis
//    dentro de gameFlow - playerX e playerO que existem como null. Depois marca currentPlayer como playerX.
// 4. Quem é o jogador da vez no início? Como garantir isso também quando a rodada for reiniciada?
//    R: Inicia-se com o jogador X. Caso a jogada seja aceita e passa para o outro jogador. Se não for aceita, permanece o mesmo jogador.
//    Se X e aceita >> O. Se X e recusada >> X. Se O e aceita >> X, Se O e recusada >> O. Sempre ao fim do jogo, reinicia-se o jogador inicial.
// 5. Esse objeto é uma IIFE ou uma factory? Por quê?
//    R: É uma IIFE, que é executada imediatamente e uma vez somente.
// 6. Nome da operação de leitura e nome do objeto (mesmo idioma do restante):
//    R: objeto = gameFlow; getPlayer = expõe o jogador da vez.

// PREVER:
// - Logo que o fluxo é criado, o jogador da vez é: X
// - Tento trocar o jogador da vez por fora e leio de novo: Não é possível trocar
// - Leio duas vezes seguidas sem fazer nenhuma jogada: Permanece o jogador.
// - Leio o jogador da vez antes de os jogadores serem registrados: A leitura devolve undefined.

// FAZER ↓

const createPlayer = function (_name, _mark) {
  let name = _name;
  let mark = _mark;
  const player = function () {
    return { name, mark };
  };
  return { player };
};

let playerX = createPlayer("Lucas", "X");
let playerO = createPlayer("Ana", "O");

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
    return { ...currentPlayer };
  }

  return { getPlayer, markPlayer };
})();

console.log(gameFlow.getPlayer());

// CONFERIR: apareceu ___ . Bateu com a previsão? ___

// EXPLICAR (uma frase): por que essa informação fica no fluxo e não no tabuleiro? ___

// COMMIT: "guarda o jogador atual no fluxo do jogo"

// ---------- 2.3 a 2.5 (roteiros quando chegar a hora) ----------
// 2.3 Passar a vez | 2.4 Estado da rodada | 2.5 Controlador do jogo
