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

- [ ] **5. Tela.** Um módulo separado que desenha o tabuleiro a partir do estado do jogo. Clique em uma casa → converte `data-index` para número → joga → desenha de novo. Casas ocupadas e tudo depois do fim ficam desabilitados. Mostre de quem é a vez e destaque a linha vencedora.
      _Conferir:_ desenhar duas vezes seguidas não duplica nada; clicar rápido na mesma casa não quebra.
  - [x] 5.1 `render` a partir do estado (texto, `data-mark`, `aria-label`), chamado ao carregar.
  - [x] 5.2 Clique: `playRound` e depois `render`; casas ocupadas e tudo no fim ficam desabilitados.
  - [x] 5.3 Botão Reiniciar liga `restartGame` e redesenha.
  - [ ] 5.4 Corrigir o destaque da vez depois de Reiniciar (ver "Retomar".)
  - [ ] 5.5 O `render` cuidar sozinho de `disabled`, destaque da vez e botão Reiniciar.
  - [ ] 5.6 Guardar o resultado e a combinação vencedora no `gameFlow` (pendência do passo 4).
  - [ ] 5.7 `data-win` na linha vencedora e texto em `#gameStatus`.
- [ ] **6. Formulário e placar.** Evento `submit` do formulário, nomes sem espaços nas pontas, regra para nome vazio, exibidos com `textContent` (teste `<b>oi</b>`). Placar guardado nos dados, somado uma vez por rodada. Janela de resultado com vencedor ou empate.
- [ ] **7. Botões.** "Jogar de novo" e "Reiniciar" mantêm nomes e placar e devolvem a vez a X. Reiniciar no meio da rodada não conta resultado. Iniciar com novos nomes zera tudo.
- [ ] **8. Fechamento.** Várias rodadas seguidas, teclado (Tab, Enter, Esc), tela estreita, console limpo e um README curto.

## Elementos do HTML

`#playersForm`, `#playerXInput`, `#playerOInput`, `#startGame` · `#playerXName`, `#playerOName`, `#playerXScore`, `#playerOScore`, `#tieScore` · `#playerXCard`, `#playerOCard` (`data-active`) · `#gameStatus` · `#board > button[data-index]` (`data-mark`, `data-win`) · `#restartGame` · `#resultDialog`, `#resultTitle`, `#resultMessage`, `#playAgain`

## Retomar (a partir do passo 5)

**Estado em 16/11:** a lógica (passos 1 a 4) passa nos 4 cenários da tabela; a tela já desenha, clica, bloqueia e reinicia.

**Ordem sugerida:**

1. **Bug do destaque da vez (5.4).** Faça O vencer e clique em Reiniciar: a lógica volta para X, mas o cartão de O continua destacado. O `activatePlayerCard` não é chamado no clique de Reiniciar. Pergunta: quem deveria lembrar de chamar o desenho da vez, cada ponto de partida ou o próprio `render`?
2. **Um `render` só (5.5).** Hoje há três "donos" do mesmo tipo de coisa: `render` (casas), `finishGame` (trava casas e habilita Reiniciar) e `activatePlayerCard` (vez). O Reiniciar é habilitado em um lugar e desabilitado em outro (linhas 144 e 150). Pergunta: o que cada um desses valores depende (estado do tabuleiro, da rodada, do jogador da vez)? Se todos são consequência do estado, o `render` pode escrevê-los a cada desenho. Ao final, `finishGame` e a linha 150 devem deixar de ser necessários.
3. **Guardar o resultado (5.6).** O `gameFlow` só diz `finished`: não distingue vitória de empate nem guarda quais casas venceram. Hoje o `checkWin` imprime a combinação com `console.log` (linha 117) e a perde, e altera o `roundStatus` por dentro (linha 118). Decida: o que a lógica guarda (vencedor ou empate, combinação), como o código de fora lê isso sem poder alterar (cópia, como o `getPlayer`), e se o `checkWin` volta a só responder se há vitória.
4. **Mostrar o resultado (5.7).** Com o item 3: `data-win="true"` nas 3 casas vencedoras e o texto de `#gameStatus` (vez de quem, vitória de quem, empate). A lógica devolve fatos; a tela escreve o texto.
5. **Limpeza.** Tirar o `console.log` da linha 117; a leitura de linha e coluna no `render` pode virar uma conta simples com `Math.floor`; achar o cartão do jogador por `#playerXCard` e `#playerOCard`, e não pelo texto do primeiro `span`.

**Depois:** passos 6 (formulário e placar), 7 (botões) e 8 (fechamento).

**Comece pelo passo 5.4.**
