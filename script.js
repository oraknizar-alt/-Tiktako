// --- FIREBASE GERÇEK GOOGLE GİRİŞİ ---
const firebaseConfig = {
    apiKey: "AIzaSyYOUR_API_KEY_HERE",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function gercekGoogleGirisYap() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            document.getElementById('googleAuthModal').style.display = 'none';
            document.getElementById('user-profile').classList.remove('hidden');
            document.getElementById('user-name').innerText = user.displayName;
            document.getElementById('user-photo').src = user.photoURL;
        })
        .catch((error) => {
            alert("Google Giriş Hatası: " + error.message);
        });
}

function cikisYap() {
    firebase.auth().signOut().then(() => {
        location.reload();
    });
}

// --- AKILLI AI BOT MANTIĞI ---
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
            reply = "Harika bir gün! TikTok Mobil Stüdyo hakkında merak ettiğiniz her şeyi bana sorabilirsiniz.";
        }

        box.innerHTML += `<div class="bot-msg">${reply}</div>`;
        box.scrollTop = box.scrollHeight;
    }, 500);
}

// --- CİHAZA ÖZEL İNDİRME & İŞLEMLER ---
function cihazIdAl() {
    let dev = localStorage.getItem('my_dev_id');
    if(!dev) {
        dev = 'DEV_' + Math.random().toString(36).substr(2,8);
        localStorage.setItem('my_dev_id', dev);
    }
    return dev;
}

function gercekOdemeBaslat() {
    const dev = cihazIdAl();
    const ok = confirm("Ödeme onaylanıyor mu? Onay sonrası APK sadece bu telefonda indirilebilir olacaktır.");
    if(ok) {
        localStorage.setItem('paid_' + dev, 'true');
        kilitleriGuncelle();
        alert("Satın alma onaylandı!");
    }
}

function kilitleriGuncelle() {
    const dev = cihazIdAl();
    if(localStorage.getItem('paid_' + dev) === 'true') {
        const btn = document.getElementById('download-apk-btn');
        btn.classList.remove('disabled');
        btn.removeAttribute('disabled');
        document.getElementById('buy-btn').classList.add('hidden');
    }
}

function guvenliApkIndir() {
    window.location.href = "https://www.mediafire.com/file/o7pcnoteaatlk3s/Tiktok_Mobil_St%25C3%25BCdyo.apk/file";
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

function modalKapat(id) {
    document.getElementById(id).classList.add('hidden');
}

window.onload = function() {
    kilitleriGuncelle();
};
