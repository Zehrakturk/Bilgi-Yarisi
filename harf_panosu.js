const words = [
    { word: "keman", sentence1: "Bulunduğu violin ailesinin en yüksek tondan çalan, en küçük üyesidir.", sentence2: "Orta Çağ'da İtalya'da Lira da Braci, Fransa'da Viel adlarıyla kullanılan yaylı çalgıları atası sayılır.", sentence3: "Bazı kaynaklarda ise Arapların rebabından geliştirildiği öne sürülmüştür." },
    { word: "atmosfer", sentence1: "Renksiz, kokusuz, tatsız, çok hızlı hareket edebilen, akışkan, elastik, sıkıştırılabilir, sonsuz genleşmeye sahip ısı geçirgenliği zayıf ve titreşimleri belli bir hızda ileten bir yapıya sahiptir.", sentence2: "Büyük ölçüde gezegenin iç katmanlarından kaynaklanan gazların yanardağ etkinliği ile yüzeye çıkması sonucu oluşmuştur.", sentence3: "Dünya'da , basınç ve yoğunluk açısından diğer yer benzeri gezegenlerden Mars'a göre yaklaşık 100 kat daha büyük, Venüs'e göre ise yaklaşık 100 kat daha küçük bir gaz kütlesini ifade eder." },
    { word: "cam tavan", sentence1: "Toplumda kadınların ve/veya azınlık grubu oluşturan kişilerin maruz kaldıkları ve mevcut hiyerarşik düzende belli bir seviyenin üstüne yükselmelerine engel olan soyut ayrımcılığı ifade eden bir metafordur.", sentence2: "Timothy D. Schellhard'ın kaleme aldığı bir makalede kullanıldıktan sonra yaygınlaşan bir ifadedir.", sentence3: "Kavramın akademik camiada benimsenmesi Morrison ile olmuştur." },
    { word: "kültür", sentence1: "Toplumların kendilerine özgü olan ve gelecek nesillere aktardıkları maddi veya manevi her şey.", sentence2: "Tarih içerisinde yaratılan bir anlam ve önem sistemidir.", sentence3: "Sosyolojik olarak, bizi saran, insanlardan öğrendiğimiz toplumsal mirastır." },
    { word: "korteks", sentence1: "İnsan ve diğer memeli beyinlerindeki serebrumun sinir dokusundan oluşan dış tabakasıdır.", sentence2: "Rengi gridir.", sentence3: "Ağırlık bakımından beyinin 3'te 2'sini teşkil etmekte ve beyinin neredeyse tüm yapılarının üzerini örtmektedir." },
    { word: "pentium", sentence1: "Intel’den beşinci nesil x86 mimarisi bir mikroişlemcisidir.", sentence2: "Microsoft ve diğer birçok şirket, gerekliliklerini tanımladıkları spesifikasyonlarda, standart olarak kullanmaktadır.", sentence3: "486 serisinin ardılıydı ve ilk olarak 22 Mart 1993 tarihinde duyurulmuştu." }
];

// Rastgele bir kelime seçer.
randomIndex = Math.floor(Math.random() * words.length);
selectedWord = words[randomIndex];

// Seçilen kelimenin ip ucunu ekrana yansıtır.
document.getElementById('hint').textContent = selectedWord.sentence1;

let time = 60;
let score = 0;

// Süreyi günceller.
function updateTime() {
    time--; // Her saniyede bir azaltır.
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}
// Süreyi her saniyede bir günceller.
setInterval(updateTime, 1000);

// Puanı güncelleyer.
function updateScore() {
    score += 10; // Her doğru tahminde puanı 10 artırır.
    document.getElementById('score').textContent = score;
}

//Bir sonraki kelimeye geçmeyi sağlar.
function resetGame() {
    
    randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];

    document.getElementById('hint').textContent = selectedWord.sentence1; // İpucunu günceller.
    document.getElementById('extra-info-text').textContent = ''; // Ek bilgi alanını temizler.

    document.getElementById('answer-input').value = ''; // Cevap giriş kutusunu temizler.

    time = 60;
}

// Kullanıcının girdiği cevabı kontrol eder.
function answerCheck() {
    var userAnswer = document.getElementById("answer-input").value.toLowerCase();
    var correctAnswer = "doğrucevap"; 

    if (userAnswer === correctAnswer) {
        return true; // Doğru cevap döndürür.
    } else {
        return false; // Yanlış cevap döndürür.
    }
}

//Kullanıcı doğru cevap verince panel aktifleşir. Aksi halde gizli kalır.
function showCongratulationsMessage() {
    var congratulationsPanel = document.getElementById("congratulations-panel");
    congratulationsPanel.style.display = "block";

    // 3 saniye sonra paneli gizler.
    setTimeout(function() {
        congratulationsPanel.style.display = "none";
    }, 3000); 
}

//Kullanıcı paneli kendisi kapatabilir.
document.getElementById("close-btn").addEventListener("click", function() {
    var congratulationsPanel = document.getElementById("congratulations-panel");
    congratulationsPanel.style.display = "none";
});

document.getElementById('answer-btn').addEventListener('click', function() {
    const userAnswer = document.getElementById('answer-input').value.toLowerCase();
    if (userAnswer === selectedWord.word) {
        updateScore();
        resetGame(); // Yeni kelime seçmek için fonksiyonu çağırır.
        showCongratulationsMessage(); // Tebrik mesajını gösterir.
    } else {
        score -= 10; // Yanlış cevap puanı 10 azaltır.
        document.getElementById('score').textContent = score; // Puanı günceller.
    }
});



// Kırmızı topun başlangıç pozisyonunu alır.
const ballRed = document.getElementById('ballRed');
const containerWidthRed = document.querySelector('.container').offsetWidth;
const containerHeightRed = document.querySelector('.container').offsetHeight;

// Kırmızı topun rastgele hareket etmesini sağlar.
function moveRedBall() {
    // Topun yeni rastgele pozisyonunu hesaplar.
    const randomLeft = Math.floor(Math.random() * (containerWidthRed - 50)); 
    const randomTop = Math.floor(Math.random() * (containerHeightRed - 50));

    ballRed.style.left = `${randomLeft}px`;
    ballRed.style.top = `${randomTop}px`;

    // Bir süre beklemek için setTimeout kullandık.
    setTimeout(() => {
        // Bekleme süresinden sonra tekrar hareket ettirir.
        moveRedBall();
    }, 2000);
}

// Kırmızı topu hareket ettirir.
moveRedBall();


// Yeşil topun başlangıç pozisyonunu alır.
const ballGreen = document.getElementById('ballGreen');
const containerWidthGreen = document.querySelector('.container').offsetWidth;
const containerHeightGreen = document.querySelector('.container').offsetHeight;

// Yeşil topun hareket hızı 10
const movementSpeed = 10;

// Kullanıcı yön tuşlarına basarak yeşil topu hareket ettirir.
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Kullanıcının yön tuşlarına basmasına göre topun pozisyonunu güncelle
    switch (key) {
        case 'ArrowUp':
            moveGreenBall(0, -movementSpeed); // Yukarı yönde 
            break;
        case 'ArrowDown':
            moveGreenBall(0, movementSpeed); // Aşağı yönde
            break;
        case 'ArrowLeft':
            moveGreenBall(-movementSpeed, 0); // Sol yönde 
            break;
        case 'ArrowRight':
            moveGreenBall(movementSpeed, 0); // Sağ yönde 
            break;
    }
});

// Yeşil topun pozisyonunu güncelleyer.
function moveGreenBall(deltaX, deltaY) {
    const currentLeft = parseInt(ballGreen.style.left) || 0;
    const currentTop = parseInt(ballGreen.style.top) || 0;

    const newLeft = currentLeft + deltaX;
    const newTop = currentTop + deltaY;

    const minX = 0;
    const maxX = containerWidthGreen - 50; // Topun genişliği = 50px 
    const minY = 0;
    const maxY = containerHeightGreen - 50; // Topun yüksekliği = 50px 

    const boundedLeft = Math.min(Math.max(minX, newLeft), maxX);
    const boundedTop = Math.min(Math.max(minY, newTop), maxY);

    ballGreen.style.left = `${boundedLeft}px`;
    ballGreen.style.top = `${boundedTop}px`;

    checkCollision();

}

// Yeşil topun kırmızı topa değip değmediğini kontrol eder.
function checkCollision() {

    const greenRect = ballGreen.getBoundingClientRect();
    const redRect = ballRed.getBoundingClientRect();
    const greenTop = greenRect.top;
    const greenBottom = greenRect.bottom;
    const greenLeft = greenRect.left;
    const greenRight = greenRect.right;

    const redTop = redRect.top;
    const redBottom = redRect.bottom;
    const redLeft = redRect.left;
    const redRight = redRect.right;

    
    if (greenBottom >= redTop && greenTop <= redBottom && greenRight >= redLeft && greenLeft <= redRight) {
        // Eğer çarpışma gerçekleşirse ve hakkınız 0 dan çoksa
        if (parseInt(document.getElementById('chances').textContent) > 0) {
            // Hak sayısını azaltma
            // Ek bilgi butonunu otomatik olarak tetikler.
            document.getElementById('chances').textContent --;
             // Hak 0 olduğunda uyarı gösterme
            if (parseInt(chances.textContent) == 0) {
                document.getElementById('warning-label').style.display = 'block';
            }
            document.getElementById('info-btn').click();
        } else {
            // Haklar 0'a düşerse
            // Hak sayısını sıfırla
            document.getElementById('chances').textContent = 0;

            // Ek bilgi butonunu otomatik olarak tetikle
            document.getElementById('info-btn').click();
        }
    }
}









// Ek bilgi butonuna tıklandığında ikinci ipucunu gösteren fonksiyon
document.getElementById('info-btn').addEventListener('click', function() {
    // İkinci ipucunu göster
    if (!this.dataset.clicked) {
        document.getElementById('hint').textContent = selectedWord.sentence2;
        this.dataset.clicked = true; 
    } else {
        document.getElementById('hint').textContent = selectedWord.sentence3;
    }


    
});

document.getElementById('ok-btn').addEventListener('click', function() {
    document.getElementById('warning-label').style.display = 'none';
});

// Ek bilgi butonuna tıklandığında topları gösteren ve gizleyen fonksiyon
document.getElementById('info-btn').addEventListener('click', function() {
    // Topları görünür hale getir
    ballRed.style.display = 'block';
    ballGreen.style.display = 'block';

    // Topları ortaya yerleştir
    const containerWidth = document.querySelector('.container').offsetWidth;
    const containerHeight = document.querySelector('.container').offsetHeight;
    const ballWidth = 50; // Top genişliği = 50px

    ballRed.style.left = `${(containerWidth - ballWidth) / 2}px`;
    ballRed.style.top = `${(containerHeight - ballWidth) / 2}px`;

    ballGreen.style.left = `${(containerWidth - ballWidth) / 2}px`;
    ballGreen.style.top = `${(containerHeight - ballWidth) / 2}px`;

    // Topları gizle
    function hideBalls() {
        ballRed.style.display = 'none';
        ballGreen.style.display = 'none';
    }

    // Ek bilgi butonuna basılmadığında topları gizle
    document.querySelectorAll('button').forEach(button => {
        if (button.id !== 'info-btn') {
            button.addEventListener('click', hideBalls);
        }
    });

    // Ek bilgi butonuna basılmadığında top hareketini durdur
    document.removeEventListener('keydown', moveGreenBall);
});

// Topları başlangıçta gizle
document.querySelectorAll('.ball').forEach(ball => {
    ball.style.display = 'none';
});

