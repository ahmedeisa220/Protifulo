document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuToggle.classList.toggle('toggle-active');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('toggle-active');
            });
        });
    }

    // 2. Dynamic Typewriter Effect for Hero Section
    const skills = [
        "مهتم بالبرمجة والذكاء الاصطناعي",
        "حافظ للقرآن الكريم كاملاً",
        "أقرأ بالقراءات العشر ومجاز بحفص وورش",
        "منسق كتب ومصمم جرافيك",
        "مونتير فيديو مبدع"
    ];
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const dynamicTextElement = document.querySelector('.dynamic-text');

    function typeWriter() {
        if (!dynamicTextElement) return;

        const currentSkill = skills[skillIndex];

        if (isDeleting) {
            dynamicTextElement.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            dynamicTextElement.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentSkill.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            typeSpeed = 500; // Pause before start typing new word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter
    setTimeout(typeWriter, 1000);

    // 3. Intersection Observer for Fade-In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // 4. 3D Tilt Effect on Desktop (Vanilla JS)
    const tiltCards = document.querySelectorAll('.tilt-card');

    // Check if device supports hover (not a touch screen)
    if (window.matchMedia("(hover: hover)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Max rotation degree
                const maxRotation = 10;

                const rotateX = ((y - centerY) / centerY) * -maxRotation;
                const rotateY = ((x - centerX) / centerX) * maxRotation;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Add a dynamic glare effect
                card.style.border = '1px solid rgba(0, 244, 255, 0.4)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.border = '1px solid var(--glass-border)';
            });
        });
    }

    // 5. Active Nav Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });

        // Add shadow to nav on scroll
        const nav = document.querySelector('.glass-nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
                nav.style.padding = '0.8rem 2rem';
            } else {
                nav.style.boxShadow = 'none';
                nav.style.padding = '1.2rem 2rem';
            }
        }
    });
});
