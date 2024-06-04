function toggleMenu() {
    var sidebarMenu = document.querySelector("#menu-container .sidebar-menu");
    sidebarMenu.classList.toggle("active");
    if (sidebarMenu.classList.contains("active")) {
        sidebarMenu.style.display = "flex";
    } else {
        sidebarMenu.style.display = "none";
    }
    document.addEventListener("click", function(event) {
        var isClickInsideMenu = sidebarMenu.contains(event.target);
        var isClickOnHamburger = event.target.closest(".hamburger-menu");

        if (!isClickInsideMenu && !isClickOnHamburger) {
            sidebarMenu.classList.remove("active");
            sidebarMenu.style.display = "none"; 
        }
    });
}
function addMenuEventListeners() {
    var hamburgerMenu = document.querySelector(".hamburger-menu");
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", toggleMenu);
    }
}