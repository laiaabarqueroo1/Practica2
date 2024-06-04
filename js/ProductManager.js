class ProductManager {
    constructor(user, timer, uiManager) {
        this.user = user;
        this.timer = timer;
        this.uiManager = uiManager;
    }
<<<<<<< HEAD
<<<<<<< HEAD

   

=======
>>>>>>> parent of 4bde280 (Update ProductManager.js)
=======
=======

    loadProducts() {
        // Load and initialize products if needed
    }

>>>>>>> parent of 52b6501 (netejant codi)
>>>>>>> parent of a4689a3 (Update ProductManager.js)
    useProduct(productType) {
        const userProducts = this.user.redeemedProducts || {};
        if (userProducts[productType]) {
            this.applyProductEffect(productType);
        } else {
            alert(`You have not redeemed the ${productType} product.`);
        }
    }

    applyProductEffect(productType) {
        switch (productType) {
            case 'inmortalizar':
                alert('You are now immortal for this level!');
                break;
            case 'timemaster':
                alert('Time has been extended by 20 seconds!');
                this.timer.extendTime(20);
                break;
            case 'scoresensei':
                alert('Your score has been increased by 50 points!');
                this.user.addScore(50);
                this.uiManager.updateUserDisplay(this.user.username, this.user.score, this.user.level);
                break;
            default:
                alert('Unknown product type.');
                break;
        }
    }
}