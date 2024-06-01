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
document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementsByClassName("close")[0];
  const addButtons = document.querySelectorAll('.add-button');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPoints = document.getElementById('modal-points');
  const redeemButton = document.getElementById('redeem-button');
  const cancelButton = document.getElementById('cancel-button');

  let selectedCardData = {};

  // Open the modal
  addButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const card = event.currentTarget.closest('.bg-white');
          selectedCardData = {
              title: card.getAttribute('data-title'),
              description: card.getAttribute('data-description'),
              points: card.getAttribute('data-points')
          };
          modalTitle.innerText = selectedCardData.title;
          modalDescription.innerText = selectedCardData.description;
          modalPoints.innerText = `Points: ${selectedCardData.points}`;
          modal.style.display = "block";
      });
  });

  // Close the modal
  closeBtn.onclick = function() {
      modal.style.display = "none";
  }

  cancelButton.onclick = function() {
      modal.style.display = "none";
  }

  redeemButton.onclick = function() {
      // Handle redeem logic here
      alert(`Canjeando ${selectedCardData.title} por ${selectedCardData.points} puntos.`);
      modal.style.display = "none";
  }

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});


