# TODO — Tic Tac Toe (do zero, versão curta)

O `index.html` e o `style.css` já estão prontos. Você escreve todo o `script.js`. Este roteiro não tem código: só o que fazer e como conferir.

**Ciclo:** prever em uma linha → fazer → conferir no console → commit.
**Travou 20 min?** Escreva "esperava X, aconteceu Y" e peça uma pergunta ou dica.
**Sessões:** 25 min de trabalho, 5 de pausa. Sem DOM até o passo 5.

## O que o jogo precisa (releia o enunciado em `referencias/curriculo/javascript/organizing_your_javascript_code/project_tic_tac_toe.md`)

Dois jogadores alternam marcando casas de um tabuleiro 3x3. Vence quem completar uma linha, coluna ou diagonal. Tabuleiro cheio sem vencedor é empate.

## Passos

- [x] **1. Tabuleiro** (um módulo IIFE). Guarda 9 casas, cada vazia no início. Operações: ler o estado (sem entregar o array original), marcar uma casa (recusa casa ocupada ou posição inválida e avisa se aceitou) e limpar.
      _Conferir:_ marcar a mesma casa duas vezes; tentar `-1`, `9`, `"abc"`, `1.5`; alterar a cópia que você leu e ver se o tabuleiro mudou.
- [x] **2. Jogadores** (factory). Cada um tem nome e marca (`X` ou `O`).
- [x] **3. Jogo** (módulo IIFE). Sabe de quem é a vez (X começa) e se a rodada acabou. A jogada marca no tabuleiro e só passa a vez se foi aceita.
      _Conferir:_ 4 jogadas pelo console, uma delas inválida, vendo de quem é a vez em cada uma.
- [x] **4. Vitória e empate.** Liste as 8 combinações vencedoras. Depois de cada jogada aceita: confira vitória, depois empate (se a 9ª jogada fecha uma linha, é vitória). Guarde o resultado e a combinação vencedora. Depois do fim, recuse jogadas. Faça reiniciar a rodada.
      _Conferir (X começa, alternam):_
      | Cenário | Posições, em ordem | Esperado |
      | --- | --- | --- |
      | Vitória de X | `0, 3, 1, 4, 2` | X vence na primeira linha |
      | Vitória de O | `0, 3, 1, 4, 8, 5` | O vence na segunda linha |
      | Empate | `0, 1, 2, 4, 3, 5, 7, 6, 8` | cheio, sem vencedor |
      | Vitória na 9ª | `0, 1, 4, 2, 3, 5, 7, 6, 8` | X vence na diagonal, sem empate |

  **Marco:** uma rodada completa e um reinício só pelo console.

- [x] **5. Tela.** Um módulo separado que desenha o tabuleiro a partir do estado do jogo. Clique em uma casa → converte `data-index` para número → joga → desenha de novo. Casas ocupadas e tudo depois do fim ficam desabilitados. Mostre de quem é a vez e destaque a linha vencedora.
      _Conferir:_ desenhar duas vezes seguidas não duplica nada; clicar rápido na mesma casa não quebra.
  - [x] 5.1 `render` a partir do estado (texto, `data-mark`, `aria-label`), chamado ao carregar.
  - [x] 5.2 Clique: `playRound` e depois `render`; casas ocupadas e tudo no fim ficam desabilitados.
  - [x] 5.3 Botão Reiniciar liga `restartGame` e redesenha.
  - [x] 5.4 Corrigir o destaque da vez depois de Reiniciar (ver "Retomar".)
  - [x] 5.5 O `render` cuidar sozinho de `disabled`, destaque da vez e botão Reiniciar.
  - [x] 5.6 Guardar o resultado e a combinação vencedora no `gameFlow` (pendência do passo 4).
  - [x] 5.7 `data-win` na linha vencedora e texto em `#gameStatus`.
  - [x] 5.8 Limpeza que sobrou: linha e coluna do `aria-label` com `Math.floor` e `%`, sem os ternários encadeados.
- [x] **6. Formulário e placar.** Nomes dos jogadores vindos do formulário, placar guardado nos dados, janela de resultado.
  - [x] 6.1 Estado "ainda não começou": o jogo não aceita jogada nem destaca a vez até o formulário ser enviado, e `#gameStatus` mostra a instrução inicial. Decida quem guarda esse estado (lógica ou tela).
        _Conferir:_ ao carregar, nenhuma casa responde ao clique e o texto pede os nomes; reiniciar não "começa" o jogo sozinho.
  - [x] 6.2 Evento `submit` de `#playersForm`: impedir o envio padrão da página, ler os dois nomes, tirar espaços das pontas e definir a regra para nome vazio (bloquear ou usar "Jogador X" e "Jogador O"). Decida também o que fazer com nomes iguais.
        _Conferir:_ nomes com espaços nas pontas, nome vazio e nomes iguais, sem recarregar a página.
  - [x] 6.3 Os jogadores passam a usar os nomes digitados (hoje "Lucas" e "Ana" estão fixos no `gameFlow`) e os nomes aparecem em `#playerXName`, `#playerOName` e no `#gameStatus` com `textContent`.
        _Conferir:_ digite `<b>oi</b>` como nome: tem que aparecer como texto, sem negrito.
  - [x] 6.4 Placar nos dados: vitórias de X, vitórias de O e empates, somados **uma vez por rodada**, no momento em que a rodada passa para `finished` (não no `render`, que roda várias vezes). Leitura de fora por cópia ou valores simples.
        _Conferir (pelo console):_ vitória de X soma 1 a X; empate soma 1 a empates; chamar o desenho várias vezes não soma de novo.
  - [x] 6.5 Placar na tela: `#playerXScore`, `#playerOScore` e `#tieScore` escritos pelo `render` a partir dos dados.
  - [x] 6.6 Janela de resultado (`#resultDialog`, `#resultTitle`, `#resultMessage`) com vencedor ou empate, aberta **uma vez** por rodada. Pense em qual momento ela abre, já que o `render` roda a cada clique.
        _Conferir:_ vitória e empate mostram a mensagem certa; redesenhar a tela não reabre a janela.
- [x] **7. Botões.** "Jogar de novo" e "Reiniciar" mantêm nomes e placar e devolvem a vez a X.
  - [x] 7.1 `#playAgain` na janela de resultado: fecha a janela, limpa o tabuleiro, mantém nomes e placar e devolve a vez a X.
        _Conferir:_ depois de "Jogar de novo", o placar da rodada anterior continua e o cartão de X está destacado.
  - [x] 7.2 `#restartGame` no meio da rodada: limpa o tabuleiro sem contar resultado. Confirme o que acontece com o placar.
        _Conferir:_ jogar 3 casas, reiniciar, e o placar continua igual.
  - [x] 7.3 Enviar o formulário de novo com novos nomes zera tudo (nomes, placar, tabuleiro, vez).
        _Conferir:_ jogar uma rodada, enviar outros nomes, e o placar volta a 0, 0 e 0.
- [x] **8. Fechamento.**
  - [x] 8.1 Várias rodadas seguidas (vitória de X, de O, empate, "Jogar de novo") e o placar bate com o que aconteceu.
  - [x] 8.2 Teclado: Tab percorre formulário e casas, Enter envia e joga, Esc fecha a janela de resultado.
  - [x] 8.3 Tela estreita (cerca de 400px) sem rolagem horizontal.
  - [x] 8.4 Console limpo, sem erros nem `console.log` esquecido.
  - [x] 8.5 README curto: o que é, como jogar, o que você aprendeu.

## Elementos do HTML

`#playersForm`, `#playerXInput`, `#playerOInput`, `#startGame` · `#playerXName`, `#playerOName`, `#playerXScore`, `#playerOScore`, `#tieScore` · `#playerXCard`, `#playerOCard` (`data-active`) · `#gameStatus` · `#board > button[data-index]` (`data-mark`, `data-win`) · `#restartGame` · `#resultDialog`, `#resultTitle`, `#resultMessage`, `#playAgain`

## Retomar (a partir do passo 6)

**Estado em 24/11:** passos 1 a 5 e 6.1 e 6.2 prontos. O jogo só começa depois do envio do formulário (`gameFlow.createPlayers`), com `trim`, nome vazio e nomes iguais (sem diferenciar maiúsculas) bloqueados. No fim da rodada nenhum cartão fica destacado.

**Atenção:** os nomes ficam em `XName`/`OName` na tela e o `render` os escreve (6.3 feito). O `alert` das mensagens de erro é provisório. O `restartGame` não se protege se for chamado antes de `createPlayers`.

**Projeto concluído em 25/11:** todos os passos (1 a 8) marcados, com testes de várias rodadas, teclado, tela estreita e console limpo, e README escrito.

**Melhorias opcionais:** proteger o `showModal` contra janela já aberta (`resultModal.open`), trocar os `alert` por mensagem na tela, e decidir o `restartBtn.disabled` em um lugar só no `render`.
