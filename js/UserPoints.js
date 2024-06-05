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

    // Load the products based on the redeemed products of the current user.
    loadProducts() {
        // Array of products.
        const products = [
            { id: 'timemaster', name: 'timemaster', imgSrc: './images/reloj-de-arena.png' },
            { id: 'scoresensei', name: 'scoresensei', imgSrc: './images/diamante.png' },
            { id: 'inmortalizar', name: 'inmortalizar', imgSrc: './images/pocion-de-amor.png' }
        ];

        // Loop through each product.
        products.forEach(product => {
            // Get the button and image elements.
            const button = document.getElementById(product.id);
            const img = button.querySelector('img');

            // Check if the current user has redeemed the product.
            if (this.currentUser.redeemedProducts) {
                // Get the count of times the product was redeemed.
                const redeemedCount = this.currentUser.redeemedProducts[product.name];

                // Enable the button and remove the grayscale filter.
                button.disabled = false;
                img.style.filter = 'none';

                // Create a container for the product image and redeem count.
                const container = document.createElement('div');
                container.classList.add('product-container');

                // Create an image element for the product.
                const productImg = document.createElement('img');
                productImg.src = product.imgSrc;
                container.appendChild(productImg);

                // Create a badge element for the redeem count.
                const badge = document.createElement('span');
                badge.classList.add('redeem-count');
                badge.textContent = redeemedCount;
                container.appendChild(badge);

                // Clear the button content and add the product container.
                button.innerHTML = '';
                button.appendChild(container);
            } else {
                // Disable the button and apply the grayscale filter.
                button.disabled = true;
                img.style.filter = 'grayscale(100%)';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const userPoints = new UserPoints();

    document.getElementById('inmortalizar').addEventListener('click', function() {
        // Logica para añadir una vida
        userLives++;
        updateLivesDisplay();

        // Disminuir una redención al producto "inmortalizar"
        userPoints.redeemProduct({ id: 'inmortalizar', title: 'Inmortalizar', points: 50 }); // Example points
    });

    document.getElementById('timemaster').addEventListener('click', function() {
        // Incrementar el tiempo restante del juego en 2 minutos (120 segundos)
        timeLeft += 120;

        // Disminuir una redención al producto "timemaster"
        userPoints.redeemProduct({ id: 'timemaster', title: 'Timemaster', points: 30 }); // Example points

        // Actualizar la visualización del temporizador
        updateTimerDisplay();
    });

    document.getElementById('scoresensei').addEventListener('click', function() {
        // Multiplicar la puntuación actual del juego por 2
        game.ball.score *= 2;

        // Disminuir una redención al producto "scoresensei"
        userPoints.redeemProduct({ id: 'scoresensei', title: 'Scoresensei', points: 20 }); // Example points

        // Actualizar la visualización de la puntuación
        updateScoreDisplay();
    });
});
