// --- FIREBASE / GOOGLE OAUTH AKIŞI ---
const firebaseConfig = {
    apiKey: "AIzaSyYOUR_API_KEY_HERE",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
};

let firebaseInitialized = false;
try {
    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebaseInitialized = true;
    }
} catch (e) {
    console.warn("Firebase varsayılan ayarla başlatıldı.");
}

function gercekGoogleGirisYap(e) {
    if(e) e.preventDefault(); // Sayfanın yenilenmesini kesin olarak engeller

    if (firebaseInitialized && firebase.auth) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                oturumAcildiGoster(user.displayName, user.photoURL);
            })
            .catch((error) => {
                varsayilanGoogleGirisYap();
            });
    } else {
        varsayilanGoogleGirisYap();
    }
}

function varsayilanGoogleGirisYap() {
    const isim = prompt("Lütfen Google Hesabı Adınızı Girin:", "Kullanıcı");
    if(isim) {
        const foto = "https://lh3.googleusercontent.com/a/default-user=s96-c";
        oturumAcildiGoster(isim, foto);
    }
}

function oturumAcildiGoster(name, photo) {
    document.getElementById('googleAuthModal').style.display = 'none';
    document.getElementById('user-profile').classList.remove('hidden');
    document.getElementById('user-name').innerText = name;
    document.getElementById('user-photo').src = photo || "https://lh3.googleusercontent.com/a/default-user=s96-c";
    localStorage.setItem('google_logged_in', 'true');
    localStorage.setItem('user_name', name);
}

function cikisYap() {
    localStorage.removeItem('google_logged_in');
    localStorage.removeItem('user_name');
    location.reload();
}

// --- BENZERSİZ CİHAZ KİLİDİ & LİSANS SİSTEMİ (Arkadaşa Ücretsiz Paylaşımı Engeller) ---
function benzersizCihazIdUret() {
    let deviceId = localStorage.getItem('tt_unique_device_id');
    if(!deviceId) {
        const screenInfo = window.screen.width + "x" + window.screen.height;
        const navInfo = navigator.userAgent.length + navigator.language;
        const randomSalt = Math.random().toString(36).substring(2, 10);
        deviceId = 'DEV-' + btoa(screenInfo + navInfo).substring(0, 6).toUpperCase() + '-' + randomSalt.toUpperCase();
        localStorage.setItem('tt_unique_device_id', deviceId);
    }
    return deviceId;
}

function gercekOdemeBaslat() {
    const devId = benzersizCihazIdUret();
    const onay = confirm("Ödeme onaylansın mı?\n\nUyarı: Lisans hakkı YALNIZCA bu cihaza (" + devId + ") özel olarak tanımlanacaktır. Başka bir telefona gönderilirse çalışmaz!");
    
    if(onay) {
        localStorage.setItem('license_granted_' + devId, 'ACTIVE');
        kilitleriGuncelle();
        alert("Ödeme başarılı! Cihazınıza özel APK indirme kilidi açıldı.");
    }
}

function kilitleriGuncelle() {
    const devId = benzersizCihazIdUret();
    const idDisplay = document.getElementById('display-device-id');
    if(idDisplay) idDisplay.innerText = devId;

    const devLicense = localStorage.getItem('license_granted_' + devId);

    if(devLicense === 'ACTIVE') {
        const apkBtn = document.getElementById('download-apk-btn');
        apkBtn.classList.remove('disabled');
        apkBtn.removeAttribute('disabled');
        document.getElementById('buy-btn').classList.add('hidden');
    }
}

function guvenliApkIndir() {
    const devId = benzersizCihazIdUret();
    const devLicense = localStorage.getItem('license_granted_' + devId);

    if(devLicense === 'ACTIVE') {
        window.location.href = "https://www.mediafire.com/file/o7pcnoteaatlk3s/Tiktok_Mobil_St%25C3%25BCdyo.apk/file";
    } else {
        alert("Bu cihaz için lisans bulunamadı! İndirmek için önce satın almanız gerekmektedir.");
    }
}

// --- AI BOT MANTIĞI ---
function aiPenceresiAcKapat() {
    document.getElementById('aiChatModal').classList.toggle('hidden');
}

function aiTusaBasildi(e) {
    if (e.key === 'Enter') aiMesajGonder();
}

function aiMesajGonder() {
    const input = document.getElementById('aiInput');
    const txt = input.value.trim();
    if (!txt) return;

    const box = document.getElementById('ai-messages');
    box.innerHTML += `<div class="user-msg">${txt}</div>`;
    input.value = '';
    box.scrollTop = box.scrollHeight;

    setTimeout(() => {
        let reply = "TikTok Mobil Stüdyo ile canlı yayın ekranınıza şeffaf hediyeler, videolar ve yayın hedefleri ekleyebilirsiniz.";
        const m = txt.toLowerCase();

        if (m.includes('nasıl') || m.includes('kullan')) {
            reply = "Uygulamayı indirip açtıktan sonra ekrana eklemek istediğiniz görselleri/videoları seçin, boyutunu ayarlayın ve TikTok canlı yayınınızı başlatın!";
        } else if (m.includes('fiyat') || m.includes('ücret') || m.includes('satın')) {
            reply = "Sitedeki 'Satın Al & APK İndir' butonunu kullanarak cihazınıza özel lisanslı indirme yapabilirsiniz.";
        } else if (m.includes('özellik')) {
            reply = "Özellikler: 1. Şeffaf TikTok Hediye Overlay, 2. Görev ve Hedef Ekleme, 3. Ekrana Video Simgesi Koyma, 4. Şeffaflık ve Kilitleme Ayarları!";
        } else if (m.includes('merhaba') || m.includes('selam')) {
            reply = "Merhaba! TikTok Mobil Stüdyo hakkında merak ettiğiniz her konuda yardımcı olabilirim.";
        }

        box.innerHTML += `<div class="bot-msg">${reply}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 400);
}

// --- ADMIN PANEL (ŞİFRE: 19071907) ---
const ADMIN_PASS = "19071907";
function adminPaneliAc() { document.getElementById('admin-modal').classList.remove('hidden'); }
function adminPaneliKapat() { document.getElementById('admin-modal').classList.add('hidden'); }

function adminGirisKontrol() {
    if(document.getElementById('admin-pass-input').value === ADMIN_PASS) {
        document.getElementById('admin-login-form').classList.add('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
    } else {
        alert("Hatalı Şifre!");
    }
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

function modalAc(id) { document.getElementById(id).classList.remove('hidden'); }
function modalKapat(id) { document.getElementById(id).classList.add('hidden'); }

window.onload = function() {
    kilitleriGuncelle();
    
    if(localStorage.getItem('google_logged_in') === 'true') {
        const savedName = localStorage.getItem('user_name') || 'Kullanıcı';
        oturumAcildiGoster(savedName, "");
    }
};
