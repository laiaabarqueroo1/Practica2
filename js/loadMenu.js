// loadMenu.js
document.addEventListener("DOMContentLoaded", function() {
    var menuContainer = document.getElementById("menu-container");
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
            addMenuEventListeners(); // Añade los listeners una vez cargado el menú
        })
        .catch(error => console.error("Error loading menu:", error));
});

function toggleMenu() {
    var sidebarMenu = document.getElementById("sidebar-menu");
    sidebarMenu.classList.toggle("active");
}

function addMenuEventListeners() {
    var pointsLink = document.querySelector('#sidebar-menu ul li:nth-child(3) a');
    var changepoints = document.querySelector('#sidebar-menu ul li:nth-child(4) a');
    var userinfo = document.querySelector('#sidebar-menu ul li:nth-child(2) a');
    var home = document.querySelector('#sidebar-menu ul li:nth-child(1) a');
    
    pointsLink.addEventListener('click', function() {
        window.open('./showpoints.html');
    });
    changepoints.addEventListener('click', function() {
        window.open('./reedem.html');
    });
    userinfo.addEventListener('click', function() {
        window.open('./user.html');
    });
    home.addEventListener('click', function() {
        window.open('./index.html');
    });
}
