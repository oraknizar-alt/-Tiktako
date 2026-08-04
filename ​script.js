// URL'den TikTok kullanıcı adını al (Örn: site.vercel.app/?user=kullaniciadi)
const urlParams = new URLSearchParams(window.location.search);
const targetUser = urlParams.get('user') || 'default';

// Backend bağlantısı (Render veya Sunucu IP'niz)
const socket = io('https://SUNUCU-ADRESINIZ.onrender.com');

socket.emit('set-username', targetUser);

// 1. TAKİP ETME & HAVAİ FİŞEK EFEKTİ
socket.on('tiktok-follow', (data) => {
  const alertBox = document.getElementById('follower-alert');
  document.getElementById('follower-name').innerText = `@${data.username}`;

  // Havai Fişek Patlat (Canvas Confetti kütüphanesi ile)
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.2, x: 0.2 } // Sol üst köşede patlar
  });

  alertBox.classList.remove('hidden');
  setTimeout(() => alertBox.classList.add('hidden'), 4000);
});

// 2. TTS (CHAT OKUYUCU)
socket.on('tiktok-chat', (data) => {
  // TTS Seslendirme
  if ('speechSynthesis' in window) {
    const textToSpeech = new SpeechSynthesisUtterance(`${data.username} diyor ki: ${data.message}`);
    textToSpeech.lang = 'tr-TR';
    textToSpeech.rate = 1.0;
    window.speechSynthesis.speak(textToSpeech);
  }
});

// 3. BEĞENİ TABLOSU GÜNCELLEME
socket.on('tiktok-like', (data) => {
  document.getElementById('like-count').innerText = data.totalLikes;
});
