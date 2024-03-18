/*Carrossel*/

var slideIndex = 1;
mostrarSlides(slideIndex);

function mudarSlide(n) {
    mostrarSlides(slideIndex += n);
}

function mostrarSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";   
  }


/*Formulário */
class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }
    seApresentar() {
        return `Olá, eu me chamo ${this.nome} e tenho ${this.idade} anos.`;
    }
    trabalhar() {
        return `Eu estou trabalhando como ${this.cargo}.`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }
    gerenciar() {
        return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }
    programar() {
        return `${this.nome} programa em ${this.linguagem}.`;
    }
}

document.getElementById('formularioFuncionario').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);

    if (isNaN(idade)) {
        alert("Insira uma idade válida");
        return;
    }

    const cargo = document.getElementById('cargo').value;
    const departamentoLinguagem = document.getElementById('departamentoLinguagem').value;

    try {
        if (idade < 18) {
            throw new Error("A idade deve ser um número maior ou igual a 18.");
        }
        if (!nome) {
            throw new Error("O nome não pode ser vazio.");
        }
        if (/\d/.test(nome)) {
            throw new Error("Números são caracteres inválidos para nome.");
        }

        const departamentosValidos = ["Financeiro", "RH", "TI"];
        const linguagensValidas = ["JavaScript", "Python", "Java"];

        let funcionario;

        if (cargo === 'gerente') {
            if (!departamentosValidos.includes(departamentoLinguagem)) {
                throw new Error("Departamento inválido para gerente.");
            }
            funcionario = new Gerente(nome, idade, cargo, departamentoLinguagem);
        } else if (cargo === 'desenvolvedor') {
            if (!linguagensValidas.includes(departamentoLinguagem)) {
                throw new Error("Linguagem inválida para desenvolvedor.");
            }
            funcionario = new Desenvolvedor(nome, idade, cargo, departamentoLinguagem);
        } else {
            throw new Error("Cargo não reconhecido.");
        }

        let mensagem = funcionario.seApresentar() + " " + funcionario.trabalhar();

        if (funcionario instanceof Gerente) {
            mensagem += " " + funcionario.gerenciar();
        } else if (funcionario instanceof Desenvolvedor) {
            mensagem += " " + funcionario.programar();
        }

        document.getElementById('saida').textContent = mensagem;
    } catch (error) {
        console.error("Ops, algo deu errado:", error);
        document.getElementById('saida').textContent = `Erro: ${error.message}`;
    }
});