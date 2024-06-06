class UserPoints {
    /**
     * Constructor for the UserPoints class.
     * Fetches the logged-in user's points from localStorage and displays them.
     */
    constructor() {
        // Get the HTML element displaying the user's points
        this.element = document.getElementById('user-points');

        // Get the logged-in user's username
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        // If no user is logged in, log an error and return
        if (!loggedInUser) {
            console.error('No user is currently logged in.');
            return;
        }

        // Get the list of users from localStorage
        const users = this.getUsersFromLocalStorage();

        // Find the logged-in user in the list of users
        const currentUser = users.find(user => user.username === loggedInUser);

        // If the logged-in user is not found, log an error and return
        if (!currentUser) {
            console.error('Logged-in user not found:', loggedInUser);
            return;
        }

        // Get the logged-in user's total score and store it in the instance variable
        this.points = currentUser.totalScore || 0;

        // Display the user's points
        this.displayPoints();
    }
    getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
    displayPoints() {
        this.element.textContent = `Points: ${this.points}`;
    }
    redeemProduct(selectedCardData) {
        // Parse the points to redeem into an integer.
        const pointsToRedeem = parseInt(selectedCardData.points);
        if (this.points >= pointsToRedeem) {
            // Subtract the points from the total points.
            this.points -= pointsToRedeem;
            // Update the display of the total points.
            this.displayPoints();
            // Alert the user about the redemption.
            alert(`You have redeemed ${selectedCardData.title} for ${pointsToRedeem} points.`);
            // Get the users from local storage.
            const users = this.getUsersFromLocalStorage();
            // Find the current user.
            const currentUser = users.find(user => user.username === localStorage.getItem('loggedInUser'));
            // Update the total score and redeemed products of the current user.
            currentUser.totalScore = this.points;
            currentUser.redeemedProducts = currentUser.redeemedProducts || {};

            if (currentUser.redeemedProducts[selectedCardData.id]) {
                // If the product has already been redeemed, increment the count.
                currentUser.redeemedProducts[selectedCardData.id]++;
            } else {
                // If the product has not been redeemed, set the count to 1.
                currentUser.redeemedProducts[selectedCardData.id] = 1;
            }

            // Update the users in local storage.
            localStorage.setItem('users', JSON.stringify(users));
            // Reload the products.
            this.loadProducts();
        } else {
            // If the user does not have enough points, alert the user.
            alert('You do not have enough points to redeem this item.');
        }
    }
}