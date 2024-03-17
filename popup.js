document.addEventListener('DOMContentLoaded', function() {
    const acceptBtn = document.getElementById('accept-btn');
    const closeBtn = document.getElementById('close-btn');
    
    acceptBtn.addEventListener('click', function() {
        // Speichern Sie die Zustimmung des Benutzers zur Verwendung der Hintergrundmusik, z.B. in localStorage
        localStorage.setItem('musicConsent', 'true');
        // Schließen Sie das Popup
        window.close();
    });

    
    closeBtn.addEventListener('click', function() {
        // Schließen Sie das Popup, wenn der Benutzer auf das X-Symbol klickt
        window.close();
    });
});
