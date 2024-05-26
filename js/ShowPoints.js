
    var userName = getCookie('loggedInUser');
    var users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Determinar el nivel basado en la cantidad de puntos acumulados
        if (currentUser.totalScore >= 4000) {
            currentUser.level = "Oro";
        } else if (currentUser.totalScore >= 850) {
            currentUser.level = "Plata";
        } else {
            currentUser.level = "Bronce";
        }

        // Actualizar los elementos HTML con el puntaje y el nivel
        updateScoreAndLevel(currentUser.totalScore, currentUser.level);

        // Mostrar el puntaje del usuario en la sección "Your Current Score"
        var scoreElement = document.querySelector('.user-points .score');
        scoreElement.textContent = currentUser.totalScore + ' points';

        // Mostrar el nivel del usuario en la sección "Your Level"
        var levelElement = document.querySelector('.user-level .level');
        levelElement.textContent = currentUser.level;

        // Almacenar los valores actualizados en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Guardar el usuario actual en localStorage para que showpoints.js lo pueda utilizar
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

