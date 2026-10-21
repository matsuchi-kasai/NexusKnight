document.addEventListener('DOMContentLoaded', () => {
    // 1. Force Autoplay Video di HP / Browser Mobile
    const video = document.getElementById('mainVideo');
    if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                document.body.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }
    }

    // 2. Mobile Nav Logic
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileMenu() {
        mobileNav.classList.add('active');
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            const viewTarget = link.getAttribute('data-view');
            if (viewTarget) switchView(viewTarget);
        });
    });

    // 3. View Switcher (Home <-> Dashboard Tools)
    const homeView = document.getElementById('homeView');
    const toolsView = document.getElementById('toolsView');
    const navBtns = document.querySelectorAll('.nav-btn');
    const openToolsBtn = document.getElementById('openToolsBtn');
    const cardTools = document.getElementById('cardTools');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    function switchView(viewName) {
        if (viewName === 'tools') {
            homeView.classList.remove('active');
            toolsView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toolsView.classList.remove('active');
            homeView.classList.add('active');
        }

        // Update active class in desktop nav
        navBtns.forEach(btn => {
            if (btn.getAttribute('data-view') === viewName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-view');
            switchView(target);
        });
    });

    if (openToolsBtn) openToolsBtn.addEventListener('click', () => switchView('tools'));
    if (cardTools) cardTools.addEventListener('click', () => switchView('tools'));
    if (backToHomeBtn) backToHomeBtn.addEventListener('click', () => switchView('home'));

    // 4. Tools Search & Filter
    const toolSearch = document.getElementById('toolSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    let currentFilter = 'all';

    function filterTools() {
        const query = toolSearch ? toolSearch.value.toLowerCase().trim() : '';

        toolCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name');

            const matchesCategory = (currentFilter === 'all' || category === currentFilter);
            const matchesSearch = name.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (toolSearch) toolSearch.addEventListener('input', filterTools);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterTools();
        });
    });

    // 5. Tool Preview Modal
    const toolModal = document.getElementById('toolModal');
    const modalToolTitle = document.getElementById('modalToolTitle');
    const modalToolDesc = document.getElementById('modalToolDesc');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const launchBtns = document.querySelectorAll('.tool-launch-btn');

    launchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const toolName = btn.getAttribute('data-tool');
            modalToolTitle.textContent = toolName;
            modalToolDesc.textContent = `Akses langsung untuk ${toolName} tersedia melalui saluran resmi Keelz Valentine. Klik tombol di bawah untuk membuka item.`;
            toolModal.classList.add('active');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            toolModal.classList.remove('active');
        });
    }

    if (toolModal) {
        toolModal.addEventListener('click', (e) => {
            if (e.target === toolModal) toolModal.classList.remove('active');
        });
    }

    // 6. Scroll Fade Animation
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
