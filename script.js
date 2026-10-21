document.addEventListener('DOMContentLoaded', () => {
    // 1. Force Video Autoplay di Mobile
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

    // 2. Mobile Menu Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    function openMobileMenu() {
        if (mobileNav) mobileNav.classList.add('active');
    }

    function closeMobileMenu() {
        if (mobileNav) mobileNav.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

    // Toast Alert Global
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }
    }

    window.copyText = function(str) {
        navigator.clipboard.writeText(str).then(() => {
            showToast('Teks berhasil disalin!');
        });
    };

    // 3. Tool 1: Fancy Text Generator
    const fancyInput = document.getElementById('fancyInput');
    const fancyResults = document.getElementById('fancyResults');

    if (fancyInput && fancyResults) {
        fancyInput.addEventListener('input', () => {
            const val = fancyInput.value.trim() || 'Rayze';
            fancyResults.innerHTML = `
                <div class="fancy-item"><span class="fancy-text">⚔️ 𝓡${val.slice(1)} ⚔️</span><button class="btn-copy" onclick="copyText('⚔️ 𝓡${val.slice(1)} ⚔️')">Copy</button></div>
                <div class="fancy-item"><span class="fancy-text">⚡ Ⓡⓐⓨⓖⓔ ⚡</span><button class="btn-copy" onclick="copyText('⚡ ${val.toUpperCase()} ⚡')">Copy</button></div>
                <div class="fancy-item"><span class="fancy-text">꧁༺ ${val} ༻꧂</span><button class="btn-copy" onclick="copyText('꧁༺ ${val} ༻꧂')">Copy</button></div>
                <div class="fancy-item"><span class="fancy-text">☠️ ░${val}░ ☠️</span><button class="btn-copy" onclick="copyText('☠️ ░${val}░ ☠️')">Copy</button></div>
            `;
        });
    }

    // 4. Tool 2: Code Minifier
    const minifierInput = document.getElementById('minifierInput');
    const minifierOutput = document.getElementById('minifierOutput');
    const btnMinify = document.getElementById('btnMinify');
    const btnCopyMinified = document.getElementById('btnCopyMinified');

    if (btnMinify && minifierInput && minifierOutput) {
        btnMinify.addEventListener('click', () => {
            const raw = minifierInput.value;
            if (!raw) return showToast('Masukkan kode terlebih dahulu!');
            const minified = raw
                .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*/g, '') // Hapus komentar
                .replace(/\s+/g, ' ') // Gabung spasi
                .replace(/\s*([{}:;,=+\-*/])\s*/g, '$1') // Pangkas spasi sekitar simbol
                .trim();
            minifierOutput.value = minified;
            showToast('Kode berhasil dikompres!');
        });

        btnCopyMinified.addEventListener('click', () => {
            if (minifierOutput.value) window.copyText(minifierOutput.value);
        });
    }

    // 5. Tool 3: WA Direct Link Generator
    const waPhone = document.getElementById('waPhone');
    const waText = document.getElementById('waText');
    const btnGenWA = document.getElementById('btnGenWA');
    const waResult = document.getElementById('waResult');
    const btnCopyWA = document.getElementById('btnCopyWA');

    if (btnGenWA && waPhone && waResult) {
        btnGenWA.addEventListener('click', () => {
            let phone = waPhone.value.replace(/[^0-9]/g, '');
            if (!phone) return showToast('Masukkan nomor WA yang valid!');
            let msg = encodeURIComponent(waText.value || '');
            let link = `https://wa.me/${phone}${msg ? '?text=' + msg : ''}`;
            waResult.value = link;
            btnCopyWA.style.display = 'block';
            showToast('Link WA berhasil dibuat!');
        });

        btnCopyWA.addEventListener('click', () => {
            if (waResult.value) window.copyText(waResult.value);
        });
    }

    // 6. Tool 4: Base64 Encoder / Decoder
    const cryptoInput = document.getElementById('cryptoInput');
    const cryptoOutput = document.getElementById('cryptoOutput');
    const btnB64Encode = document.getElementById('btnB64Encode');
    const btnB64Decode = document.getElementById('btnB64Decode');

    if (btnB64Encode && cryptoInput && cryptoOutput) {
        btnB64Encode.addEventListener('click', () => {
            try {
                cryptoOutput.value = btoa(cryptoInput.value);
                showToast('Encoded to Base64!');
            } catch (e) {
                showToast('Format input tidak valid!');
            }
        });

        btnB64Decode.addEventListener('click', () => {
            try {
                cryptoOutput.value = atob(cryptoInput.value);
                showToast('Decoded from Base64!');
            } catch (e) {
                showToast('Gagal decode string!');
            }
        });
    }

    // 7. Tool 5: AM Preset Cleaner
    const amLinkInput = document.getElementById('amLinkInput');
    const amLinkResult = document.getElementById('amLinkResult');
    const btnAMClean = document.getElementById('btnAMClean');

    if (btnAMClean && amLinkInput && amLinkResult) {
        btnAMClean.addEventListener('click', () => {
            const raw = amLinkInput.value.trim();
            if (!raw) return showToast('Paste link Alight Motion!');
            const clean = raw.split('?')[0];
            amLinkResult.value = clean;
            window.copyText(clean);
        });
    }

    // 8. Tool 6: MediaLink Cleaner
    const mediaUrlInput = document.getElementById('mediaUrlInput');
    const mediaUrlResult = document.getElementById('mediaUrlResult');
    const btnMediaClean = document.getElementById('btnMediaClean');

    if (btnMediaClean && mediaUrlInput && mediaUrlResult) {
        btnMediaClean.addEventListener('click', () => {
            const raw = mediaUrlInput.value.trim();
            if (!raw) return showToast('Paste link media!');
            const clean = raw.split('?')[0].split('#')[0];
            mediaUrlResult.value = clean;
            window.copyText(clean);
        });
    }

    // 9. Search & Filter Bar Logic
    const toolSearch = document.getElementById('toolSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const interactiveCards = document.querySelectorAll('.tool-card-interactive');

    let currentFilter = 'all';

    function filterTools() {
        const query = toolSearch ? toolSearch.value.toLowerCase().trim() : '';

        interactiveCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const name = card.getAttribute('data-name') || '';

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

    // 10. Scroll Observer Fade-In
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
