// Organizar objetos: um objeto para o tabuleiro, um para os jogadores e um objeto para controlar o fluxo do jogo.

//Utilizar o mínimo de código global possível, sempre dentro de factories.

//Inicialmente o jogo deve funcionar no console.

// O que o jogo faz?
// 1. Possui dois jogadores e um tabuleiro com 09 posições, todas zeradas.
// 2. Cada jogador, alternadamente, escolhe uma posição que recebe a sua marca (seu símbolo).
// 3. Aquele que inicialmente completar uma coluna ou linha, inclusive diagonalmente, ganha o jogo.

// O que é uma closure? Como ela cria uma variável privada?
// Closure é o que existe dentro de um função que está disponível somente dentro daquela função, é privado para fora, mas que ao executar essa função, acaba sendo guardada na memória para que possa ser retornada quando necessário.

//Os objetos
//1. Jogadores: Possui dois jogadores: 'X' e 'O', cada um com sua marca.
//2. Tabuleiro: Possui 9 posições, todas inicialmente com os valores zerados, marcarei como 'null'. Ao passo que cada jogador escolhe uma posição, essa posição é remarcada para a marca(symbol) do jogador que escolheu, desde que ela já não tenha sido escolhida.
//3. Fluxo do jogo: Sempre que uma jogada é aceita, a vez de jogar passa ao outro jogador. Ao final de cada jogada eu confiro se algum dos jogadores completou uma linha, coluna ou diagonal, o primeiro a completar vence. Caso nenhum consiga completar, o jogo deu 'velha' e necessita dessa forma ser reiniciado. Um contador acumula as vitórias de cada jogador.
