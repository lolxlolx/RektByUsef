        const modeToggle = document.getElementById('mode-toggle');
        const body = document.body;
        const zoomModal = document.getElementById('zoomModal');
        const zoomImage = document.querySelector('.zoom-image');
        const closeZoom = document.querySelector('.close-zoom');

        // Check for user's preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            body.classList.add('light-mode');
            updateModeToggleIcon(true);
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            updateModeToggleIcon(body.classList.contains('light-mode'));
        });

        function updateModeToggleIcon(isLightMode) {
            const iconPath = isLightMode
                ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`
                : `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
            
            modeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`;
        }

        // Zoom functionality
        document.querySelectorAll('.art-piece').forEach(piece => {
            piece.addEventListener('click', () => {
                const imgSrc = piece.querySelector('img').src;
                const imgAlt = piece.querySelector('img').alt;
                zoomImage.src = imgSrc;
                zoomImage.alt = imgAlt;
                zoomModal.classList.add('active');
            });
        });

        closeZoom.addEventListener('click', () => {
            zoomModal.classList.remove('active');
        });

        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal) {
                zoomModal.classList.remove('active');
            }
        });

        // Intersection Observer for lazy loading and animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.art-piece').forEach(piece => {
            observer.observe(piece);
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add parallax effect to art pieces
        window.addEventListener('scroll', () => {
            const artPieces = document.querySelectorAll('.art-piece');
            artPieces.forEach((piece, index) => {
                const speed = 1 + index * 0.1;
                const yPos = -(window.pageYOffset * speed / 10);
                piece.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Add custom cursor
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect to art pieces
        document.querySelectorAll('.art-piece').forEach(piece => {
            piece.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            piece.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
