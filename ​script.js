// WebSocket Arka Plan Sunucu Bağlantısı
const socket = io('https://tiktako-backend.onrender.com');

let currentGoal = 350;
const targetGoal = 1000;

// 1. CANLI YAYINA BAĞLANMA
function connectStream() {
  const username = document.getElementById('tiktok-user').value.trim();
  if (!username) {
    alert('Lütfen geçerli bir TikTok kullanıcı adı girin!');
    return;
  }
  socket.emit('join-room', username);
  alert(`@${username} hesabının canlı yayınına bağlanılıyor...`);
}

// 2. TAKİPÇİ GELDİĞİNDE (HAVAİ FİŞEK + 2.5 cm KART)
socket.on('tiktok-follow', (data) => {
  triggerFollowerAlert(data.uniqueId);
});

function triggerFollowerAlert(username) {
  const alertCard = document.getElementById('follower-alert');
  document.getElementById('follower-name').innerText = `@${username}`;

  // Havai Fişek Patlat
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.15, y: 0.15 }
    });
  }

  alertCard.classList.remove('hidden');
  setTimeout(() => alertCard.classList.add('hidden'), 4000);
}

// 3. HEDİYE GELDİĞİNDE
socket.on('tiktok-gift', (data) => {
  triggerGiftAlert(data.uniqueId, data.giftName);
});

function triggerGiftAlert(username, giftName) {
  const giftCard = document.getElementById('gift-alert');
  document.getElementById('gift-sender').innerText = `@${username}`;
  document.getElementById('gift-text').innerText = `${giftName} gönderdi!`;

  // Ses Çalma (Gül için varsayılan ses)
  if (giftName === 'Rose' || giftName === 'Gül') {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log(e));
  }

  giftCard.classList.remove('hidden');
  setTimeout(() => giftCard.classList.add('hidden'), 4000);
}

// 4. CHAT VE TTS (SESLİ CHAT OKUMA)
socket.on('tiktok-chat', (data) => {
  const isTtsActive = document.getElementById('tts-toggle').checked;
  if (isTtsActive && 'speechSynthesis' in window) {
    const speed = parseFloat(document.getElementById('tts-speed').value);
    const speech = new SpeechSynthesisUtterance(`${data.uniqueId} diyor ki: ${data.comment}`);
    speech.lang = 'tr-TR';
    speech.rate = speed;
    window.speechSynthesis.speak(speech);
  }
});

// 5. BEĞENİ VE HEDEF ÇUBUĞU (GOAL BAR) GÜNCELLEME
socket.on('tiktok-like', (data) => {
  currentGoal += data.likeCount || 1;
  const percentage = Math.min((currentGoal / targetGoal) * 100, 100);
  
  document.getElementById('goal-count').innerText = `${currentGoal} / ${targetGoal}`;
  document.getElementById('goal-fill').style.width = `${percentage}%`;
});

// TEST BUTONLARI FONKSİYONLARI
function testFollower() {
  triggerFollowerAlert('Ahmet_Kral');
}

function testGift() {
  triggerGiftAlert('Ayse_2026', 'Rose');
}

function saveGiftSetting() {
  alert('Hediye ayarları kaydedildi!');
}
