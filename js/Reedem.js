    document.addEventListener('DOMContentLoaded', (event) => {
        const userPoints = new UserPoints();
        const cardModal = new CardModal();
        const redeemButton = document.getElementById('redeem-button');
        const cancelButton = document.getElementById('cancel-button');
        const selectedCardData = {}; // Puedes obtener los datos de la tarjeta seleccionada de alguna manera
    
        redeemButton.onclick = () => {
            const pointsToRedeem = parseInt(selectedCardData.points);
            if (userPoints.redeemPoints(pointsToRedeem)) {
                alert(`Has redimido ${selectedCardData.title} por ${pointsToRedeem} puntos.`);
                userPoints.updateUserPoints();
                // Aquí puedes realizar otras operaciones necesarias después de redimir puntos
            }
        };
    
        cancelButton.onclick = () => {
            cardModal.close();
        };
    });
    
  /*
  

  addButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const card = event.currentTarget.closest('.bg-white');
          selectedCardData = {
              id: card.getAttribute('data-id'),
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
                  users[userName].redeemedProducts = users[userName].redeemedProducts || {};
                  if (users[userName].redeemedProducts[selectedCardData.id]) {
                    users[userName].redeemedProducts[selectedCardData.id]++;
                } else {
                    users[userName].redeemedProducts[selectedCardData.id] = 1;
                }
              }
          }

          localStorage.setItem('users', JSON.stringify(users));
          loadProducts();
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
*/
