// Selecionamos os elementos que vamos manipular
const textElement = document.getElementById("typing-text");
const phrases = ["Desenvolvedor Web.", "Analista de TI", "Apaixonado por Tecnologia.", "Estou sempre em busca de mais conhecimento."];

let phraseIndex = 0; // Índice da frase atual
let charIndex = 0;   // Índice do caractere atual
let isDeleting = false;
let typeSpeed = 150; // Velocidade da escrita

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove uma letra
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100; // Mais rápido ao apagar
    } else {
        // Adiciona uma letra
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200; // Velocidade normal ao escrever
    }

    // Lógica para mudar de frase ou começar a apagar
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa no final da frase antes de apagar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Passa para a próxima frase
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Inicia a função quando a página carregar
document.addEventListener("DOMContentLoaded", type);

// Criamos o observador
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Se o elemento estiver visível no ecrã
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Adiciona a classe que mostra o elemento
        }
    });
}, {
    threshold: 0.1 // O elemento aparece quando 10% dele estiver visível
});

// Selecionamos todos os elementos que queremos observar
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Seleciona o botão
const backToTopBtn = document.getElementById('backToTop');

// Monitora a rolagem da página
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Ação de clique para subir ao topo
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const form = document.querySelector(".contato-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o redirecionamento da página
    
    const data = new FormData(event.target);
    
    // Altera o texto do botão para dar feedback visual
    const btn = form.querySelector(".btn-enviar");
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Mensagem enviada com sucesso! Obrigado.";
            status.style.color = "#00ff88"; // Verde neon
            form.reset(); // Limpa os campos do formulário
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Ops! Ocorreu um erro ao enviar.";
                }
                status.style.color = "#ff4444";
            })
        }
    }).catch(error => {
        status.innerHTML = "Ops! Houve um problema de conexão.";
        status.style.color = "#ff4444";
    }).finally(() => {
        // Restaura o botão após o envio
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            status.innerHTML = "";
        }, 5000);
    });
});
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Rolar para baixo - Esconde o header
        header.classList.add("header-hidden");
    } else {
        // Rolar para cima - Mostra o header
        header.classList.remove("header-hidden");
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para navegadores mobile
}, false);