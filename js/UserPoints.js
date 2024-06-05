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
<<<<<<< HEAD
        if (localStorage.getItem('username')) {
            const username = localStorage.getItem('username');
            this.element.textContent = `Points: ${this.users[username].totalScore}`;
        } else {
            this.element.textContent = `Points: ${this.points}`;
        }
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
=======
        this.element.textContent = `Points: ${this.points}`;
    }

    redeemProduct(selectedCardData) {
        const pointsToRedeem = parseInt(selectedCardData.points);
        
        if (this.points >= pointsToRedeem) {
            this.points -= pointsToRedeem;
            alert(`You have redeemed ${selectedCardData.title} for ${pointsToRedeem} points.`);

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
>>>>>>> parent of bc19a47 (Update UserPoints.js)
            }
            
            localStorage.setItem('users', JSON.stringify(this.users));
            this.displayPoints(); // Update the points display
        } else {
            alert('You do not have enough points to redeem this item.');
        }
    }


}
