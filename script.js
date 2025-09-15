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
const homeTrack = document.querySelector('.carousel-track');
const homeImages = homeTrack ? Array.from(homeTrack.children) : [];
const homePrevBtn = document.querySelector('.home-btn.prev');
const homeNextBtn = document.querySelector('.home-btn.next');

if (homeTrack) {
    let currentHomeIndex = 0;
    let imagesPerPage = 3;

    const updateHomeImagesPerPage = () => {
        imagesPerPage = window.innerWidth < 1024 ? 2 : 3;
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
            currentHomeIndex = Math.max(homeImages.length - imagesPerPage, 0);
        }
        updateHomeCarousel();
    });

    window.addEventListener('resize', () => {
        updateHomeImagesPerPage();
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
                cardsInView = 1;
            } else if (window.innerWidth >= 768) {
                cardsInView = 1;
            } else {
                cardsInView = 1;
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


// ---------------- LIGHTBOX ----------------
const galleryItemWrappers = document.querySelectorAll('.gallery-item-wrapper');
const lightbox = document.getElementById('lightbox');

if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    const imageCounter = document.getElementById('image-counter');

    let currentIndex = 0;
    const totalImages = galleryItemWrappers.length;

    const updateImageAndCounter = () => {
        const currentImageSrc = galleryItemWrappers[currentIndex].querySelector('.gallery-item').src;
        lightboxImg.src = currentImageSrc;
        imageCounter.textContent = `${currentIndex + 1}/${totalImages}`;
    };

    const openLightbox = (index) => {
        currentIndex = index;
        lightbox.style.display = 'flex';
        updateImageAndCounter();
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateImageAndCounter();
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateImageAndCounter();
    };

    // Eventos
    galleryItemWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Fechar lightbox clicando fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Fechar com a tecla ESC e navegar com setas do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft') {
            showPrev();
        }
        if (e.key === 'ArrowRight') {
            showNext();
        }
    });
}