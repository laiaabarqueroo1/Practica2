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
        this.points = 0;
        
        for (const userName in this.users) {
            if (this.users.hasOwnProperty(userName)) {
                this.points += this.users[userName].totalScore;
            }
        }
        this.element.textContent = Points: ${this.points};
    }

    redeemProduct(selectedCardData) {
        const pointsToRedeem = parseInt(selectedCardData.points);
        
        if (this.points >= pointsToRedeem) {
            this.points -= pointsToRedeem;
            this.element.textContent = Points: ${this.points};
            alert(Has redimido ${selectedCardData.title} por ${pointsToRedeem} puntos.);
            
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
            
            this.loadProducts();
        } else {
            alert('No tienes suficientes puntos para redimir este artículo.');
        }
    }

    loadProducts() {
        // Implementa la lógica para cargar productos aquí, si es necesario
    }
}