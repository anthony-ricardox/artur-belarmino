// ---------------- MENU HAMBÚRGUER ---------------- 
const hamburguer = document.getElementById('hamburguer');
const menu = document.getElementById('menu');

if (hamburguer && menu) {
    hamburguer.addEventListener('click', () => {
        menu.classList.toggle('active');
        
        // Alterna entre o ícone hamburguer e o X
        if (hamburguer.classList.contains('open')) {
            hamburguer.innerHTML = '&#9776;'; // hamburguer
            hamburguer.classList.remove('open');
        } else {
            hamburguer.innerHTML = '&#10005;'; // X
            hamburguer.classList.add('open');
        }
    });
}


// ---------------- CARROSSEL HOME - LOOP INFINITO ----------------
// ---------------- CARROSSEL HOME - LOOP INFINITO ----------------
const homeTrack = document.querySelector('.carousel-track');
const homeImages = homeTrack ? Array.from(homeTrack.children) : [];
const homePrevBtn = document.querySelector('.home-btn.prev');
const homeNextBtn = document.querySelector('.home-btn.next');

if (homeTrack) {
    let currentHomeIndex = 0;
    let imagesPerPage = 3;

    const updateHomeImagesPerPage = () => {
        if (window.innerWidth < 768) {
            imagesPerPage = 2; // mobile
        } else if (window.innerWidth < 1024) {
            imagesPerPage = 2; // tablet
        } else {
            imagesPerPage = 3; // desktop
        }
    };

    const updateHomeCarousel = () => {
        if (homeImages.length === 0) return;
        const imageWidth = homeImages[0].getBoundingClientRect().width;
        homeTrack.style.transform = `translateX(${-currentHomeIndex * imageWidth}px)`;
    };

    homeNextBtn.addEventListener('click', () => {
        currentHomeIndex++;
        if (currentHomeIndex > homeImages.length - imagesPerPage) {
            currentHomeIndex = 0; // volta pro início
        }
        updateHomeCarousel();
    });

    homePrevBtn.addEventListener('click', () => {
        currentHomeIndex--;
        if (currentHomeIndex < 0) {
            currentHomeIndex = homeImages.length - imagesPerPage;
        }
        updateHomeCarousel();
    });

    window.addEventListener('resize', () => {
        updateHomeImagesPerPage();
        if (currentHomeIndex > homeImages.length - imagesPerPage) {
            currentHomeIndex = homeImages.length - imagesPerPage;
        }
        updateHomeCarousel();
    });

    updateHomeImagesPerPage();
    updateHomeCarousel();
}


// ---------------- CARROSSEL DE CARDS - PORTFÓLIO ----------------
const cardsCarousel = document.querySelector('.cards-carousel');
if (cardsCarousel) {
    window.addEventListener('load', () => {
        const track = cardsCarousel.querySelector('.cards-track');
        const cards = Array.from(track.children);
        const nextBtn = cardsCarousel.querySelector('.next-btn');
        const prevBtn = cardsCarousel.querySelector('.prev-btn');

        let currentCardIndex = 0;
        let totalCards = cards.length;
        let cardWidth = 0;
        let cardsInView = 3; // padrão desktop

        const updateSizes = () => {
            if (cards.length === 0) return;
            cardWidth = cards[0].offsetWidth + 30;

            if (window.innerWidth >= 1024) {
                cardsInView = 1; // desktop
            } else if (window.innerWidth >= 768) {
                cardsInView = 1; // tablet
            } else {
                cardsInView = 1; // mobile
            }
        };

        const moveCarousel = () => {
            track.style.transform = `translateX(${-currentCardIndex * cardWidth}px)`;
        };

        nextBtn.addEventListener('click', () => {
            currentCardIndex += cardsInView;

            if (currentCardIndex >= totalCards) {
                currentCardIndex = 0;
            }

            moveCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentCardIndex -= cardsInView;

            if (currentCardIndex < 0) {
                currentCardIndex = Math.max(totalCards - cardsInView, 0);
            }

            moveCarousel();
        });

        updateSizes();
        moveCarousel();

        window.addEventListener('resize', () => {
            updateSizes();
            moveCarousel();
        });
    });
}


// ---------------- SLIDESHOW "QUEM SOU EU" ----------------
let slideIndex = 0;
function showSlides(n) {
    const slides = document.querySelectorAll(".slides img");
    if (slides.length === 0) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach((slide, i) => {
        slide.style.display = (i === slideIndex) ? "block" : "none";
    });
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}
showSlides(slideIndex);





  // Pegar o botão
  const btnTopo = document.getElementById("btnTopo");

  // Mostrar/esconder botão ao rolar a página
  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  };

  // Voltar para o topo quando clicar
  btnTopo.onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // rolagem suave
    });
  };




// ---------------- LIGHTBOX ----------------
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const imageCounter = document.getElementById('image-counter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    // Abrir o lightbox ao clicar em uma imagem
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.style.display = 'flex';
        });
    });

    // Fechar o lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Navegar para a imagem anterior
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showImage(currentIndex);
    });

    // Navegar para a próxima imagem
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showImage(currentIndex);
    });

    // Exibir a imagem e o contador
    function showImage(index) {
        const imageUrl = galleryItems[index].src;
        lightboxImg.src = imageUrl;
        imageCounter.textContent = `${index + 1}/${galleryItems.length}`;
    }

    // Fechar o lightbox clicando fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navegar com as setas do teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
});