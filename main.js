const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", (e) => {
    let valor = e.target.value;
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");

    if (valor.length > 14) {
        valor = valor.slice(0, 15);
    }

    e.target.value = valor;
});


// Função para verificar se a animação está no LocalStorage
function loadAnimationFromLocalStorage() {
    const lottieAnimationData = localStorage.getItem("lottieAnimationData");
    if (lottieAnimationData) {
        return JSON.parse(lottieAnimationData);
    }
    return null;
}

// Função para armazenar a animação no LocalStorage
function storeAnimationInLocalStorage(animationData) {
    localStorage.setItem("lottieAnimationData", JSON.stringify(animationData));
}

// Carrega a animação do LocalStorage ou do arquivo JSON
function loadAnimation() {
    const animationData = loadAnimationFromLocalStorage();

    if (animationData) {
        // Configura e inicializa a animação a partir do LocalStorage
        var animationConfig = {
            container: document.getElementById("lottie-animation"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
        };
        var anim = lottie.loadAnimation(animationConfig);
    } else {
        // Carrega a animação do arquivo JSON e armazena no LocalStorage
        fetch("./json/95602-calendar.json")
            .then((response) => response.json())
            .then((data) => {
                storeAnimationInLocalStorage(data);

                var animationConfig = {
                    container: document.getElementById("lottie-animation"),
                    renderer: "svg",
                    loop: true,
                    autoplay: true,
                    animationData: data,
                };
                var anim = lottie.loadAnimation(animationConfig);
            });
    }
}

// Inicia o processo de carregamento da animação
loadAnimation();


document.addEventListener("DOMContentLoaded", function () {
    var btnAg = document.getElementById("btnAg");
    var containerTable = document.querySelector(".container-table");

    containerTable.style.display = 'none'; // Adicione esta linha para definir o display como 'none' inicialmente

    btnAg.addEventListener("click", function (event) {
        event.preventDefault(); // Adicione esta linha para evitar que o botão se comporte como um botão de envio
        if (containerTable.style.display === "none") {
            containerTable.style.display = "block";
        } else {
            containerTable.style.display = "none";
        }
    });
});



function formatarDataHora() {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const btnSub = document.getElementById('btnSub');
    const tabela = document.querySelector('table tbody');
    const nomeInput = document.querySelector('input[type="text"]');
    const telefoneInput = document.querySelector('input[type="tel"]');
    const contadorContatos = document.querySelector('tfoot td');
    const textNome = document.getElementById("text-nome");
    const textTelefone = document.getElementById("text-telefone");

    let totalContatos = 0;

    function atualizarContador() {
        contadorContatos.textContent = `Total de contatos: ${totalContatos}`;
    }

    btnSub.addEventListener('click', function (evento) {
        evento.preventDefault();

        const nome = nomeInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const dataHora = formatarDataHora();

        // Verifica se o campo nome está vazio
        if (!nome) {
            textNome.style.display = "block";
            textNome.textContent = 'Campo Obrigatório!';
            return;
        } else {
            textNome.style.display = "none";
        }

        // Verifica se o campo telefone está vazio ou tem menos de 15 caracteres
        if (!telefone) {
            textTelefone.style.display = "block";
            textTelefone.textContent = 'Campo Obrigatório!';
            return;
        } else if (telefone.length < 15) {
            textTelefone.style.display = "block";
            textTelefone.textContent = 'Digite o número completo';
            return;
        } else {
            textTelefone.style.display = "none";
        }

        const linha = document.createElement('tr');
        const colunaNome = document.createElement('td');
        const colunaTelefone = document.createElement('td');
        const colunaDataHora = document.createElement('td');

        colunaNome.textContent = nome;
        colunaTelefone.textContent = telefone;
        colunaDataHora.textContent = dataHora;

        linha.appendChild(colunaNome);
        linha.appendChild(colunaTelefone);
        linha.appendChild(colunaDataHora);

        tabela.appendChild(linha);

        // Atualizar e exibir o contador de contatos
        totalContatos++;
        atualizarContador();

        // Limpar campos do formulário
        nomeInput.value = '';
        telefoneInput.value = '';
    });
});









