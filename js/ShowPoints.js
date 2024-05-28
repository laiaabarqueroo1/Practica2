
document.addEventListener('DOMContentLoaded', function () {
    // Recuperar los datos de puntuaciones acumuladas del almacenamiento local
    var users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Mostrar los datos en la página
    for (var userName in users) {
       
        var userScore = users[userName].totalScore;
        var userLevel = users[userName].level;
        
        // Mostrar el puntaje del usuario en la sección "Your Current Score"
        var scoreElement = document.querySelector('.user-points .score');
        scoreElement.textContent = userScore + ' points';

        // Mostrar el nivel del usuario en la sección "Your Level"
        var levelElement = document.querySelector('.user-level .level');
        levelElement.textContent = userLevel;
    }
});