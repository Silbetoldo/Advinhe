// Classe base Game
class Game {
    constructor() {
        this.randomNumber = this.generateRandomNumber(); // Gera um número aleatório
        this.attempts = 0; // Inicializa o contador de tentativas
    }

    // Método para gerar um número aleatório entre 1 e 100
    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1; // Retorna um número inteiro entre 1 e 100
    }

    // Método para processar o palpite do usuário (método abstrato)
    makeGuess(userGuess) {
        throw new Error("Método 'makeGuess' deve ser implementado na classe derivada.");
    }

    // Método para reiniciar o jogo
    resetGame() {
        this.randomNumber = this.generateRandomNumber(); // Gera um novo número aleatório
        this.attempts = 0; // Reseta o contador de tentativas
    }
}

// Classe derivada SimpleGame
class SimpleGame extends Game {
    constructor() {
        super(); // Chama o construtor da classe base
    }

    // Método para processar o palpite do usuário no jogo simples
    makeGuess(userGuess) {
        this.attempts++; // Incrementa o contador de tentativas
        if (userGuess < this.randomNumber) {
            return "Muito baixo! Tente novamente."; // Mensagem se o palpite for muito baixo
        } else if (userGuess > this.randomNumber) {
            return "Muito alto! Tente novamente."; // Mensagem se o palpite for muito alto
        } else {
            return `Parabéns! Você acertou em ${this.attempts} tentativas.`; // Mensagem se o usuário acertar
        }
    }
}

// Classe derivada AdvancedGame que herda de Game
class AdvancedGame extends Game {
    constructor(maxAttempts) {
        super(); // Chama o construtor da classe base
        this.maxAttempts = maxAttempts; // Define o número máximo de tentativas
    }

    // Método para processar o palpite do usuário com limite de tentativas
    makeGuess(userGuess) {
        if (this.attempts >= this.maxAttempts) {
            return "Você ultrapassou o número máximo de tentativas! Reinicie o jogo."; // Mensagem se o limite de tentativas for excedido
        }
        this.attempts++; // Incrementa o contador de tentativas
        if (userGuess < this.randomNumber) {
            return "Muito baixo! Tente novamente."; // Mensagem se o palpite for muito baixo
        } else if (userGuess > this.randomNumber) {
            return "Muito alto! Tente novamente."; // Mensagem se o palpite for muito alto
        } else {
            return `Parabéns! Você acertou em ${this.attempts} tentativas.`; // Mensagem se o usuário acertar
        }
    }
}

// Função para iniciar o jogo
function initGame() {
    const isAdvanced = false; // Mude para true para usar AdvancedGame
    const game = isAdvanced ? new AdvancedGame(10) : new SimpleGame(); // Cria a instância do jogo

    // Adiciona um evento ao botão de adivinhação
    document.getElementById('guessButton').addEventListener('click', () => {
        const userGuess = parseInt(document.getElementById('guessInput').value);
        const messageElement = document.getElementById('message'); // Elemento para exibir mensagens

        // Validação do palpite do usuário
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            messageElement.innerText = "Por favor, digite um número entre 1 e 100."; // Mensagem de erro
        } else {
            // Chama o método makeGuess da instância de game
            const message = game.makeGuess(userGuess); 
            messageElement.innerText = message; // Exibe a mensagem de feedback para o usuário

            // Se o usuário acertou ou ultrapassou tentativas, exibe o botão de reiniciar
            if (message.includes("Parabéns") || message.includes("ultrapassou")) {
                document.getElementById('restartButton').style.display = "block"; // Exibe o botão de reiniciar
            }
        }
    });

    // Adiciona um evento ao botão de reinício
    document.getElementById('restartButton').addEventListener('click', () => {
        // Reinicia o jogo chamando o método resetGame
        game.resetGame();
        document.getElementById('message').innerText = ""; // Limpa a mensagem
        document.getElementById('guessInput').value = ""; // Limpa o campo de entrada
        document.getElementById('restartButton').style.display = "none"; // Oculta o botão de reiniciar
    });
}

// Inicializa o jogo ao carregar a página
window.onload = initGame;

