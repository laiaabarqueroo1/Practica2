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
        for (const username in this.users) {
            if (this.users.hasOwnProperty(username)) {
                this.points += this.users[username].totalScore;
            }
        }
        this.element.textContent = `Points: ${this.points}`;        
    }

    redeemProduct(selectedCardData) {
        const username = localStorage.getItem('username');
        const pointsToRedeem = parseInt(selectedCardData.points);
        
        if (this.users[username].totalScore >= pointsToRedeem) {
            this.users[username].totalScore -= pointsToRedeem;
            alert(`You have redeemed ${selectedCardData.title} for ${pointsToRedeem} points.`);

            this.users[username].redeemedProducts = this.users[username].redeemedProducts || {};
            
            if (this.users[username].redeemedProducts[selectedCardData.id]) {
                this.users[username].redeemedProducts[selectedCardData.id]++;
            } else {
                this.users[username].redeemedProducts[selectedCardData.id] = 1;
            }
            
            localStorage.setItem('users', JSON.stringify(this.users));
            this.displayPoints(); // Update the points display
        } else {
            alert('You do not have enough points to redeem this item.');
        }
    }


}
