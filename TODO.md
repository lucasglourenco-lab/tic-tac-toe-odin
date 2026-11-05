# TODO — Tic Tac Toe (versão guiada)

Este roteiro foi refeito para você aprender fazendo, em **passos pequenos**. Ele não contém código de solução: contém perguntas, experimentos e critérios de conferência.

## Como usar (leia uma vez)

Cada passo segue o mesmo ciclo. Não pule etapas, é o ciclo que ensina.

1. **Prever** — escreva em um comentário, antes de rodar, o que você espera que aconteça.
2. **Fazer** — escreva o menor código que cumpre o passo.
3. **Conferir** — rode no console e compare com a previsão. Se errou a previsão, anote por quê. Esse é o momento em que você mais aprende.
4. **Explicar** — diga em voz alta (ou em um comentário) por que cada função existe e o que ela devolve.
5. **Commit** — uma mensagem curta, no imperativo (ex.: `adiciona verificação de casa ocupada`).

Regras de ouro:

- **Sessões de 25 minutos** com 5 de pausa. Cabeça pesada? Pare. Descanso também faz parte do aprendizado.
- **Travou por mais de 20 minutos?** Pare e escreva em uma frase: "eu esperava X, aconteceu Y". Traga essa frase ao tutor e peça uma _pergunta_ ou uma _dica_, não a solução.
- **Leia a mensagem de erro inteira** e o número da linha antes de mudar qualquer coisa.
- **Nenhum DOM até a Fase 4.** A lógica deve funcionar sozinha, só pelo console.
- **Um passo por vez.** Marque `[x]` só depois de conferir.

## Mapa das fases

| Fase | Foco                           | Resultado                                            |
| ---- | ------------------------------ | ---------------------------------------------------- |
| 0    | Aquecimento e planejamento     | Você sabe o que vai construir e onde cada coisa mora |
| 1    | Tabuleiro                      | Guarda casas e recusa jogadas inválidas              |
| 2    | Jogadores e turnos             | Alterna a vez corretamente                           |
| 3    | Vitória e empate               | Jogo completo, só no console                         |
| 4    | Interface (DOM)                | O tabuleiro aparece e responde a cliques             |
| 5    | Formulário, placar e resultado | Experiência completa                                 |
| 6    | Revisão e README               | Projeto entregável                                   |

---

## Fase 0 — Aquecimento e planejamento

**Objetivo:** pensar antes de digitar. O enunciado diz que "gastar um tempo planejando facilita muito o resto".

- [x] Ler o enunciado em [project_tic_tac_toe.md](../../../../referencias/curriculo/javascript/organizing_your_javascript_code/project_tic_tac_toe.md) e reescrever, com suas palavras, em 3 frases, o que o jogo precisa fazer.
- [x] Ler a lição de factories e módulos em `odin-lessons/lessons/node-path-javascript-factory-functions-and-the-module-pattern`. Depois, responder sem olhar: _o que é uma closure? Como ela cria uma variável "privada"?_
- [ ] Ler o artigo [Building a house from the inside out](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out).
- [x] Em papel ou comentário, listar **os 3 "objetos" do jogo** (tabuleiro, jogador, controle do jogo) e, para cada um, duas colunas: _o que ele sabe_ (dados) e _o que ele faz_ (operações).
- [x] Decidir e anotar: como será representada uma **casa vazia**? Por que uma única representação em todo o código evita bugs?
- [x] Decidir e anotar: o tabuleiro precisa de um objeto por casa (`{position, value}`) ou basta um array de 9 posições? Qual é o custo de cada escolha?

**Conferência:** consigo explicar o plano a alguém em um minuto, sem olhar as anotações.

### Revisão da Fase 0 (3 de nov.)

**Certo:**

- `null` agora é a única representação de casa vazia (linhas 8 e 17).
- Tabuleiro decidido: array em que índice = posição e valor = marca.
- Os três objetos estão separados e o fluxo é quem confere vitória, passa a vez e bloqueia jogadas depois do fim.
- X começa; nenhuma linha de código foi escrita antes da hora.

**Pendências curtas (resolva antes ou junto da 1.1):**

- [x] **Closure (linha 13).** Está mais próxima, mas ainda mistura duas ideias: _esconder_ (consequência do escopo) e _lembrar_ (o que a closure realmente é). Faça o experimento do contador (função externa que devolve uma função interna que soma 1) e reescreva respondendo: _o que a função interna continua lembrando depois que a externa terminou?_
- [x] **Consultar sem alterar.** _(A previsão "o tabuleiro não muda" estava incorreta: faça o experimento num arquivo de rascunho, fora do `script.js`.)_ Você escreveu "consegue consultar, mas não alterar". Se um método devolver o próprio array do tabuleiro, quem recebe consegue alterá-lo? Teste no console e guarde a resposta para a tarefa 1.2.
- [x] **Linha 10.** Resolvido: "o jogador que primeiro completar (3 casas) com a mesma marca".
- [x] **Dono da `jogar` e redação da linha 18.** Resolvido: a `jogar` pertence ao fluxo, e o bloqueio após vitória ou velha está claro.
- [x] **Lição de closures.** Lida (confirmado por você).
- [x] **Jogador sem nome.** Seu jogador tem só a marca. O formulário da página pede nomes. Onde isso entra?
- [x] **Fim da rodada.** Você bloqueia jogadas depois de uma vitória. E depois de uma velha? Escreva a regra para os dois casos.
- [x] **Custos** _(em andamento: você citou vantagens do array simples; faltam os custos de cada opção e um exemplo concreto de bug com dois valores de "vazio")_: cite um custo de usar array simples e um de usar 9 objetos. E por que uma única representação de "vazio" evita bugs?
- [x] Lição de factories e módulos lida (confirmado por você).
- [x] Atualizar o `script.js`: linha 3 (IIFE para tabuleiro e fluxo, factory para jogadores) e linha 13 (a chamada da função externa devolve um objeto, guardado numa variável).
- [ ] Artigo "Building a house from the inside out" (recomendado, ~10 min; não bloqueia a 1.1).
- [x] **Decisão para a Fase 1:** _(IIFE para tabuleiro e fluxo, factory para jogadores. Falta ajustar a linha 3 do `script.js`.)_ o tabuleiro e o fluxo são únicos no jogo, os jogadores são dois. Quais viram IIFE e qual vira factory? Por quê? Sua linha 3 ainda diz "sempre dentro de factories": ela vale para os três?
- [x] **Duas operações, dois donos.** _(Em andamento: falta dizer o que a `jogar` faz **depois** de chamar o tabuleiro, e se o tabuleiro devolve o objeto inteiro ou avisa se aceitou ou recusou.)_ Você disse que a `jogar` é do fluxo e que o tabuleiro "recebe a mudança". Então o tabuleiro tem uma operação própria de marcar (tarefa 1.3). Em uma frase cada: o que a operação do tabuleiro faz sozinha, e o que a `jogar` do fluxo faz antes e depois de chamá-la?
- [x] **Closure, um refinamento (linha 13).** _(Respondido na conversa; só falta atualizar o texto da linha 13 com a resposta.)_ "Utilizada como um método da variável que guarda a função externa" está confuso. Uma função externa não é guardada, ela é _chamada_. O que a chamada devolve, e onde esse resultado fica guardado?

## Fase 1 — O tabuleiro (sem DOM)

**Objetivo:** um tabuleiro que protege os próprios dados.

Conceito de apoio: closures e módulo (IIFE). A pergunta guia é: _quem pode mudar o array?_

- [x] **1.1 Criar o tabuleiro.** Prever: "se eu imprimir o tabuleiro agora, vejo \_\_\_". Conferir no console.
- [x] **1.2 Ler o estado.** Criar uma operação que permita consultar o tabuleiro **sem** dar acesso para alterar o array original. Experimento: tente alterar o array a partir de fora. Funcionou? Deveria?
- [x] **1.3 Marcar uma casa.** Operação que recebe posição e marca. Prever o resultado de marcar a casa 4 duas vezes seguidas.
- [ ] **1.4 Recusar jogadas inválidas.** Casa ocupada, índice `-1`, `9`, `"abc"`, `1.5`. Para cada um, prever o que acontece **antes** de proteger, depois proteja.
- [ ] **1.5 Informar o resultado da jogada.** A operação deve avisar quem chamou se a jogada foi aceita ou recusada. Por que isso é melhor do que a função decidir sozinha o que fazer depois?
- [ ] **1.6 Limpar o tabuleiro.** Prever: depois de limpar, o tabuleiro é idêntico ao inicial?

**Conferência:** sequência de testes no console cobrindo tudo acima, tentativas inválidas deixam o tabuleiro intacto.

**Commit sugerido:** `cria tabuleiro com validação de jogadas`

## Fase 2 — Jogadores e turnos (sem DOM)

**Objetivo:** modelar quem joga e de quem é a vez.

Conceito de apoio: factory functions. Pergunta guia: _por que um jogador é criado por uma factory e o tabuleiro por uma IIFE?_

- [ ] **2.1 Factory de jogador.** Cada jogador tem nome e marca. Criar os dois e imprimir.
- [ ] **2.2 Guardar o jogador atual.** Definir onde fica essa informação e quem tem permissão para mudá-la.
- [ ] **2.3 Passar a vez.** Prever: após 3 jogadas válidas, de quem é a vez? E após uma jogada **recusada**?
- [ ] **2.4 Estado da rodada.** Pensar em três estados (não iniciada, em andamento, encerrada). Qual operação cada estado deve bloquear?
- [ ] **2.5 Controlador.** Criar o objeto que coordena: recebe uma posição, pede ao tabuleiro para marcar, passa a vez só se a jogada foi aceita.

**Conferência:** jogar 4 jogadas pelo console, incluindo uma inválida, e conferir de quem é a vez em cada momento.

**Commit sugerido:** `adiciona jogadores e controle de turnos`

## Fase 3 — Vitória e empate (sem DOM)

**Objetivo:** o jogo completo no console.

- [ ] **3.1 Listar as 8 combinações vencedoras** em uma estrutura de dados. Conferir: são 3 linhas, 3 colunas e 2 diagonais. Quais índices formam cada uma?
- [ ] **3.2 Verificar se uma combinação está completa.** Prever: três casas vazias contam como vitória? Por quê?
- [ ] **3.3 Testar cada marca.** Fazer a verificação funcionar tanto para X quanto para O.
- [ ] **3.4 Detectar empate.** Quando exatamente o jogo empata?
- [ ] **3.5 Ordem das verificações.** Prever: o que acontece se a nona jogada completar uma linha? Vitória e empate podem ser anunciados juntos?
- [ ] **3.6 Guardar o resultado** e as posições vencedoras.
- [ ] **3.7 Bloquear jogadas após o fim** (mesmo chamando a operação direto).
- [ ] **3.8 Reiniciar a rodada** sem restos da anterior.

**Testes obrigatórios** (X começa, jogadores alternam):

| Cenário                | Posições jogadas, em ordem  | Resultado esperado              |
| ---------------------- | --------------------------- | ------------------------------- |
| Vitória de X           | `0, 3, 1, 4, 2`             | X vence na primeira linha       |
| Vitória de O           | `0, 3, 1, 4, 8, 5`          | O vence na segunda linha        |
| Empate                 | `0, 1, 2, 4, 3, 5, 7, 6, 8` | Tabuleiro cheio, sem vencedor   |
| Vitória na nona jogada | `0, 1, 4, 2, 3, 5, 7, 6, 8` | X vence na diagonal, sem empate |

- [ ] Além da tabela, criar **um teste para cada uma das 8 combinações**, incluindo vitórias de O.

**Marco:** jogar e reiniciar uma rodada inteira usando só o console. **Se chegou aqui, o maior desafio já passou.**

**Commit sugerido:** `implementa vitória, empate e reinício no console`

## Fase 4 — Interface (DOM)

**Objetivo:** mostrar na tela o que a lógica já sabe. A tela **lê** o estado; as regras ficam na lógica.

Conceito de apoio: `querySelector`, `textContent`, atributos `data-*`, eventos. Pergunta guia: _a tela é a fonte da verdade ou a lógica?_

- [ ] **4.1 Criar o componente de display** (outra IIFE) separado das regras.
- [ ] **4.2 Selecionar os elementos** necessários (veja o mapa no fim do arquivo).
- [ ] **4.3 Renderizar o tabuleiro.** Experimento: preencher o array com X e O na mão e ver aparecer na tela.
- [ ] **4.4 Renderizar duas vezes seguidas.** Prever: a tela fica igual ou duplica? Conferir.
- [ ] **4.5 Casas ocupadas e desabilitadas.** Quando todas devem estar bloqueadas?
- [ ] **4.6 Clique em uma casa.** Converter `data-index` (que é texto) no tipo que a lógica espera. Chamar o controlador e **re-renderizar a partir do estado**.
- [ ] **4.7 Mostrar de quem é a vez** e destacar o jogador ativo (`data-active`).
- [ ] **4.8 Marcar a linha vencedora** (`data-win`).
- [ ] **4.9 Atualizar `aria-label`** de cada casa (vazia, X ou O).

**Conferência:** clicar várias vezes na mesma casa não duplica nada; depois do fim, nenhuma casa responde.

**Commit sugerido:** `conecta lógica à interface`

## Fase 5 — Formulário, placar e resultado

**Objetivo:** a experiência completa.

- [ ] **5.1 Evento `submit` do formulário** (não `click` do botão). Prever: por que `submit` também funciona com Enter?
- [ ] **5.2 Ler nomes.** Remover espaços nas pontas. Definir a regra para nomes vazios.
- [ ] **5.3 Mostrar nomes com `textContent`.** Testar `<b>oi</b>` como nome: aparece como texto ou vira negrito?
- [ ] **5.4 Placar guardado nos dados** (não no texto da tela). Somar uma única vez por rodada.
- [ ] **5.5 Dialog de resultado.** Título, mensagem e `data-result` (`X`, `O` ou `tie`).
- [ ] **5.6 "Jogar de novo" e "Reiniciar partida"** preservam nomes e placar e devolvem a vez a X.
- [ ] **5.7 "Começar partida" com novos nomes** zera placar e rodada.
- [ ] **5.8 Reiniciar no meio da rodada** não conta vitória nem empate.
- [ ] **5.9 Foco por teclado** ao fechar o dialog e ao jogar de novo.
- [ ] **5.10 Garantir que listeners não se acumulam** ao iniciar e reiniciar várias vezes.

**Commit sugerido:** `adiciona formulário, placar e resultado`

## Fase 6 — Revisão e entrega

- [ ] Jogar várias rodadas seguidas e conferir o placar.
- [ ] Clicar rápido várias vezes na mesma casa.
- [ ] Testar nomes: vazio, só espaços, 20 caracteres, `<` e `>`.
- [ ] Navegar só com teclado (Tab, Shift+Tab, Enter, Espaço, Esc).
- [ ] Testar em tela estreita.
- [ ] Console limpo; remover `console.log` de depuração.
- [ ] Revisar: a lógica funciona sem o DOM? Cada objeto tem uma responsabilidade clara? Quase nada ficou global?
- [ ] Escrever o README (como abrir, como funciona, como o código está organizado, o que aprendi).
- [ ] **Teste de memória:** sem olhar o código, reescrever em papel a função de vitória e explicar a ordem das verificações.

## Extra opcional

- [ ] Usar `data-turn="X"` ou `"O"` no `#board` para ativar a prévia de hover do CSS.

---

## Diário de aprendizado (preencha ao fim de cada sessão)

| Data | O que previ | O que aconteceu | O que aprendi |
| ---- | ----------- | --------------- | ------------- |
|      |             |                 |               |

## Mapa dos elementos existentes

| Elemento ou atributo                           | Uso                                             |
| ---------------------------------------------- | ----------------------------------------------- |
| `#playersForm`, `#startGame`                   | Envio dos nomes e início de uma nova disputa    |
| `#playerXInput`, `#playerOInput`               | Leitura dos nomes                               |
| `#playerXName`, `#playerOName`                 | Nomes exibidos nos cartões                      |
| `#playerXCard`, `#playerOCard` + `data-active` | Destaque do jogador da vez                      |
| `#playerXScore`, `#playerOScore`, `#tieScore`  | Contadores de resultados                        |
| `#gameStatus`                                  | Mensagem da partida (`role="status"`)           |
| `#board > button` + `data-index`               | Casas e sua posição no array                    |
| `data-mark`, `data-win`, `disabled` nas casas  | Cor da marca, destaque da vitória e bloqueio    |
| `#restartGame`                                 | Reinício da rodada, mantendo jogadores e placar |
| `#resultDialog` + `data-result`                | Dialog e símbolo do resultado                   |
| `#resultTitle`, `#resultMessage`               | Textos do resultado                             |
| `#resultDialog form[method="dialog"]`          | Ação nativa "Ver tabuleiro"                     |
| `#playAgain`                                   | Nova rodada a partir do dialog                  |
| `data-turn` no `#board`                        | Prévia opcional da próxima marca                |

**Primeiro passo quando voltar:** Fase 0, sem digitar código. Só leitura e papel.
