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
  const userPointsElement = document.getElementById('user-points');


   let userPoints = 0;
   const users = JSON.parse(localStorage.getItem('users')) || {};
   for (const userName in users) {
       if (users.hasOwnProperty(userName)) {
           userPoints = users[userName].totalScore;
           break; // Suponemos que solo hay un usuario
       }
   }
   userPointsElement.textContent = `Points: ${userPoints}`;

   let selectedCardData = {};

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
           modal.style.display = 'block';
       });
   });

   closeBtn.onclick = function () {
       modal.style.display = 'none';
   };

   cancelButton.onclick = function () {
       modal.style.display = 'none';
   };

   redeemButton.onclick = function () {
       const pointsToRedeem = parseInt(selectedCardData.points);
       if (userPoints >= pointsToRedeem) {
           userPoints -= pointsToRedeem;
           userPointsElement.textContent = `Points: ${userPoints}`;
           alert(`Has redimido ${selectedCardData.title} por ${pointsToRedeem} puntos.`);

           // Guardar los puntos actualizados en el local storage
           for (const userName in users) {
               if (users.hasOwnProperty(userName)) {
                   users[userName].totalScore = userPoints;
                   break; // Suponemos que solo hay un usuario
               }
           }
           localStorage.setItem('users', JSON.stringify(users));
       } else {
           alert('No tienes suficientes puntos para redimir este artículo.');
       }
       modal.style.display = 'none';
   };

   window.onclick = function (event) {
       if (event.target == modal) {
           modal.style.display = 'none';
       }
   };
});
