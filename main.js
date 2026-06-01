const texts = [
        "Jr. Full Stack Developer",
        "PHP Developer",
        "Freelance Web Developer"
    ];

    let textIndex = 0;
    let charIndex = 0;

    function typeEffect() {

        const currentText = texts[textIndex];

        document.getElementById("job-title").textContent =
            currentText.substring(0, charIndex);

        charIndex++;

        if (charIndex <= currentText.length) {

            setTimeout(typeEffect, 100);

        } else {

            setTimeout(() => {

                charIndex = 0;

                textIndex++;

                // LOOP BACK TO START
                if (textIndex >= texts.length) {
                    textIndex = 0;
                }

                typeEffect();

            }, 1500);

        }

    }

    typeEffect();

    const siteHeader = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('main section[id]');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileThemeToggleIcon = document.getElementById('mobile-theme-toggle-icon');

    function updateHeaderShadow() {
        const hasScrolled = window.scrollY > 20;
        siteHeader.classList.toggle('shadow-sm', hasScrolled);
        siteHeader.classList.toggle('dark:shadow-zinc-900', hasScrolled);
    }

    function updateThemeIcon() {
        const isDark = document.documentElement.classList.contains('dark');
        themeToggleIcon.classList.toggle('fa-moon', !isDark);
        themeToggleIcon.classList.toggle('fa-sun', isDark);
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        mobileThemeToggleIcon.classList.toggle('fa-moon', !isDark);
        mobileThemeToggleIcon.classList.toggle('fa-sun', isDark);
        mobileThemeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    function setMobileMenuOpen(isOpen) {
        mobileMenu.classList.toggle('hidden', !isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', isOpen.toString());
        mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        mobileMenuIcon.classList.toggle('fa-bars', !isOpen);
        mobileMenuIcon.classList.toggle('fa-xmark', isOpen);
    }

    function updateActiveNavLink() {
        let currentSectionId = pageSections[0].id;
        const scrollPosition = window.scrollY + siteHeader.offsetHeight + window.innerHeight * 0.25;

        pageSections.forEach((section) => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });
    }

    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcon();
    });

    mobileThemeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcon();
    });

    mobileMenuToggle.addEventListener('click', () => {
        setMobileMenuOpen(mobileMenu.classList.contains('hidden'));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setMobileMenuOpen(false);
        });
    });

    updateThemeIcon();
    updateHeaderShadow();
    updateActiveNavLink();
    window.addEventListener('scroll', updateHeaderShadow);
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('resize', () => {
        updateActiveNavLink();

        if (window.innerWidth >= 768) {
            setMobileMenuOpen(false);
        }
    });
