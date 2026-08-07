// --- ZORUNLU GOOGLE GİRİŞ & SAYFA KİLİDİ ---
function gercekGoogleGirisYap(e) {
    if(e) e.preventDefault(); // Sayfanın kesinlikle yenilenmesini önler
    
    const isim = prompt("Google (Gmail) Hesabınızın Adı:", "Kullanıcı");
    if (isim && isim.trim() !== "") {
        oturumAcildiGoster(isim, "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_56dp.png");
    } else {
        alert("Devam etmek için Google hesabınızı girmeniz zorunludur!");
    }
}

function oturumAcildiGoster(name, photo) {
    document.getElementById('googleAuthModal').style.display = 'none';
    const userBox = document.getElementById('user-profile');
    userBox.classList.remove('hidden');
    document.getElementById('user-name').innerText = name;
    document.getElementById('user-photo').src = photo;
    
    localStorage.setItem('google_logged_in', 'true');
    localStorage.setItem('user_name', name);
}

function cikisYap() {
    localStorage.removeItem('google_logged_in');
    localStorage.removeItem('user_name');
    location.reload();
}

// --- BENZERSİZ CİHAZ LİSANS GÜVENLİĞİ (Arkadaşa Paylaşımı Engeller) ---
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
    const onay = confirm("Ödeme onaylansın mı?\n\nUyarı: Lisans hakkı YALNIZCA bu cihaza (" + devId + ") özel olarak kilitlenecektir. Dosyayı başka bir telefona atsanız bile o telefonda ÇALIŞMAZ!");
    
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

// --- FULL AKILLI AI ASİSTAN MOTORU ---
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
        let reply = "TikTok Mobil Stüdyo ile canlı yayın ekranınıza fotoğraflar, videolar ve özel görevler ekleyebilirsiniz. Başka ne öğrenmek istersiniz?";
        const m = txt.toLowerCase();

        if (m.includes('nasıl') || m.includes('kullan') || m.includes('başla')) {
            reply = "Uygulamayı indirdikten sonra canlı yayın esnasında ekrana video, fotoğraf veya görev metni yerleştirebilir, şeffaflık ve kilitleme özelliklerini kullanabilirsiniz.";
        } else if (m.includes('fiyat') || m.includes('ücret') || m.includes('satın') || m.includes('para')) {
            reply = "Sitedeki 'Satın Al & APK İndir' butonuna basarak cihazınıza özel lisans kilidini aktif edebilir ve hemen indirebilirsiniz.";
        } else if (m.includes('güvenlik') || m.includes('arkadaş') || m.includes('lisans') || m.includes('başka')) {
            reply = "Güvenlik sistemimiz sayesinde satın aldığınız APK dosyası yalnızca sizin cihaz kimliğinize (Device ID) özel çalışır. Başka bir telefona atıldığında çalışmaz!";
        } else if (m.includes('özellik') || m.includes('ne var')) {
            reply = "Uygulama Özellikleri: 1. Cihaza özel lisans güvenliği, 2. Şeffaf video ve fotoğraf overlay desteği, 3. Görev ve hedef panelleri, 4. Kolay boyut ve şeffaflık ayarları!";
        } else if (m.includes('merhaba') || m.includes('selam') || m.includes('hey')) {
            reply = "Merhaba! TikTok Mobil Stüdyo AI Asistanıyım. Size nasıl yardımcı olabilirim?";
        } else if (m.includes('iletişim') || m.includes('mail') || m.includes('posta') || m.includes('ulaş')) {
            reply = "Bize doğrudan sayfanın altındaki sarı/kırmızı posta yazısına tıklayarak oraknizar@gmail.com üzerinden e-posta gönderebilirsiniz.";
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

    if(t) document.getElementById('hero-title').innerHTML = t;
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
    alert("Değişiklikler başarıyla kaydedildi!");
    adminPaneliKapat();
}

function modalAc(id) { document.getElementById(id).classList.remove('hidden'); }
function modalKapat(id) { document.getElementById(id).classList.add('hidden'); }

window.onload = function() {
    kilitleriGuncelle();
    
    // Eğer daha önce giriş yapıldıysa Google Modalını gizle
    if(localStorage.getItem('google_logged_in') === 'true') {
        document.getElementById('googleAuthModal').style.display = 'none';
        const savedName = localStorage.getItem('user_name') || 'Kullanıcı';
        const userBox = document.getElementById('user-profile');
        userBox.classList.remove('hidden');
        document.getElementById('user-name').innerText = savedName;
        document.getElementById('user-photo').src = "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_56dp.png";
    }
};
