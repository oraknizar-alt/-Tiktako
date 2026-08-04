// HediyeBox Konfigürasyonu (Sesler ve Özel Mesajlar)
const giftConfig = {
  "Rose": {
    customText: "Gül gönderdi, eyvallah!",
    sound: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
  },
  "Gül": {
    customText: "Gül gönderdi, eyvallah!",
    sound: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
  },
  "Lion": {
    customText: "KRAL ASLAN GELDİ! ASLANIM BENİM!",
    sound: "aslan_sesi.mp3"
  },
  "Aslan": {
    customText: "KRAL ASLAN GELDİ! ASLANIM BENİM!",
    sound: "aslan_sesi.mp3"
  }
};

// WebSocket Bağlantısı
const socket = io('https://tiktako-backend.onrender.com');

// URL'den Yayıncı Adını Al
const urlParams = new URLSearchParams(window.location.search);
const tiktokUser = urlParams.get('user') || 'demo';

socket.emit('join-room', tiktokUser);

// 1. CANLI HEDİYE TETİKLEYİCİ
socket.on('tiktok-gift', (data) => {
  showGiftAlert(data.uniqueId, data.giftName, data.giftPictureUrl);
});

// 2. CANLI BEĞENİ TETİKLEYİCİ
socket.on('tiktok-like', (data) => {
  document.getElementById('like-count').innerText = data.totalLikeCount;
});

// Hediye Kartını Gösterme Fonksiyonu
function showGiftAlert(username, giftName, giftImgUrl) {
  const card = document.getElementById('gift-card');
  const senderEl = document.getElementById('gift-sender');
  const msgEl = document.getElementById('gift-message');
  const iconEl = document.getElementById('gift-icon');

  const conf = giftConfig[giftName] || {
    customText: `${giftName} gönderdi!`,
    sound: null
  };

  senderEl.innerText = `@${username}`;
  msgEl.innerText = conf.customText;
  if (giftImgUrl) iconEl.src = giftImgUrl;

  if (conf.sound) {
    const audio = new Audio(conf.sound);
    audio.play().catch(e => console.log("Ses oynatma hatası:", e));
  }

  card.classList.remove('hidden');

  setTimeout(() => {
    card.classList.add('hidden');
  }, 4000);
}

// 3. CANLI TAKİP BİLDİRİMİ VE HAVAİ FİŞEK
socket.on('tiktok-follow', (data) => {
  const fCard = document.getElementById('follower-card');
  if (fCard) {
    document.getElementById('follower-name').innerText = `@${data.uniqueId}`;

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.15 }
      });
    }

    fCard.classList.remove('hidden');
    setTimeout(() => fCard.classList.add('hidden'), 4000);
  }
});

// 4. CANLI CHAT VE TTS (SESLİ OKUMA)
socket.on('tiktok-chat', (data) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(`${data.uniqueId} der ki: ${data.comment}`);
    utterance.lang = 'tr-TR';
    window.speechSynthesis.speak(utterance);
  }
});
