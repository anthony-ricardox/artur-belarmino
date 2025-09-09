// Funcionalidade para o carrossel de cards no Portfólio 
window.addEventListener('load', () => {
  const cardsCarousel = document.querySelector('.cards-carousel');
  const track = cardsCarousel.querySelector('.cards-track');
  const cards = Array.from(track.children);
  const nextBtn = cardsCarousel.querySelector('.next-btn');
  const prevBtn = cardsCarousel.querySelector('.prev-btn');

  let currentCardIndex = 0;
  let totalCards = cards.length;
  let cardWidth = 0;
  let cardsInView = 1;

  // Função para atualizar medidas conforme a tela
  const updateSizes = () => {
    cardWidth = cards[0].offsetWidth + 30; // largura + gap
    if (window.innerWidth >= 1024) {
      cardsInView = 2;
    } else if (window.innerWidth >= 768) {
      cardsInView = 2;
    } else {
      cardsInView = 2;
    }
  };

  // Função para mover o carrossel para o índice atual
  const moveCarousel = () => {
    track.style.transform = `translateX(${-currentCardIndex * cardWidth}px)`;
  };

  // Evento de clique no botão "Próximo"
  nextBtn.addEventListener('click', () => {
    if (currentCardIndex >= totalCards - cardsInView) {
      currentCardIndex = 0;
    } else {
      currentCardIndex++;
    }
    moveCarousel();
  });

  // Evento de clique no botão "Anterior"
  prevBtn.addEventListener('click', () => {
    if (currentCardIndex <= 0) {
      currentCardIndex = totalCards - cardsInView;
    } else {
      currentCardIndex--;
    }
    moveCarousel();
  });

  // Inicializa
  updateSizes();
  moveCarousel();

  // Recalcula no resize
  window.addEventListener('resize', () => {
    updateSizes();
    moveCarousel();
  });
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






















