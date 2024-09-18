document.addEventListener("DOMContentLoaded", () => {
    const motivos = document.querySelectorAll('.motivo');
    const titulo = document.querySelector('h1');
    const noButton = document.getElementById('not'); // Botão "não"
    const yesButton = document.getElementById('yes'); // Botão "sim"

    if (!noButton) {
        console.error('Botão "no" não encontrado');
        return;
    }

    if (!yesButton) {
        console.error('Botão "yes" não encontrado');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    // Observar os motivos
    motivos.forEach(motivo => {
        observer.observe(motivo);
    });

    // Observar o título
    observer.observe(titulo);

    // Suavizar o scroll quando clicar no botão "Saiba mais"
    document.querySelector('a[href="#motivos"]').addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });

    
    // Função de alerta quando o botão "sim" for clicado
    function alertSim() {
        alert('Ebaaa, agora precisa comprar o anel de noivado. 😊');
    }

    // Adicionar evento de clique ao botão "sim"
    yesButton.addEventListener('click', alertSim);


    // Função para mover o botão "não" para uma distância limitada (máx 100px)
    function moveButton() {
        const maxOffset = 100; // Define o máximo que o botão pode se mover (100 pixels)
        
        // Pegar as coordenadas atuais do botão
        const currentX = noButton.offsetLeft;
        const currentY = noButton.offsetTop;

        // Calcular novos valores dentro de um limite de 100px para cima, baixo, esquerda ou direita
        const randomX = currentX + (Math.random() * maxOffset * 2 - maxOffset); // Mover no eixo X até 100px
        const randomY = currentY + (Math.random() * maxOffset * 2 - maxOffset); // Mover no eixo Y até 100px

        // Aplicar as novas coordenadas
        noButton.style.position = 'absolute'; // Garantir que a posição seja absoluta
        noButton.style.left = `${randomX}px`;  // Aplicar a nova posição no eixo X
        noButton.style.top = `${randomY}px`;   // Aplicar a nova posição no eixo Y
    }

    // Mover o botão ao passar o mouse por perto
    document.addEventListener('mousemove', (event) => {
        const buttonRect = noButton.getBoundingClientRect();

        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Calcular a distância entre o mouse e o centro do botão
        let distancia = Math.sqrt(Math.pow(event.clientX - buttonCenterX, 2) + Math.pow(event.clientY - buttonCenterY, 2));

        // Se o mouse estiver a menos de 100 pixels de distância, mover o botão
        if (distancia < 100) {
            moveButton();
        }
    });

    // Mover o botão ao clicar nele
    noButton.addEventListener('click', moveButton);

});
