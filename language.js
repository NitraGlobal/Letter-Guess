// language.js

// Übersetzungen für Englisch
var translationsEN = {
    "guess-word-heading": "Guess the Word",
    "guess-word-description": "Guess letters to reveal the word. Each correct guess reveals letters in their correct positions. Incorrect guesses result in lost attempts.",
    "attempts-hints-heading": "Attempts & Hints",
    "attempts-hints-description": "You have 12 attempts to guess the word. Receive a hint every 4 attempts.",
    "winning-losing-heading": "Winning & Losing",
    "winning-losing-description": "Win by correctly guessing the word within attempts. Lose if attempts are exhausted without guessing the word.",
    "share-score-heading": "Share Your Score",
    "share-score-description": "Share your high score on Twitter. Challenge friends to beat your score."
};

// Übersetzungen für Deutsch
var translationsDE = {
    "guess-word-heading": "Wort erraten",
    "guess-word-description": "Raten Sie Buchstaben, um das Wort aufzudecken. Jede richtige Vermutung enthüllt Buchstaben an ihren richtigen Positionen. Falsche Vermutungen führen zu verlorenen Versuchen.",
    "attempts-hints-heading": "Versuche & Hinweise",
    "attempts-hints-description": "Sie haben 12 Versuche, das Wort zu erraten. Erhalten Sie alle 4 Versuche einen Hinweis.",
    "winning-losing-heading": "Gewinnen & Verlieren",
    "winning-losing-description": "Gewinnen Sie, indem Sie das Wort innerhalb der Versuche richtig erraten. Verlieren Sie, wenn die Versuche erschöpft sind, ohne das Wort zu erraten.",
    "share-score-heading": "Teilen Sie Ihren Punktestand",
    "share-score-description": "Teilen Sie Ihren Highscore auf Twitter. Fordern Sie Freunde heraus, Ihren Punktestand zu schlagen."

};
var translationsEN = {
    "music-consent-heading": "Letter Guess - Music Consent",
    "music-consent-description": "This website uses background music for enhanced user experience. By clicking 'Accept', you consent to the use of background music."
};

// Objekt mit den Übersetzungen für Deutsch
var translationsDE = {
    "music-consent-heading": "Letter Guess - Musik Zustimmung",
    "music-consent-description": "Diese Website verwendet Hintergrundmusik für eine verbesserte Benutzererfahrung. Durch Klicken auf 'Akzeptieren' stimmen Sie der Verwendung von Hintergrundmusik zu."
};

// Objekt mit den Übersetzungen
var translations = {
    en: translationsEN,
    de: translationsDE
};

// Funktion zum Setzen der Sprache
function setLanguage(lang) {
    var elements = document.querySelectorAll('[data-lang]');
    elements.forEach(function(element) {
        var key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Funktion zum Auswählen der Sprache beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Standardmäßig Englisch
    setLanguage(selectedLanguage);

    // Dropdown-Menü für Sprachumschaltung
    var languageSelect = document.getElementById('language-select');
    languageSelect.value = selectedLanguage;
    languageSelect.addEventListener('change', function(event) {
        var selectedLang = event.target.value;
        setLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang);
    });
});


// Funktion zur Sprachumschaltung
function setLanguage(lang) {
    var elements = document.querySelectorAll('[data-lang]');
    var translations = lang === 'en' ? translationsEN : translationsDE;
    for (var i = 0; i < elements.length; i++) {
        var key = elements[i].getAttribute('data-lang');
        elements[i].textContent = translations[key];
    }
}

// Initialisierung der Sprache basierend auf der aktuellen Auswahl im Dropdown-Menü
document.addEventListener('DOMContentLoaded', function() {
    var languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        var selectedLanguage = this.value;
        setLanguage(selectedLanguage);
    });

    // Standardmäßig wird die Seite in Englisch geladen
    setLanguage(languageSelect.value);
});
