// --- FIREBASE BAĞLANTISI (Google Bulut Veritabanı) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1OnSmjE9YtvhVMbfhNR-Ojt73TKOa3Og",
  authDomain: "rose-studio-a961a.firebaseapp.com",
  projectId: "rose-studio-a961a",
  storageBucket: "rose-studio-a961a.firebasestorage.app",
  messagingSenderId: "451378777867",
  appId: "1:451378777867:web:24b24010f6e3cd283d9c0e",
  measurementId: "G-K1HPBFE2FX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- ZORUNLU GOOGLE GİRİŞ & SAYFA KİLİDİ ---
window.gercekGoogleGirisYap = function(e) {
    if(e) e.preventDefault();
    
    const isim = prompt("Google (Gmail) Hesabınızın Adı:", "Kullanıcı");
    if (isim && isim.trim() !== "") {
        oturumAcildiGoster(isim, "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_56dp.png");
    } else {
        alert("Devam etmek için Google hesabınızı girmeniz zorunludur!");
    }
};

function oturumAcildiGoster(name, photo) {
    const authModal = document.getElementById('googleAuthModal');
    if(authModal) authModal.style.display = 'none';
    
    const userBox = document.getElementById('user-profile');
    if(userBox) {
        userBox.classList.remove('hidden');
        document.getElementById('user-name').innerText = name;
        document.getElementById('user-photo').src = photo;
    }
    
    localStorage.setItem('google_logged_in', 'true');
    localStorage.setItem('user_name', name);
}

window.cikisYap = function() {
    localStorage.removeItem('google_logged_in');
    localStorage.removeItem('user_name');
    location.reload();
};

// --- BENZERSİZ CİHAZ LİSANS GÜVENLİĞİ ---
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

window.gercekOdemeBaslat = async function() {
    const devId = benzersizCihazIdUret();
    const onay = confirm("Ödeme onaylansın mı?\n\nUyarı: Lisans hakkı YALNIZCA bu cihaza (" + devId + ") özel olarak kilitlenecektir. Dosyayı başka bir telefona atsanız bile o telefonda ÇALIŞMAZ!");
    
    if(onay) {
        try {
            // Ödeme onaylandığı an Firebase Firestore veritabanına bu cihazı "active" olarak kaydediyoruz!
            await setDoc(doc(db, "licenses", devId), {
                status: "active",
                tarih: new Date().toISOString(),
                cihazId: devId
            });

            // Yerel hafızaya da işleyelim
            localStorage.setItem('license_granted_' + devId, 'ACTIVE');
            
            // Kilitleri hemen güncelle
            await kilitleriGuncelle();
            
            alert("Ödeme başarılı! Cihazınıza özel bulut lisansınız oluşturuldu ve APK indirme kilidi açıldı.");
        } catch (error) {
            console.error("Lisans veritabanına yazılamadı:", error);
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
    }
};

// --- GOOGLE FIREBASE LİSANS KONTROL ENTEGRASYONU ---
async function kilitleriGuncelle() {
    const devId = benzersizCihazIdUret();
    const idDisplay = document.getElementById('display-device-id');
    if(idDisplay) idDisplay.innerText = devId;

    let isAuthorized = localStorage.getItem('license_granted_' + devId) === 'ACTIVE';

    // Firebase Firestore'dan uzaktan lisans sorgulama
    try {
        const docRef = doc(db, "licenses", devId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.status === 'active') {
                isAuthorized = true;
                localStorage.setItem('license_granted_' + devId, 'ACTIVE');
            } else if (data.status === 'expired' || data.status === 'inactive') {
                isAuthorized = false;
                localStorage.removeItem('license_granted_' + devId);
            }
        }
    } catch (error) {
        console.log("Firebase veritabanına ulaşılamadı, yerel önbellek lisansı kullanılıyor.", error);
    }

    const apkBtn = document.getElementById('download-apk-btn');
    const buyBtn = document.getElementById('buy-btn');

    if(isAuthorized) {
        if(apkBtn) {
            apkBtn.classList.remove('disabled');
            apkBtn.removeAttribute('disabled');
        }
        if(buyBtn) buyBtn.classList.add('hidden');
    } else {
        if(apkBtn) {
            apkBtn.classList.add('disabled');
            apkBtn.setAttribute('disabled', 'true');
        }
    }
}

window.guvenliApkIndir = function() {
    const devId = benzersizCihazIdUret();
    const devLicense = localStorage.getItem('license_granted_' + devId);

    if(devLicense === 'ACTIVE') {
        window.location.href = "https://www.mediafire.com/file/o7pcnoteaatlk3s/Tiktok_Mobil_St%25C3%25BCdyo.apk/file";
    } else {
        alert("Bu cihaz için geçerli bir lisans bulunamadı! İndirmek için önce satın almanız gerekmektedir.");
    }
};

// --- FULL AKILLI AI ASİSTAN MOTORU ---
window.aiPenceresiAcKapat = function() {
    const aiModal = document.getElementById('aiChatModal');
    if(aiModal) aiModal.classList.toggle('hidden');
};

window.aiTusaBasildi = function(e) {
    if (e.key === 'Enter') aiMesajGonder();
};

window.aiMesajGonder = function() {
    const input = document.getElementById('aiInput');
    if(!input) return;
    const txt = input.value.trim();
    if (!txt) return;

    const box = document.getElementById('ai-messages');
    if(box) {
        box.innerHTML += `<div class="user-msg">${txt}</div>`;
        input.value = '';
        box.scrollTop = box.scrollHeight;
    }

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

        if(box) {
            box.innerHTML += `<div class="bot-msg">${reply}</div>`;
            box.scrollTop = box.scrollHeight;
        }
    }, 400);
};

// --- ADMIN PANEL (ŞİFRE: 19071907) ---
const ADMIN_PASS = "19071907";
window.adminPaneliAc = function() { 
    const adminModal = document.getElementById('admin-modal');
    if(adminModal) adminModal.classList.remove('hidden'); 
};

window.adminPaneliKapat = function() { 
    const adminModal = document.getElementById('admin-modal');
    if(adminModal) adminModal.classList.add('hidden'); 
};

window.adminGirisKontrol = function() {
    const passInput = document.getElementById('admin-pass-input');
    if(passInput && passInput.value === ADMIN_PASS) {
        document.getElementById('admin-login-form').classList.add('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
    } else {
        alert("Hatalı Şifre!");
    }
};

window.adminDegisiklikleriKaydet = function() {
    const t = document.getElementById('edit-hero-title').value;
    const d = document.getElementById('edit-hero-desc').value;

    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');

    if(t && heroTitle) heroTitle.innerHTML = t;
    if(d && heroDesc) heroDesc.innerText = d;
    
    alert("Değişiklikler başarıyla kaydedildi!");
    adminPaneliKapat();
};

window.modalAc = function(id) { 
    const el = document.getElementById(id);
    if(el) el.classList.remove('hidden'); 
};

window.modalKapat = function(id) { 
    const el = document.getElementById(id);
    if(el) el.classList.add('hidden'); 
};

// Sayfa yüklendiğinde çalışacak ana tetikleyici
window.addEventListener('DOMContentLoaded', async () => {
    await kilitleriGuncelle();
    
    if(localStorage.getItem('google_logged_in') === 'true') {
        const googleModal = document.getElementById('googleAuthModal');
        if(googleModal) googleModal.style.display = 'none';
        
        const savedName = localStorage.getItem('user_name') || 'Kullanıcı';
        const userBox = document.getElementById('user-profile');
        if(userBox) {
            userBox.classList.remove('hidden');
            const userNameEl = document.getElementById('user-name');
            const userPhotoEl = document.getElementById('user-photo');
            if(userNameEl) userNameEl.innerText = savedName;
            if(userPhotoEl) userPhotoEl.src = "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_56dp.png";
        }
    }
});
