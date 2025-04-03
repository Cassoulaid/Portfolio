document.addEventListener("DOMContentLoaded", function() {
    function initializeCarousel(carouselContainer) {
        let currentSlide = 0;
        const slides = carouselContainer.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;
        
        const indicatorsContainer = carouselContainer.querySelector('.indicators');
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            indicator.dataset.index = i;
            indicatorsContainer.appendChild(indicator);
        }

        function updateSlide() {
            const offset = -currentSlide * 100;
            carouselContainer.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

            const indicators = indicatorsContainer.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
        }

        let loc = window.location.pathname;

        if (loc = "/index.html"){
            setInterval(nextSlide, 3000);
        }

        carouselContainer.querySelector('.next').addEventListener('click', nextSlide);
        carouselContainer.querySelector('.prev').addEventListener('click', prevSlide);

        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                currentSlide = parseInt(indicator.dataset.index, 10);
                updateSlide();
            });
        });
    }

    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(initializeCarousel);
    
    
    function Footer(){
        return `
        <footer> 
            <div class='head'>
                <div>
                    <h2>Assistance</h2>
                    <a href='#'>Centre d'aide</a>
                    <a href='#'>AirCover</a>
                    <a href='#'>Assistance Handicap</a>
                    <a href='#'>Options d'annulation</a>
                    <a href='#'>Soucis de voisinage</a>
                </div>
                <div>
                    <h2>Accueil des voyageurs</h2>
                    <a href='#'>Mettre votre logement sur Airbnb</a>
                    <a href='#'>AirCover pour les Hôtes</a>
                    <a href='#'>Ressource pour les Hôtes</a>
                    <a href='#'>Forum de la communauté</a>
                    <a href='#'>Hébergement responsable</a>
                    <a href='#'>Participez à un cours gratuit sur l'accueil de voyageurs</a>
                    <a href='#'>Trouver un co-hôte</a>
                </div>
                <div>
                    <h2>Airbnb</h2>
                    <a href='#'>Newsroom</a>
                    <a href='#'>Nouvelles fonctionnalités</a>
                    <a href='#'>Carrières</a>
                    <a href='#'>Investisseurs</a>
                    <a href='#'>Cartes Cadeaux</a>
                    <a href='#'>Séjours d'urgence</a>
                    <a href='#'>Airbnb.org</a>
                </div>
            </div>
            <div class='foot'>
                <div>
                    <p>© 2024 Airbnb, Inc.</p>
                    <a href='#'>Conditions générales</a>
                    <a href='#'>Informations sur l'entreprise</a>
                </div>
                <div>
                    <a href='#'>Confidentialité </a>
                    <a href='#'>Plan du site</a>
                    <a href='#'>Fonctionnement du site</a>
                </div>
                <div>
                <a href='#'> <img src='images/icons/Facebook.png'> </a>
                    <a href='#'> <img src='images/icons/TwitterX.png'> </a>
                    <a href='#'> <img src='images/icons/Instagram.png'> </a>
                </div>
            </div>
        </footer>
        `;
    }
    
    document.getElementById("footer").innerHTML = Footer();
});

