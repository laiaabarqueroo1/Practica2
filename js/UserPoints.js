class UserPoints {
    constructor() {
        this.element = document.getElementById('user-points');
        this.points = 0;
        this.users = this.getUsersFromLocalStorage();
        this.displayPoints();
    }

    getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || {};
    }

    displayPoints() {
        for (const userName in this.users) {
            if (this.users.hasOwnProperty(userName)) {
                this.points += this.users[userName].totalScore;
            }
        }
        this.element.textContent = `Points: ${this.points}`;
    }

    redeemProduct(selectedCardData) {
        const pointsToRedeem = parseInt(selectedCardData.points);
        if (this.points >= pointsToRedeem) {
            this.points -= pointsToRedeem;
            this.element.textContent = `Points: ${this.points}`;
            
            alert(`Has redimido ${selectedCardData.title} por ${pointsToRedeem} puntos.`);

            // Guardar los puntos actualizados en el local storage
            for (const userName in this.users) {
                if (this.users.hasOwnProperty(userName)) {
                    this.users[userName].totalScore = this.points;
                    this.users[userName].redeemedProducts = this.users[userName].redeemedProducts || {};
                    if (this.users[userName].redeemedProducts[selectedCardData.id]) {
                      this.users[userName].redeemedProducts[selectedCardData.id]++;
                  } else {
                      this.users[userName].redeemedProducts[selectedCardData.id] = 1;
                  }
                }
            }

            localStorage.setItem('users', JSON.stringify(this.users));
            // Aquí deberías llamar a la función para cargar productos después de redimirlos
            // loadProducts();
        } else {
            alert('No tienes suficientes puntos para redimir este artículo.');
        }
        // closeModal(); // Asegúrate de definir y llamar a esta función si es necesario
    }

    updateUserPoints() {
        for (const userName in this.users) {
            if (this.users.hasOwnProperty(userName)) {
                this.users[userName].totalScore = this.points;
            }
        }
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}

const userPoints = new UserPoints();
