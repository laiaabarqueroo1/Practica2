class UIManager {
    showInitialPage() {
        $('#initial-page').show();
        $('#principal').hide();
    }
    updateLevelDisplay(level) {
        document.getElementById("level").textContent = level + 1;
    }
    updateTimerDisplay(timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds};
        document.getElementById("timer").textContent = formattedTime;
    }
    showScreen(screen) {
        gameStatus = 0;
        $('#canvas').hide();
        $(screen).show();
    }
    resetGame() {
        $('#canvas').show();
        $('.end-page').hide();
    }
    updateUserDisplay(username, score, level) {
        document.getElementById("points-count").textContent = Player: ${username};
        document.getElementById("level").textContent = level;
        document.getElementById("level-points").textContent = score;
    }
    updateLivesDisplay(lives) {
        $('#lives').empty();
        for (let i = 0; i < lives; i++) {
            $('#lives').append('<img src="resources/images/heart.png">');
        }
    }
    updateTopScoresDisplay(scores) {
        scores.forEach((score, index) => {
            document.getElementById(s${index + 1}).textContent = score.score;
            document.getElementById(n${index + 1}).textContent = score.name;
        });
    }
    closeRegisterPopup() {
        $('#popupRegister').fadeOut();
    }
    closeLoginPopup() {
        $('#popupLogin').fadeOut();
    }
}