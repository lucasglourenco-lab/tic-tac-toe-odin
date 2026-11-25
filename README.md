# Jogo da Velha (Tic Tac Toe)

Jogo da velha para duas pessoas no mesmo navegador, feito com HTML, CSS e JavaScript puro, sem bibliotecas. Projeto do [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

## Como jogar

1. Abra o `index.html` no navegador.
2. Digite o nome dos dois jogadores e clique em **Começar partida**. Quem fica com o **X** começa.
3. Na sua vez, clique em uma casa vazia.
4. Vence quem alinhar três marcas na linha, na coluna ou na diagonal. Tabuleiro cheio sem vencedor é empate.
5. Ao fim da rodada, uma janela mostra o resultado. Use **Jogar de novo** para continuar com os mesmos nomes e o mesmo placar, ou **Ver tabuleiro** para olhar a partida.
6. **Reiniciar partida** limpa o tabuleiro no meio da rodada, sem contar resultado. Enviar o formulário de novo com outros nomes zera tudo, inclusive o placar.

Regras dos nomes: não podem ficar vazios nem ser iguais (maiúsculas e minúsculas não contam como diferença). Espaços nas pontas são removidos.

## O que tem no projeto

- Placar com vitórias de cada jogador e empates.
- Destaque da casa vencedora e de quem joga na vez.
- Janela de resultado com `<dialog>`.
- Navegação pelo teclado (Tab, Enter e Esc) e `aria-label` em cada casa.
- Layout que se adapta a telas estreitas.

## Como o código está organizado

Tudo fica em `script.js`, separado em três partes:

| Parte | Tipo | O que faz |
| --- | --- | --- |
| `gameTable` | módulo (IIFE) | Guarda as 9 casas. Lê (sempre uma cópia), marca e limpa. |
| `createPlayer` | factory | Cria um jogador com nome e marca (`X` ou `O`). |
| `gameFlow` | módulo (IIFE) | Regras do jogo: de quem é a vez, vitória, empate, placar e reinício. |
| `board` | módulo (IIFE) | Tela: eventos, formulário e uma única função `render` que desenha tudo a partir do estado. |

A lógica não mexe no DOM, e a tela não decide regras. O `render` só lê o estado do `gameFlow` e escreve na página, então pode rodar quantas vezes for preciso sem duplicar nada. O placar é somado uma vez, no momento em que a rodada termina, e nunca dentro do `render`.

## O que aprendi

- **Módulos com IIFE e closures:** variáveis privadas dentro do módulo e só o necessário exposto no `return`.
- **Cópia e referência:** devolver uma cópia do array do tabuleiro impede que a tela altere os dados por fora. Já `let a = b` guarda o valor daquele momento, e não acompanha mudanças depois.
- **Uma função `render` que deriva tudo do estado:** botões desabilitados, destaque da vez, linha vencedora, placar e textos saem do estado, sem remendos espalhados.
- **Separar fatos de texto:** a lógica responde "quem venceu" e a tela decide como dizer isso.
- **`submit` no formulário:** o evento acontece no `<form>`, não no botão, e por isso o Enter nos campos também envia.
- **`textContent`** para mostrar o que a pessoa digitou sem interpretar HTML.
- **Testar sem o navegador:** simular o DOM em Node ajudou a achar erros de estado antes de abrir a página.

## Arquivos

- `index.html`: estrutura da página.
- `style.css`: visual e responsividade.
- `script.js`: toda a lógica do jogo.
