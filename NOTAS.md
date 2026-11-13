# Notas de estudo — Tic Tac Toe

Aqui ficam as perguntas, previsões, conferências e explicações de cada tarefa. O `script.js` guarda só o código.

**Como usar:** cada tarefa nova ganha uma seção neste arquivo. Responda as perguntas e preencha o PREVER aqui, escreva o código no `script.js`, volte para preencher o CONFERIR e o EXPLICAR. Códigos antigos continuam no histórico do Git (`git log`, `git show <commit>:script.js`).

## Índice

- [Plano](#plano)
- [Fase 1 — Tabuleiro](#fase-1--tabuleiro): 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, fechamento
- [Fase 2 — Jogadores e turnos](#fase-2--jogadores-e-turnos): 2.1, 2.2, 2.3, 2.4 (código funcionando; faltam testes e CONFERIR), 2.5 (roteiro pronto)

---

## Plano

**Regras:** pouco código global. Tabuleiro e fluxo são IIFE (existem uma vez); jogadores são criados por factory (são dois). Primeiro tudo no console, sem DOM.

**O jogo**

- 2 jogadores e um tabuleiro de 9 casas, todas `null` no início.
- Cada jogador, na sua vez, marca uma casa vazia com a sua marca.
- Vence quem primeiro preencher 3 casas com a mesma marca (linha, coluna ou diagonal).
- Tabuleiro cheio sem vencedor: velha.

**Closure:** função interna que continua lembrando as variáveis da função externa, mesmo depois de a externa terminar. A variável fica escondida de fora e só as funções internas devolvidas (os métodos) conseguem usá-la.

**Os 3 objetos**

- **Jogador (factory):** sabe nome e marca ('X' ou 'O').
- **Tabuleiro (IIFE):** sabe as 9 casas (array, índice = posição, valor = marca ou `null`). Marca uma casa vazia e responde `true` (aceitou) ou `false` (recusou).
- **Fluxo do jogo (IIFE):** sabe de quem é a vez (X começa), o placar e se a rodada acabou. Na jogada: chama o tabuleiro; se aceitou, confere vitória e velha; se a rodada continua, passa a vez. Depois do fim, bloqueia jogadas.

---

## Fase 1 — Tabuleiro

### 1.1 Criar o tabuleiro

**Objetivo:** tabuleiro com 9 casas `null`, dentro de uma IIFE.

**Perguntas**

1. O que é uma IIFE e o que ela devolve?
   - R: Função executada na hora em que é criada, no formato `(() => { ... })()`. Devolve: o `return` dentro de `{}`.
2. Onde fica o array das casas e quem o enxerga?
   - R: Em uma variável dentro da IIFE. Só as funções internas a enxergam.
3. Se o array é privado, como conferir o tabuleiro na 1.1, antes da leitura (1.2)?
   - R: Guardar a IIFE em uma variável retornando um objeto para essa variável com um método de leitura (`console.log`) do que foi desenvolvido ali.

**Prever:** se eu olhar o tabuleiro agora, vejo `undefined`, pois está oculta — mas se retorno o que foi desenvolvido dentro da arrow function dentro da IIFE, consigo ler o tabuleiro, que deve ser devolvido como um array de 9 elementos `null` (índices de 0 a 8).

**Conferir:** apareceu a array impressa pelo método. Bateu com a previsão? Sim.

**Explicar:** por que o tabuleiro é IIFE e não factory? Pois será uma função executada somente uma vez e não precisará ser reutilizada para criar novas funções como uma factory é.

**Commit:** `cria tabuleiro com nove casas vazias`

### 1.2 Ler o estado do tabuleiro

**Objetivo:** uma operação de leitura que mostra as casas, mas NÃO permite alterar o tabuleiro de fora.

**Experimento (no `rascunho.js`)**

- A) Função com um array privado e um método que devolve o PRÓPRIO array. Altere uma posição do resultado, fora da função, e leia de novo.
- B) Repita devolvendo uma CÓPIA do array.
- Previsão: no A eu espero a array modificada; no B eu espero a cópia da array original como na maneira que foi inicialmente criada.
- Depois de rodar: aconteceu o que esperava.

**Perguntas**

1. Por que, no A, o tabuleiro muda mesmo com o array "escondido"?
   - R: Porque a variável recebe a array original como referência. Mudá-la por fora, muda ela por dentro.
2. O que é uma cópia do array e como ela difere de outra variável apontando para o mesmo array?
   - R: Com `b = a`, `a` e `b` são dois nomes para o MESMO array: mudar um muda o outro. Com `[...a]`, nasce um array NOVO com os mesmos valores: mudar a cópia não afeta o original.
3. Por que uma cópia rasa basta aqui? (o que o array guarda: textos, `null` ou objetos?)
   - R: Basta pois não há objetos, somente uma propriedade primitiva. Se fosse objeto, ambas arrays apontariam para a mesma referência e alterar uma também alteraria outra.
4. O `print` da 1.1 continua necessário depois da leitura? Mantenho, troco ou removo?
   - R: Desnecessário, já que foi visto que o retorno é do que se queria.

**Prever:** se eu ler o tabuleiro, mudar a posição 4 da cópia e ler de novo, a casa 4 do tabuleiro vai estar `null`.

**Conferir:** apareceu `'X'` na primeira e `null` na segunda chamada. Bateu com a previsão? Sim.

**Explicar:** por que a leitura devolve uma cópia? Pois caso devolvesse a array original, essa array poderia ser modificada por fora da função, o que não é desejável.

**Commit:** `adiciona leitura do tabuleiro sem expor o array`

### 1.3 Marcar uma casa

**Objetivo:** uma operação do tabuleiro que recebe a posição e a marca e coloca a marca nessa posição do array. Ainda SEM validação (1.4) e SEM responder `true`/`false` (1.5).

**Perguntas**

1. Onde essa operação deve ficar: dentro da IIFE ou fora? Por quê?
   - R: Dentro da IIFE. Será executada uma vez na criação e posteriormente será acessada.
2. Quais dois dados ela precisa receber?
   - R: Recebe como parâmetros a posição e a marca do player que irá inserir naquela posição.
3. Ela altera o `arr` original ou uma cópia? Lembre da 1.2.
   - R: O original, posteriormente uma cópia é servida.
4. O que muda no `return { table }` para a operação poder ser chamada de fora?
   - R: Acrescenta-se uma vírgula e retorna-se uma função (método).
5. Nome da operação (mesmo idioma de `gameTable` e `table`):
   - R: Darei o nome de `play` (depois renomeada para `mark`).

**Prever**

- Marco a posição 4 com 'X' e leio o tabuleiro: a posição 4 mostra 'X'.
- Marco a posição 4 de novo com 'O' (ainda sem validação): a posição 4 fica 'O'.

**Conferir:** apareceu 'X' e depois 'O'. Bateu com a previsão? Sim, nos dois casos.

**Explicar:** por que a marcação acontece dentro do tabuleiro e não fora? A marcação ocorre dentro de `gameTable` (tabuleiro) pois é lá que vive a array original que será modificada.

**Commit:** `adiciona operação de marcar casa no tabuleiro`

### 1.4 Recusar jogadas inválidas

**Objetivo:** a operação de marcar NÃO altera o tabuleiro quando a posição é inválida ou a casa já está ocupada. Ainda sem responder `true`/`false` (1.5).

**Passo 1 — Prever antes de proteger (versão sem validação)**

| Caso            | O que eu espero que a marcação faça hoje | O que aconteceu              |
| --------------- | ---------------------------------------- | ---------------------------- |
| casa já ocupada | Remarca a casa                           | Remarcou a casa.             |
| posição -1      | Cria uma propriedade                     | Criou a propriedade.         |
| posição 9       | Aumenta o tamanho da array               | Aumentou o tamanho da array. |
| posição "abc"   | Não marque                               | Não marcou.                  |
| posição 1.5     | Não marque                               | Não marcou.                  |

Atenção: nem todo efeito aparece na leitura (que devolve uma cópia). Como enxergar também o que ficou "estranho" dentro do array? — _Não entendi._ (Explicado depois: um array é um objeto; `arr[-1] = 'X'` cria uma propriedade, que a cópia com spread não mostra.)

**Perguntas**

1. Que condições uma posição precisa cumprir para ser válida?
   - R: Number maior ou igual a zero e menor que length. Casa igual a `null`.
2. Em que ordem verificar? Checar "casa vazia" antes da faixa muda o resultado? (o que `arr[9]` devolve?)
   - R: Primeiro verifico se é um number e se está dentro do que espero (`>=0 && < arr.length`), depois se é integer, por fim se está vazio ou não. Creio que não mudaria o resultado, `arr[9]` retornaria `undefined`.
3. Como interromper a função sem alterar nada quando a jogada é inválida?
   - R: Com `return`.
4. Pesquise no MDN: `Number.isInteger`. Ele resolve quais dos cinco casos?
   - R: Tanto confirma se é number, como se é integer — casos 4 e 5.
5. Quem deve validar: o tabuleiro ou quem o chama? Por quê?
   - R: O próprio tabuleiro, pois ele que irá modificar ou não a array originalmente criada.

**Prever (depois de proteger):** as cinco tentativas inválidas deixam o tabuleiro com a `arr` inicial (todas `null`).

**Conferir:** apareceu da forma prevista. Bateu com a previsão? Sim.

**Explicar:** por que o tabuleiro valida em vez de confiar em quem o chama? Pois é ele que salvará a array com as posições corretas das jogadas, não podendo depender de quem o chama, já que esse que o chama pode passar parâmetros inválidos.

**Commit:** `recusa jogadas inválidas no tabuleiro`

### 1.5 Informar o resultado da jogada

**Objetivo:** a marcação passa a responder `true` (marcou) ou `false` (recusou). O tabuleiro só informa; quem o chama decide o que fazer (ex.: passar a vez).

**Perguntas**

1. O que o fluxo do jogo vai fazer com um `true`? E com um `false`?
   - R: Com um `true` ele confere se há uma vitória ou velha, se não houver, passa a vez.
2. Por que é melhor o tabuleiro apenas informar do que decidir sozinho o que fazer depois?
   - R: O tabuleiro só informa pois quem controla o fluxo é outra função, que chama o tabuleiro ao sinal de `true`.
3. Hoje a `mark` não tem `return` com valor. O que ela devolve quando é chamada?
   - R: Retorna `undefined`.
4. Se ela devolvesse `undefined` na jogada recusada, seria o mesmo que `false`?
   - R: Não, apesar de `if (undefined)` ser falso, `undefined` não é igual a `false`.
5. Quais são os dois caminhos dentro da função (marcou / recusou)? Quantos `return` e onde?
   - R: São dois caminhos, um quando há o `true` no `if` com um `return` no fim, outro caso esse `if` não seja executado.

**Prever** (estado antes de implementar)

| Caso                     | Retorno esperado | A casa mudou? |
| ------------------------ | ---------------- | ------------- |
| marcar 4 com 'X' (vazia) | undefined        | Sim           |
| marcar 4 de novo com 'O' | undefined        | Não           |
| posição -1               | undefined        | Não           |
| posição 9                | undefined        | Não           |
| posição "abc"            | undefined        | Não           |
| posição 1.5              | undefined        | Não           |

**Conferir:** os retornos foram `true` e `false`. Bateu com a previsão? _(Anotado "Sim", mas a previsão era `undefined`: o resultado mudou porque o código mudou.)_

**Explicar:** por que a marcação devolve `true`/`false` em vez de passar a vez sozinha? Pois passar a vez não é dever do tabuleiro, mas sim de outra função que controla o jogo.

**Commit:** `tabuleiro informa se a jogada foi aceita`

### 1.6 Limpar o tabuleiro

**Objetivo:** uma operação do tabuleiro que devolve as 9 casas a `null`, para começar uma nova rodada.

**Perguntas**

1. Quem executa a limpeza: o tabuleiro ou quem o chama? Por quê?
   - R: O tabuleiro executa com uma função que está dentro dele. Pois há uma closure que só o tabuleiro tem acesso.
2. O laço que cria as 9 casas já existe na IIFE. Se eu copiar esse laço dentro da limpeza, o que acontece no dia em que o tabuleiro mudar de tamanho? Como evitar repetir o mesmo código?
   - R: Se o tabuleiro mudar de tamanho a limpeza não alcança o novo tamanho. Não repito o mesmo código, mas passo um novo loop com `forEach` item do tabuleiro.
3. (a) trocar o array por um novo cheio de `null` ou (b) mudar os valores dentro do mesmo array?
   - R: O segundo. Pois o array já está criado, basta passar uma função que modifica todos itens que já existem.
4. A limpeza pode falhar? Ela precisa devolver `true`/`false` como a `mark`?
   - R: Não. Ela não precisa devolver pois sempre executará o código de limpeza.
5. Nome da operação:
   - R: `clear`

**Prever**

- Marco as posições 0, 4 e 8, limpo e leio o tabuleiro: tudo marcará como `null`.
- Depois de limpar, ele é idêntico ao inicial (9 casas, todas `null`)? Deve ser.
- Depois de limpar, marcar a posição 4 de novo retorna: _(o que foi marcado — corrigir: a `mark` devolve `true`)_.
- Limpar um tabuleiro que já estava vazio resulta em: o mesmo tabuleiro todo `null`.

**Conferir:** primeira tentativa: apareceu o item marcado (não bateu — o `forEach` mexia numa cópia do valor). Depois de usar a posição (`index`) no `forEach`, funcionou.

**Explicar:** por que a limpeza fica dentro do tabuleiro e não fora? Pois ela precisa ter acesso às variáveis do ambiente que quem está de fora não possui. É uma 'closure'.

**Commit:** `adiciona limpeza do tabuleiro`

### Fechamento da Fase 1

Conferido em sequência, só pelo console:

- tabuleiro novo tem 9 casas `null`;
- `mark` aceita jogada válida (`true`) e recusa inválida e ocupada (`false`), sem alterar nada;
- `table` devolve cópia (alterar a cópia não muda o tabuleiro);
- limpar volta ao estado inicial e o tabuleiro continua jogável.

---

## Fase 2 — Jogadores e turnos

**Pergunta guia:** por que o jogador é uma factory e o tabuleiro é uma IIFE?

**Etapas:** 2.1 factory de jogador | 2.2 jogador atual | 2.3 passar a vez | 2.4 estado da rodada | 2.5 controlador do jogo

### 2.1 Factory de jogador

**Objetivo:** uma função que cria jogadores (nome e marca) e devolve um objeto novo a cada chamada. Criar os dois: um com 'X' e outro com 'O'.

**Perguntas**

1. Qual a diferença entre a IIFE do tabuleiro e uma factory? Quando cada uma roda e quantas vezes?
   - R: A IIFE é executada imediatamente e uma vez somente. A factory é uma função que fabrica objetos. Ela irá ser executada duas vezes, uma para cada jogador.
2. O que a factory recebe e o que ela devolve?
   - R: Recebe o nome e a marca do jogador e devolve um objeto com os dois valores.
3. A marca de um jogador não pode mudar depois de criado. Como o objeto devolvido pode mostrar nome e marca sem permitir trocar a marca de fora?
   - R: Retorna uma função que lê uma constante que está numa closure (executada na criação e não mais alterada por fora).
4. E se o nome vier vazio ou só com espaços? Quem aplica a regra ("Jogador X" / "Jogador O"): a factory ou a interface?
   - R: Se vier vazio, a interface valida se aceita ou não o conteúdo como parâmetro, para que a factory só execute.
5. Nome da factory:
   - R: `createPlayer`

**Prever**

- Crio dois jogadores e os imprimo: `{name: 'Lucas', mark: 'X'}` e `{name: 'Ana', mark: 'O'}`.
- Tento trocar a marca de um deles por fora e leio de novo: não altera pois há proteção.
- Crio um terceiro jogador: o que impede de ele ter a mesma marca de outro? Nada. Enquanto não houver algo que cheque e valide, será possível criar infinitas funções com a marca que for desejada.

**Conferir:** apareceu 2 objetos, com as marcações que previ. Bateu com a previsão? Sim.

**Explicar:** por que jogador é factory e tabuleiro é IIFE? Jogador será criado mais de uma vez, tabuleiro somente uma.

**Commits:** `cria factory de jogadores`, `finaliza parte 2.1`, `torna a marca do jogador fixa com closure`

### 2.2 Guardar o jogador atual

**Objetivo:** o jogo sabe quem é o jogador da vez (X começa) e só o dono dessa informação pode mudá-la. Ainda SEM passar a vez (2.3).

**Perguntas**

1. Onde fica a informação "jogador da vez"?
   - R: No fluxo do jogo, pois ele que controla quem joga e só ele deve ser capaz de alterar.
2. Quem pode apenas LER? Quem pode MUDAR? Como o objeto do fluxo mostra a leitura sem permitir a escrita de fora?
   - R: O fluxo lê a informação de quem é a vez. Quem muda é somente o fluxo. O objeto permitirá a leitura e não a escrita por fora a partir de closures.
3. O fluxo precisa conhecer os dois jogadores. Ele os cria lá dentro ou os recebe de fora?
   - R: Ele os recebe de fora após eles serem criados pela interação com o formulário. Ao receber de fora, o fluxo só chama os jogadores, eu divido as responsabilidades. Dentro do fluxo deve haver uma função que recebe os parâmetros (`markPlayer`) do formulário após interação com a interface e atualiza duas variáveis dentro de `gameFlow` — `playerX` e `playerO`, que existem como `null`. Depois marca `currentPlayer` como `playerX`.
4. Quem é o jogador da vez no início? Como garantir isso também quando a rodada for reiniciada?
   - R: Inicia-se com o jogador X. Caso a jogada seja aceita, passa para o outro jogador. Se não for aceita, permanece o mesmo jogador. Se X e aceita → O. Se X e recusada → X. Se O e aceita → X. Se O e recusada → O. Sempre ao fim do jogo, reinicia-se o jogador inicial.
5. Esse objeto é uma IIFE ou uma factory? Por quê?
   - R: É uma IIFE, que é executada imediatamente e uma vez somente.
6. Nome da operação de leitura e nome do objeto:
   - R: objeto = `gameFlow`; `getPlayer` = expõe o jogador da vez.

**Prever**

- Logo que o fluxo é criado, o jogador da vez é: X.
- Tento trocar o jogador da vez por fora e leio de novo: não é possível trocar.
- Leio duas vezes seguidas sem fazer nenhuma jogada: permanece o jogador.
- Leio o jogador da vez antes de os jogadores serem registrados: a leitura devolve `null`.

**Conferir:**

1. Logo que o fluxo é criado, jogadores são null, pois markPlayer ainda não foi chamado.
2. Certo, não é possível trocar pois os valores estão protegidos.
3. Certo.
4. Devolve null por um if else construído com esse objetivo, caso contrário retornaria um objeto vazio, já que o que retorna é uma cópia do objeto original (para fins de proteção)

**Explicar:** por que essa informação fica no fluxo e não no tabuleiro?
Pois é o fluxo que recebe os jogadores e retém as informações, tabuleiro somente recebe as jogadas e altera as marcações.

**Commit sugerido:** `guarda o jogador atual no fluxo do jogo`

### 2.3 Passar a vez

**Objetivo:** uma operação do fluxo que troca o jogador da vez pelo outro. Nesta tarefa ela é chamada "à mão", nos testes; ligá-la ao tabuleiro (passar a vez só quando a jogada for aceita) é a 2.5.

**Perguntas** (responda antes de digitar)

1. Como o fluxo descobre quem é o "outro" jogador a partir do atual? Compare duas formas: pelo nome ou pela marca. Qual é mais segura? (Pense: e se os dois jogadores tiverem o mesmo nome?)
   - R: Comparar pela 'marca', que sempre será X ou O.
2. O fluxo precisa guardar também o "próximo jogador", ou dá para saber a partir do atual e dos dois jogadores que ele já tem?
   - R: Não precisa guardar o próximo jogador, visto que são apenas dois jogadores e que ao aceitar a jogada o próximo jogador será necessariamente o outro.
3. O que a operação deve fazer se for chamada antes de os jogadores serem registrados (`currentPlayer` é `null`)? Lembre da validação da 1.4.
   - R: não deverá ser executada - `return false`.
4. Essa operação pode falhar? Se sim, ela devolve `true`/`false` como a `mark`, ou nada como a `clear`? Por quê?
   - R: Sim e deve devolver algo para avisar a quem o chama.
5. Quando ela deve ser chamada na jogada real: após jogada aceita, recusada, ou sempre? (Ligação com o tabuleiro: 2.5.) Na 2.3 o que simula uma jogada recusada?
   - R: Após a jogada aceita. A operação retorna `false`.
6. Nome da operação (mesmo idioma do restante):
   - R: nextPlayer.

**Prever** (preencha ANTES de rodar; jogadores já registrados, X começa)

--| Situação -----------------------------------------| Jogador da vez |
1.| Logo depois de registrar ------------------------ | X |
2.| Depois de passar a vez 1 vez -------------------- | O |
3.| Depois de passar a vez 2 vezes ------------------ | X |
4.| Depois de passar a vez 3 vezes ------------------ | O |
5.| Jogada recusada (não chamo a operação) ---------- | Repete |
6.| Operação chamada antes do registro -------------- | Não executa, retorna false |
7.| Alterar por fora o objeto lido e ler de novo ---- | não altera o jogador |

**Conferir:**

1. Sim
2. Sim
3. Sim
4. Sim
5. Errado, pois ao mostrar o console.log do nextPlayer, ele executa retorna o true que eu esperava mas ao mesmo tempo muda o mark que deveria repetir. Depois de separar a chamada do console.log, bateu.
6. Agora correto, precisei realizar o teste antes de executar o markPlayer, pois após a execução os players recebem valores assim como currentPlayer, o que faz com que a função retorne true.
7. Não altera pois por mais que crie-se a propriedade currentPlayer em gameFlow, a closure não é alterada pois só existe dentro da função e não é retornada no final.

**Explicar** (uma frase): por que quem troca a vez é o fluxo e não o jogador?
Pois é o fluxo que controla todo o jogo. Ele que verifica se a jogada foi aceita ou não para poder trocar a vez do jogador.

**Commit sugerido:** `adiciona troca de jogador da vez ao fluxo`

### 2.4 Estado da rodada

**Objetivo:** o fluxo passa a saber em que fase a rodada está (não iniciada, em andamento, encerrada) e a dizer quais operações valem em cada fase. Nesta tarefa o estado é mudado "à mão", nos testes; quem muda o estado na jogada real é o controlador (2.5) e a vitória/empate (Fase 3).

**Perguntas** (responda antes de digitar)

1. Como representar os três estados? Compare duas formas: textos (`"waiting"`, `"playing"`, `"over"`) ou números (`0`, `1`, `2`). Qual é mais fácil de ler e de errar menos? (Pense: o que acontece se você digitar `"plaing"`?)
   - R: É mais fácil de errar utilizando números. Iremos utilizar estados com strings.
2. Em que estado o fluxo começa? E em que momento ele passa para "em andamento"? (Lembre: `markPlayer` registra os jogadores.)
   - R: Começa em waiting, a partir do momento que markPlayer é chamado e gera os jogadores, passa para `playing`.
3. Para cada estado, quais operações devem ser **bloqueadas**? Complete a tabela abaixo antes de escrever qualquer código.
   - R: (tabela do PREVER)
4. Quem pode **ler** o estado e quem pode **mudá-lo**? Lembre da 2.2: como o objeto do fluxo permite a leitura sem permitir a escrita de fora?
   - R: O próprio fluxo lê o estado e chama a operação correta a partir do que lê. Só o fluxo altera o estado da jogada.
5. Quando uma operação é bloqueada, o que ela devolve? Siga o padrão que você já usa (`true`/`false`) ou outro? Por quê?
   - R: Será `false`, para seguir o padrão do que já está sendo construído.
6. O que acontece com o estado quando a rodada é reiniciada (`clear` do tabuleiro)? Quem avisa o fluxo? (Só pense; a ligação é a 2.5.)
   - R: Volta a ser `waiting` .
7. Nomes: da variável do estado, da operação que **lê** o estado e da que **muda** o estado (mesmo idioma do restante):
   - R: roundStatus, getRoundStatus e roundChange.

**Prever** (preencha ANTES de rodar)

Complete a coluna do meio com "pode" ou "bloqueia" e escreva, na última, o que a operação devolve.

| Operação ------------------ | Não iniciada | Em andamento | Encerrada |
| `getPlayer` (ler a vez) --- | bloqueia | pode | pode |
| `nextPlayer` (passar a vez) | bloqueia | pode | bloqueia |
| jogar numa casa ----------- | não bloqueia | pode | não bloqueia |
| `markPlayer` (registrar) -- | pode | bloqueia | bloqueia |

Mais previsões:

- Logo que o fluxo é criado, o estado é: (waiting)
- Logo depois de `markPlayer`, o estado é: (playing)
- Mudo o estado para "encerrada" e chamo `nextPlayer`: devolve false
- Tento mudar o estado por fora (`gameFlow.estado = ...`) e leio de novo: o status que já possuía
- Peço um estado que não existe (texto errado) à operação que muda: retorna false

**Fazer** (no `script.js`, dentro do `gameFlow`)

- [x] Guardar o estado numa variável privada do closure.
- [x] Criar a operação que **lê** o estado.
- [x] Criar a operação que **muda** o estado (valida o valor recebido: só aceita os três estados).
- [x] Fazer `nextPlayer` respeitar o estado (bloqueia quando a rodada está encerrada, no mínimo).
- [x] Testes provisórios da 2.4 com rótulos nos `console.log` e o retorno guardado em variável (lembre do bug do Teste 4 da 2.3).

**Conferir:**
R: as conferências bateram. Antes de iniciar chamar markPlayer e iniciar com currentPlayer, getPlayer e nextPlayer são bloqueados. mark de gameTable não é, pois gameTable não tem acesso ao status da jogada que está em gameFlow. markPlayer não é bloqueado pois é justamente o que altera o status para "playing". Após o início da jogada, tudo é autorizado a rodar, exceto markPlayer, pois os jogadores já foram criados. Após o término para 'over', nextPlayer e markPlayer são bloqueados para rodar.

**Explicar** (uma frase): por que o estado da rodada fica no fluxo e não no tabuleiro?
R: Pois é o estado que serve de parâmetro para trocar ou não o jogador e ele precisa estar visível para quem irá chamar a jogada que é o fluxo.

**Commit sugerido:** `adiciona estado da rodada ao fluxo`

### 2.5 Controlador do jogo

**Objetivo:** juntar as peças que você já tem. Uma operação recebe uma posição, pede ao tabuleiro para marcar com a marca do jogador da vez e **só passa a vez se o tabuleiro aceitou**. Vitória e empate NÃO entram aqui (Fase 3).

**Você já tem tudo que precisa:** `gameTable.mark(posição, marca)` devolve `true`/`false`; `gameFlow.getPlayer()` diz quem joga; `gameFlow.nextPlayer()` passa a vez; `gameFlow.getRoundStatus()` diz se a rodada está em andamento. Esta tarefa é só **ligar** isso, sem inventar nada novo. Faça em 3 passos pequenos (cada um cabe em uma sessão curta).

**Perguntas** (responda antes de digitar)

1. Onde mora a nova operação: dentro do `gameFlow` (que já tem jogadores, vez e estado) ou em um objeto novo? Pense: o que cada opção obriga você a escrever a mais? (Pelo Plano no começo deste arquivo, quem coordena a jogada é o fluxo.)
   - R: \_\_\_
2. O que a operação recebe? Que informação ela precisa pedir ao fluxo e ao tabuleiro para marcar a casa? De onde vem a marca ("X" ou "O")?
   - R: \_\_\_
3. Ordem dos passos: (a) marcar no tabuleiro, (b) passar a vez, (c) conferir o estado da rodada. Em que ordem devem acontecer e por quê? O que dá errado se (b) vier antes de (a)?
   - R: \_\_\_
4. A rodada não está em andamento (`"waiting"` ou `"over"`). A operação chega a chamar o tabuleiro? O que devolve? Por quê?
   - R: \_\_\_
5. O tabuleiro recusa a jogada (casa ocupada ou posição inválida). A vez passa? O que a operação devolve? (Lembre da tabela X/O + aceita/recusada da 2.2.)
   - R: \_\_\_
6. O que a operação devolve quando tudo dá certo? Siga o padrão que você já usa.
   - R: \_\_\_
7. Nome da operação (mesmo idioma do restante):
   - R: \_\_\_

**Prever** (preencha ANTES de rodar; jogadores Lucas = X e Ana = O já registrados, rodada em andamento)

Este é o teste "4 jogadas, uma inválida" da conferência da Fase 2.

| Passo -------------------------- | Devolve | Vez de quem depois | Casa fica |
| 1. X joga na casa 0 ------------ | \_\_\_ | \_\_\_ | \_\_\_ |
| 2. O joga na casa 0 (ocupada) -- | \_\_\_ | \_\_\_ | \_\_\_ |
| 3. O joga na casa 4 ------------ | \_\_\_ | \_\_\_ | \_\_\_ |
| 4. X joga na posição 9 (fora) -- | \_\_\_ | \_\_\_ | \_\_\_ |
| 5. X joga na casa 8 ------------ | \_\_\_ | \_\_\_ | \_\_\_ |

Mais previsões:

- Chamo a operação antes de registrar os jogadores: \_\_\_
- Mudo o estado para `"over"` e chamo a operação: devolve \_\_\_ e o tabuleiro \_\_\_
- Chamo duas vezes seguidas na mesma casa: o que a 2ª devolve e de quem é a vez? \_\_\_

**Fazer** (um passo por vez; rode e compare com o PREVER antes de seguir)

- [ ] **2.5a** Jogada feliz: marca a casa e passa a vez (só o caminho em que tudo dá certo).
- [ ] **2.5b** Recusas: rodada fora de andamento e casa recusada (a vez não muda).
- [ ] **2.5c** Testes da tabela acima, com rótulos e retornos guardados em variável.

**Conferir:** \_\_\_

**Explicar** (uma frase): por que a vez só passa depois de o tabuleiro aceitar a jogada? \_\_\_

**Commit sugerido:** `liga tabuleiro e fluxo na operação de jogar`

**Fica para depois (não faça agora):** reiniciar a rodada e as validações abaixo. Só entram se sobrar fôlego; a Fase 3 não depende delas.

**Pendências de validação trazidas das tarefas anteriores** (resolver aqui ou antes):

- **`markPlayer` não valida o que recebe.** Se um dos argumentos for `null` (ou não tiver `.player()`), a linha `_playerX.player()` quebra com `TypeError: Cannot read properties of null`. Achado no Teste 6 da 2.3, quando `markPlayer(null, null)` derrubou o script. Pergunta: o que `markPlayer` deveria fazer com argumentos inválidos? Devolver `false` como a `mark`?
- **Marcas duplicadas.** Nada impede registrar dois jogadores com a mesma marca (dois "X"). Aí `nextPlayer` não alterna direito. Pergunta: quem deve recusar isso, a factory, o `markPlayer` ou a interface?
- **Marca que não é X nem O.** `nextPlayer` já devolve `false` nesse caso, mas o `markPlayer` aceita. Vale recusar na entrada.
- **Nomes vazios.** Delegados à interface (Fase 5), mas conferir que o fluxo se comporta bem com `""`.
- **Reiniciar a rodada.** Definir a operação que devolve a vez ao X e volta o estado para "não iniciada" ou "em andamento", e quem a chama junto com o `clear` do tabuleiro.
