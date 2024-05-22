document.addEventListener('DOMContentLoaded', function() {
    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1, cookie.length);
            }
        }
        return "";
    }

    const userName = getCookie('username');
    const userEmail = getCookie('email');

    document.getElementById('profileUsername').textContent = userName ? userName : 'No disponible';
    document.getElementById('profileEmail').textContent = userEmail ? userEmail : 'No disponible';
});
