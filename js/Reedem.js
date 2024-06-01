document.addEventListener("DOMContentLoaded", function() {
var menuContainer = document.getElementById("menu-container");
fetch("menu.html")
.then(response => response.text())
.then(data => {
    menuContainer.innerHTML = data;
    loadMenu.addMenuEventListeners(); 
})
.catch(error => console.error("Error loading menu:", error));

}); 


var users = JSON.parse(localStorage.getItem('users')) || {};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("TimeMaster");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
for (var userName in users) {
var userScore = users[userName].totalScore;
var scoreElement = document.querySelector('.user-points');
scoreElement.textContent = userScore + ' points';
}
// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Evitar que el clic en el modal lo cierre
modal.onclick = function(event) {
  event.stopPropagation();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
