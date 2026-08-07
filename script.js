document.addEventListener('DOMContentLoaded', () => {
    // Google Login İşlemi
    const authModal = document.getElementById('googleAuthModal');
    const googleBtn = document.getElementById('googleLoginBtn');

    googleBtn.addEventListener('click', () => {
        // Giriş yapıldı farz edilerek pencere kapatılır
        authModal.style.display = 'none';
    });

    // Modallar
    const giftModal = document.getElementById('giftModal');
    const openGiftBtn = document.getElementById('openGiftModal');
    const closeGiftBtn = document.getElementById('closeGiftModal');

    const aboutModal = document.getElementById('aboutModal');
    const openAboutBtn = document.getElementById('openAboutModal');
    const closeAboutBtn = document.getElementById('closeAboutModal');

    const aiModal = document.getElementById('aiChatModal');
    const aiBtn = document.getElementById('aiAssistantBtn');
    const closeAiBtn = document.getElementById('closeAiModal');

    // Hediye Modalı
    openGiftBtn.addEventListener('click', () => giftModal.style.display = 'flex');
    closeGiftBtn.addEventListener('click', () => giftModal.style.display = 'none');

    // Uygulama Hakkında Modalı
    openAboutBtn.addEventListener('click', () => aboutModal.style.display = 'flex');
    closeAboutBtn.addEventListener('click', () => aboutModal.style.display = 'none');

    // AI Asistan Modalı
    aiBtn.addEventListener('click', () => aiModal.style.display = 'flex');
    closeAiBtn.addEventListener('click', () => aiModal.style.display = 'none');

    // Dışarıya tıklanınca modalları kapatma
    window.addEventListener('click', (e) => {
        if (e.target === giftModal) giftModal.style.display = 'none';
        if (e.target === aboutModal) aboutModal.style.display = 'none';
        if (e.target === aiModal) aiModal.style.display = 'none';
    });
});
