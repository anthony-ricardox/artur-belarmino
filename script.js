// Funcionalidade para o carrossel de cards no Portfólio
document.addEventListener('DOMContentLoaded', () => {
    const cardsCarousel = document.querySelector('.cards-carousel');
    const track = cardsCarousel.querySelector('.cards-track');
    const cards = Array.from(track.children);
    const nextBtn = cardsCarousel.querySelector('.next-btn');
    const prevBtn = cardsCarousel.querySelector('.prev-btn');

    let currentCardIndex = 0;
    
    // Mostra/esconde os botões de navegação
    function updateButtons() {
        const cardsToShow = 3;
        // Esconde o botão 'Anterior' se estiver no início
        prevBtn.style.display = currentCardIndex === 0 ? 'none' : 'block';
        // Esconde o botão 'Próximo' se estiver no último card visível
        nextBtn.style.display = currentCardIndex >= cards.length - cardsToShow ? 'none' : 'block';
    }

    // Calcula a largura de um card + o espaçamento (gap)
    function getCardWidth() {
        const style = window.getComputedStyle(cards[0]);
        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(style.marginRight || style.gap);
        return cardWidth + gap;
    }

    nextBtn.addEventListener('click', () => {
        currentCardIndex++;
        track.style.transform = `translateX(${-getCardWidth() * currentCardIndex}px)`;
        updateButtons();
    });

    prevBtn.addEventListener('click', () => {
        currentCardIndex--;
        track.style.transform = `translateX(${-getCardWidth() * currentCardIndex}px)`;
        updateButtons();
    });

    // Chama a função ao carregar a página para definir o estado inicial
    updateButtons();
});


// Slideshow da seção "Quem sou eu"
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.querySelectorAll(".slides img");
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  slides.forEach((slide, i) => {
    slide.style.display = (i === slideIndex) ? "block" : "none";
  });
}

// Menu hamburguer
const hamburguer = document.getElementById('hamburguer');
const menu = document.getElementById('menu');

hamburguer.addEventListener('click', () => {
  menu.classList.toggle('active');
});