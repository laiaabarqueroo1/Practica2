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
        if (localStorage.getItem('loggedUser')) {
            const loggedUser = localStorage.getItem('loggedUser');
            this.element.textContent = `Points: ${this.users[loggedUser].totalScore}`;
        } else {
            this.element.textContent = `Points: ${this.points}`;
        }
    }

    redeemProduct(selectedCardData) {
        const loggedUser = localStorage.getItem('loggedUser');
        const pointsToRedeem = parseInt(selectedCardData.points);
        
        if (this.users[loggedUser].totalScore >= pointsToRedeem) {
            this.users[loggedUser].totalScore -= pointsToRedeem;
            alert(`You have redeemed ${selectedCardData.title} for ${pointsToRedeem} points.`);

            this.users[loggedUser].redeemedProducts = this.users[loggedUser].redeemedProducts || {};
            
            if (this.users[loggedUser].redeemedProducts[selectedCardData.id]) {
                this.users[loggedUser].redeemedProducts[selectedCardData.id]++;
            } else {
                this.users[loggedUser].redeemedProducts[selectedCardData.id] = 1;
            }

            localStorage.setItem('users', JSON.stringify(this.users));
            this.displayPoints(); // Update the points display
        } else {
            alert('You do not have enough points to redeem this item.');
        }
    }


}
