// Hediye ve Ses Özel Ayarları
const giftLibrary = {
  "Rose": {
    name: "Gül",
    sound: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
    customText: "Gül gönderdi, teşekkürler!"
  },
  "Lion": {
    name: "Aslan",
    sound: "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3", // Aslan kükreme sesi
    customText: "KRAL ASLAN GELDİ! ASLANIM BENİM!"
  }
};

function triggerTikTokGift(username, giftName, giftImgUrl) {
  const giftData = giftLibrary[giftName] || {
    sound: "",
    customText: `${giftName} gönderdi!`
  };

  const giftBox = document.getElementById('gift-box');
  const giftText = document.getElementById('gift-name');
  const giftImg = document.getElementById('gift-image');
  const senderText = document.getElementById('sender-name');

  senderText.innerText = `@${username}`;
  giftText.innerText = giftData.customText;
  giftImg.src = giftImgUrl || "https://cdn-icons-png.flaticon.com/512/4213/4213958.png";

  // Ses Oynat
  if (giftData.sound) {
    const audio = new Audio(giftData.sound);
    audio.play().catch(e => console.log("Ses hatası:", e));
  }

  // Ekranda Göster
  giftBox.classList.remove('hidden');

  setTimeout(() => {
    giftBox.classList.add('hidden');
  }, 4000);
}
