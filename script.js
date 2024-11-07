const word_el = document.getElementById('word'); // Tahmin edilmesi gereken kelimeyi gösterecek element
const popup = document.getElementById('popup-container'); // Kazanma veya kaybetme mesajı içeren popup
const message_el = document.getElementById('success-message'); // Başarı/kaybetme mesajını gösterecek element
const wrongLetters_el = document.getElementById('wrong-letters'); // Yanlış tahmin edilen harflerin listesi
const items = document.querySelectorAll('.item'); // Yanlış tahmin edilen harflerle açığa çıkan adam figürünün parçaları
const message = document.getElementById('message'); // Kullanıcıya yanlış tahminde uyarı mesajını gösterecek element
const PlayAgainBtn = document.getElementById('play-again'); // "Tekrar Oyna" düğmesi

// Doğru ve yanlış harfleri depolayan diziler
const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord(); // Tahmin edilmesi gereken kelimeyi seçiyoruz

// Rastgele bir kelime seçme fonksiyonu
function getRandomWord() {
    const words = ["javascript", "java", "python", "css", "html"];
    return words[Math.floor(Math.random() * words.length)];
}

// Kelimeyi ekranda gösterme fonksiyonu
function displayWord() {    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''} 
            </div>
        `).join('')}
    `;

    // Kelime tamamen doğru tahmin edildi mi kontrolü yapılıyor
    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex'; // Kazanma popup'ı açılıyor
        message_el.innerText = 'Tebrikler kazandınız.'; // Kazanma mesajı gösteriliyor
    }
}

// Yanlış harfleri ve adam figürünü güncelleme fonksiyonu
function updateWrongLetters() {
    // Yanlış tahmin edilen harfleri gösteriyoruz
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    // Yanlış tahmin sayısına göre adam figürünün parçalarını açıyoruz
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Yanlış tahmin sayısı, hak sayısına eşitse kaybetme popup'ı açılıyor
    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz.'; // Kaybetme mesajı gösteriliyor
    }
}

// Yanlış harf tekrar edildiğinde ekrana mesaj gösterme fonksiyonu
function displayMessage() {    
    message.classList.add('show'); // Mesajın görünür olması sağlanıyor

    // Mesaj 2 saniye sonra kayboluyor
    setTimeout(function() {
        message.classList.remove('show');
    }, 2000);
}

// "Tekrar Oyna" butonuna tıklandığında oyunu sıfırlama işlemi
PlayAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0); // Doğru tahmin edilen harfleri temizliyoruz
    wrongLetters.splice(0); // Yanlış tahmin edilen harfleri temizliyoruz
    
    selectedWord = getRandomWord(); // Yeni bir kelime seçiliyor
    displayWord(); // Yeni kelime gösteriliyor
    updateWrongLetters(); // Yanlış tahminler sıfırlanıyor

    popup.style.display = 'none'; // Kazanma/kaybetme popup'ı kapatılıyor
});

// Kullanıcı klavyeden harf tuşlarına bastığında gerçekleşen olaylar
window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) { // Sadece harflerin (A-Z) kodları kabul ediliyor
        const letter = e.key;

        // Harf doğru tahmin edildiyse
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter); // Doğru harf dizisine ekleniyor
                displayWord(); // Kelime güncellenerek gösteriliyor
            } else {
                displayMessage(); // Harf daha önce tahmin edildiyse mesaj gösteriliyor
            }
        } else { 
            // Harf yanlışsa ve daha önce yanlış tahmin edilmemişse
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter); // Yanlış harf dizisine ekleniyor
                updateWrongLetters(); // Yanlış harfler güncellenerek gösteriliyor
            } else {
                displayMessage(); // Harf zaten yanlış tahmin edildiyse mesaj gösteriliyor
            }
        }
    }
});

// Başlangıçta kelimeyi gösteriyoruz
displayWord();
