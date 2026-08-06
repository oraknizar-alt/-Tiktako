document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('giftModal');
    const openBtn = document.getElementById('openGiftModal');
    const closeBtn = document.getElementById('closeGiftModal');
    const closeBtnFooter = document.getElementById('closeGiftModalBtn');

    // Hediye Modalını Aç
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Hediye Modalını Kapat
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeBtnFooter.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ekranın boş bir yerine tıklandığında kapat
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
