document.addEventListener('DOMContentLoaded', function() {
    const wordContainer = document.getElementById('word-container');
    const currentWordDisplay = document.getElementById('current-word');
    const remainingAttemptsDisplay = document.getElementById('remaining-attempts');
    const guessedWordsDisplay = document.getElementById('guessed-words');
    const guessLetterInput = document.getElementById('guess-letter');
    const guessLetterBtn = document.getElementById('guess-letter-btn');
    const message = document.getElementById('message');
    const hint = document.getElementById('hint');
    const newWordBtn = document.getElementById('new-word-btn');
    const timerValue = document.getElementById('timer-value');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const attemptsInput = document.getElementById('attempts-input');
    const hintsPerAttemptInput = document.getElementById('hints-per-attempt-input');
    const timerEnabledInput = document.getElementById('timer-enabled-input');
    const timerIncreaseInput = document.getElementById('timer-increase-input');
    
    let randomWord = '';
    let guessedLetters = [];
    let remainingAttempts = 12;
    let timerSeconds = 15;
    let timerInterval;

    async function getWord() {
        const languageSelect = document.getElementById('language-select');
        const selectedLanguage = languageSelect.value;
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&lang=en`);
        const data = await response.json();
        randomWord = data[0];
        displayWord();
    }

    function displayWord() {
        wordContainer.textContent = '';
        randomWord.split('').forEach(letter => {
            const span = document.createElement('span');
            span.textContent = '_';
            wordContainer.appendChild(span);
        });
        currentWordDisplay.textContent = 'Current Word: ' + wordContainer.textContent;
        remainingAttemptsDisplay.textContent = 'Remaining Attempts: ' + remainingAttempts;
    }

    function checkLetterGuess() {
        const guess = guessLetterInput.value.trim().toLowerCase();
        if (guessedLetters.includes(guess)) {
            message.textContent = 'You already guessed this letter!';
            guessLetterInput.value = '';
            return;
        }
        guessedLetters.push(guess);
        guessedWordsDisplay.textContent = 'Guessed Letters: ' + guessedLetters.join(', ');
        if (randomWord.includes(guess)) {
            updateWordDisplay(guess);
            if (!wordContainer.textContent.includes('_')) {
                message.textContent = 'Congratulations! You guessed the word!';
                disableInputs();
            }
        } else {
            remainingAttempts--;
            if (remainingAttempts === 0) {
                message.textContent = 'Sorry, you have used all your attempts. The word was: ' + randomWord;
                disableInputs();
            } else {
                message.textContent = 'Incorrect guess. Remaining attempts: ' + remainingAttempts;
                if (remainingAttempts % 4 === 0) {
                    provideHint();
                }
            }
        }
        guessLetterInput.value = '';
        resetTimer();
    }

    function updateWordDisplay(letter) {
        const wordLetters = randomWord.split('');
        const wordSpans = wordContainer.children;
        for (let i = 0; i < wordLetters.length; i++) {
            if (wordLetters[i] === letter) {
                wordSpans[i].textContent = letter.toUpperCase();
                // Füge eine CSS-Klasse hinzu, um die Animation zu aktivieren
                wordSpans[i].classList.add('animate-guessed-letter');
                // Entferne die CSS-Klasse nach der Animation
                wordSpans[i].addEventListener('animationend', () => {
                    wordSpans[i].classList.remove('animate-guessed-letter');
                }, { once: true });
            }
        }
        currentWordDisplay.textContent = 'Current Word: ' + wordContainer.textContent;
    }

    function provideHint() {
        const hiddenIndices = [];
        const wordLetters = randomWord.split('');
        for (let i = 0; i < wordLetters.length; i++) {
            if (wordContainer.children[i].textContent === '_') {
                hiddenIndices.push(i);
            }
        }
        const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
        const hintChar = randomWord[randomIndex];
        hint.textContent = 'Hint: Letter at position ' + (randomIndex + 1) + ' is "' + hintChar.toUpperCase() + '"';
    }

    function disableInputs() {
        guessLetterInput.disabled = true;
        guessLetterBtn.disabled = true;
    }

    function enableInputs() {
        guessLetterInput.disabled = false;
        guessLetterBtn.disabled = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerSeconds = 15;
        timerValue.textContent = timerSeconds;
        startTimer();
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timerSeconds--;
            timerValue.textContent = timerSeconds;
            if (timerSeconds === 0) {
                clearInterval(timerInterval);
                // Hier kannst du die Logik hinzufügen, wenn die Zeit abläuft
                // Zum Beispiel:
                remainingAttempts--;
                message.textContent = 'Time is up! Remaining attempts: ' + remainingAttempts;
                if (remainingAttempts === 0) {
                    message.textContent = 'Sorry, you have used all your attempts. The word was: ' + randomWord;
                    disableInputs();
                }
                resetTimer();
            }
        }, 1000);
    }

    guessLetterBtn.addEventListener('click', function() {
        checkLetterGuess();
    });

    newWordBtn.addEventListener('click', function() {
        message.textContent = '';
        hint.textContent = '';
        guessedLetters = [];
        guessedWordsDisplay.textContent = '';
        remainingAttempts = parseInt(attemptsInput.value);
        enableInputs();
        clearInterval(timerInterval);
        resetTimer();
        getWord();
    });

    settingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'block';
    });

    closeSettingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', function() {
        localStorage.setItem('attempts', attemptsInput.value);
        localStorage.setItem('hintsPerAttempt', hintsPerAttemptInput.value);
        localStorage.setItem('timerEnabled', timerEnabledInput.checked);
        localStorage.setItem('timerIncrease', timerIncreaseInput.value);
        settingsModal.style.display = 'none';
    });

    attemptsInput.value = localStorage.getItem('attempts') || 12;
    hintsPerAttemptInput.value = localStorage.getItem('hintsPerAttempt') || 2;
    timerEnabledInput.checked = localStorage.getItem('timerEnabled') === 'true' || false;
    timerIncreaseInput.value = localStorage.getItem('timerIncrease') || 2;

    getWord();
});

document.addEventListener('DOMContentLoaded', function() {
    const infiniteAttemptsInput = document.getElementById('infinite-attempts');
    const hintLossSelect = document.getElementById('hint-loss');
    const timerSettingsSelect = document.getElementById('timer-settings');
    const customAttemptsInput = document.getElementById('custom-attempts');
    const saveCheatsBtn = document.getElementById('save-cheats-btn');

    // Laden der gespeicherten Cheats beim Öffnen der Seite
    loadCheats();

    // Event Listener für den Speichern-Button
    saveCheatsBtn.addEventListener('click', function() {
        saveCheats();
    });

    // Funktion zum Laden der gespeicherten Cheats
    function loadCheats() {
        const savedInfiniteAttempts = localStorage.getItem('infiniteAttempts');
        const savedHintLoss = localStorage.getItem('hintLoss');
        const savedTimerSettings = localStorage.getItem('timerSettings');
        const savedCustomAttempts = localStorage.getItem('customAttempts');

        // Überprüfen, ob Cheats gespeichert wurden, und sie aktivieren
        if (savedInfiniteAttempts === 'true') {
            infiniteAttemptsInput.checked = true;
        }

        if (savedHintLoss) {
            hintLossSelect.value = savedHintLoss;
        }

        if (savedTimerSettings) {
            timerSettingsSelect.value = savedTimerSettings;
        }

        if (savedCustomAttempts) {
            customAttemptsInput.value = savedCustomAttempts;
        }
    }

    // Funktion zum Speichern der ausgewählten Cheats
    function saveCheats() {
        localStorage.setItem('infiniteAttempts', infiniteAttemptsInput.checked);
        localStorage.setItem('hintLoss', hintLossSelect.value);
        localStorage.setItem('timerSettings', timerSettingsSelect.value);
        localStorage.setItem('customAttempts', customAttemptsInput.value);
        alert('Cheats saved successfully!');
    }
});
