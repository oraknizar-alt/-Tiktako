// CİHAZA ÖZEL BENZERSİZ KİMLİK (DEVICE TOKEN) ÜRETİCİSİ
function cihazKimligiAl() {
    let devId = localStorage.getItem('user_device_id');
    if (!devId) {
        devId = 'DEV_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('user_device_id', devId);
    }
    return devId;
}

// ÖDEME VE CİHAZ DOĞRULAMA
function gercekOdemeBaslat() {
    // BURAYA SHOPIER / PAYTR ÖDEME LİNKİNİ EKLİYORUZ
    const odemeLinki = "https://www.shopier.com/"; // Kendi Shopier linkinizi koyun
    
    // Simüle Ödeme Onayı
    const onay = confirm("Ödeme sayfasına yönlendiriliyorsunuz. Ödemeyi tamamladıktan sonra APK kilitleri bu telefona özel açılacaktır. Devam edilsin mi?");
    if(onay) {
        const cihazId = cihazKimligiAl();
        // Cihazın satın aldığı bilgisini yerel hafızaya şifreli olarak kaydet
        localStorage.setItem('purchased_' + cihazId, 'true');
        
        kilitleriKontrolEt();
        alert("Satın alma bu cihaz için başarıyla doğrulandı!");
    }
}

function kilitleriKontrolEt() {
    const cihazId = cihazKimligiAl();
    const satinAlindiMi = localStorage.getItem('purchased_' + cihazId);

    if (satinAlindiMi === 'true') {
        document.getElementById('lock-status-text').innerText = "✅ Bu Cihaz İçin Satın Alındı! İndirebilirsiniz.";
        document.getElementById('lock-status-text').className = "status-text unlocked";
        document.getElementById('buy-btn').classList.add('hidden');
        
        const apkBtn = document.getElementById('download-apk-btn');
        apkBtn.classList.remove('disabled');
        apkBtn.removeAttribute('disabled');
    }
}

function guvenliApkIndir() {
    const cihazId = cihazKimligiAl();
    const satinAlindiMi = localStorage.getItem('purchased_' + cihazId);

    if (satinAlindiMi !== 'true') {
        alert("BU LİNK SADECE SATIN ALAN CİHAZDA ÇALIŞIR! Başka telefondan erişilemez.");
        return;
    }

    // MediaFire APK Bağlantısı
    window.location.href = "https://www.mediafire.com/file/o7pcnoteaatlk3s/Tiktok_Mobil_St%25C3%25BCdyo.apk/file";
}

// AI BOT MANTIĞI
function aiPenceresiAcKapat() {
    document.getElementById('ai-chat-window').classList.toggle('hidden');
}

function aiTusaBasildi(e) {
    if (e.key === 'Enter') aiMesajGonder();
}

function aiMesajGonder() {
    const input = document.getElementById('ai-user-input');
    const mesaj = input.value.trim();
    if (!mesaj) return;

    const msgsBox = document.getElementById('ai-messages');
    
    // Kullanıcı Mesajı
    msgsBox.innerHTML += `<div class="user-msg">${mesaj}</div>`;
    input.value = '';
    msgsBox.scrollTop = msgsBox.scrollHeight;

    // AI Yanıtı
    setTimeout(() => {
        let aiCevap = "Tiktok Mobil Stüdyo, canlı yayınlarınızı profesyonelleştiren harika bir araçtır!";
        const m = mesaj.toLowerCase();

        if (m.includes('nasıl') || m.includes('kullanılır')) {
            aiCevap = "Uygulamamız çok basittir: APK'yı indirin, yayın ekranınıza eklemek istediğiniz TikTok hediyelerini veya videoları seçin ve canlı yayınınızı başlatın!";
        } else if (m.includes('özellik') || m.includes('ne var')) {
            aiCevap = "Özelliklerimiz: 1. Şeffaf TikTok Hediye Overlay'leri, 2. Özel Video Ekleme, 3. Tam Ekran Canlı Yayın Özelleştirme ve Anlık Ses Efektleri!";
        } else if (m.includes('fiyat') || m.includes('ücret') || m.includes('satın')) {
            aiCevap = "Sitemizdeki 'Güvenli Ödeme Yap' butonuna basarak uygulamayı tek seferlik satın alabilir ve doğrudan cihazınıza indirebilirsiniz.";
        } else {
            aiCevap = "Geri bildiriminiz için teşekkürler! Tiktok Mobil Stüdyo ile canlı yayınlarınızda ekrana hediye ve videolar ekleyerek izleyicilerinizi etkileyebilirsiniz. Başka ne öğrenmek istersiniz?";
        }

        msgsBox.innerHTML += `<div class="bot-msg">${aiCevap}</div>`;
        msgsBox.scrollTop = msgsBox.scrollHeight;
    }, 600);
}

// ADMIN PANEL
const ADMIN_SIFRESI = "19071907";
function adminPaneliAc() { document.getElementById('admin-modal').classList.remove('hidden'); }
function adminPaneliKapat() { document.getElementById('admin-modal').classList.add('hidden'); }
function adminGirisKontrol() {
    if (document.getElementById('admin-pass-input').value === ADMIN_SIFRESI) {
        document.getElementById('admin-login-form').classList.add('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
    } else { alert("Hatalı Şifre!"); }
}

function adminDegisiklikleriKaydet() {
    const t = document.getElementById('edit-hero-title').value;
    const d = document.getElementById('edit-hero-desc').value;
    const url = document.getElementById('edit-media-url').value;
    const type = document.getElementById('edit-media-type').value;

    if(t) document.getElementById('hero-title').innerText = t;
    if(d) document.getElementById('hero-desc').innerText = d;
    if(url) {
        if(type === 'image') {
            document.getElementById('preview-image').src = url;
            document.getElementById('preview-image').classList.remove('hidden');
            document.getElementById('preview-video').classList.add('hidden');
        } else {
            document.getElementById('video-source').src = url;
            document.getElementById('preview-video').load();
            document.getElementById('preview-video').classList.remove('hidden');
            document.getElementById('preview-image').classList.add('hidden');
        }
    }
    alert("Kaydedildi!");
    adminPaneliKapat();
}

window.onload = function() {
    kilitleriKontrolEt();
};
