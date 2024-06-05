class User {
    constructor() {
        this.lives = 3;
        document.addEventListener('DOMContentLoaded', this.populateUserProfile.bind(this));
    }

    exists(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.username === username);
    }

    register(username, password) {
        this.setCookie(username, password, 30);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, score: 0, level: 'BRONZE', redeemedProducts: {} });
        localStorage.setItem('users', JSON.stringify(users));
    }

    login(username, password) {
        const storedPassword = this.getCookie(username);
        return storedPassword === password;
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let cookie of cookieArray) {
            cookie = cookie.trim();
            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1);
            }
        }
        return "";
    }

    populateUserProfile() {
        const userName = this.getCookie('username');
        const userEmail = this.getCookie('email');

        document.getElementById('profileUsername').textContent = userName ? userName : 'No disponible';
        document.getElementById('profileEmail').textContent = userEmail ? userEmail : 'No disponible';
    }

    resetLives() {
        this.lives = 3;
    }

    getScore(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username);
        return user ? user.score : 0;
    }

    getLevel(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username);
        return user ? user.level : 'BRONZE';
    }

    getTopScores() {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        return scores.slice(0, 5).map(score => ({
            name: score.name || 'xxx',
            score: score.score || 'xxx'
        }));
    }
}