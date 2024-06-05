class UserPoints {
    constructor() {
        this.element = document.getElementById('user-points');
        this.loggedInUser = localStorage.getItem('loggedInUser');
        if (!this.loggedInUser) {
            console.error('No user is currently logged in.');
            return;
        }
        this.users = this.getUsersFromLocalStorage();
        this.currentUser = this.users.find(user => user.username === this.loggedInUser);
        if (!this.currentUser) {
            console.error('Logged-in user not found:', this.loggedInUser);
            return;
        }
        this.points = this.currentUser.totalScore || 0;
        this.displayPoints();
    }

    getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    displayPoints() {
        this.element.textContent = `Points: ${this.points}`;
    }

    redeemProduct(selectedCardData) {
        const pointsToRedeem = parseInt(selectedCardData.points);

        if (this.points >= pointsToRedeem) {
            this.points -= pointsToRedeem;
            this.element.textContent = `Points: ${this.points}`;
            alert(`You have redeemed ${selectedCardData.title} for ${pointsToRedeem} points.`);

            this.currentUser.totalScore = this.points;
            this.currentUser.redeemedProducts = this.currentUser.redeemedProducts || {};

            if (this.currentUser.redeemedProducts[selectedCardData.id]) {
                this.currentUser.redeemedProducts[selectedCardData.id]++;
            } else {
                this.currentUser.redeemedProducts[selectedCardData.id] = 1;
            }

            localStorage.setItem('users', JSON.stringify(this.users));

            this.loadProducts();
        } else {
            alert('You do not have enough points to redeem this item.');
        }
    }

    loadProducts() {
        const products = [
            { id: 'timemaster', name: 'timemaster', imgSrc: './images/reloj-de-arena.png' },
            { id: 'scoresensei', name: 'scoresensei', imgSrc: './images/diamante.png' },
            { id: 'inmortalizar', name: 'inmortalizar', imgSrc: './images/pocion-de-amor.png' }
        ];

        // Iterar sobre cada producto
        products.forEach(product => {
            const button = document.getElementById(product.id);
            const img = button.querySelector('img');

            // Verificar si el producto ya ha sido redimido por el usuario
            if (!this.currentUser.redeemedProducts || !this.currentUser.redeemedProducts[product.name]) {
                console.warn('El producto aún no ha sido redimido por el usuario:', product.name);

                // Si no ha sido redimido, deshabilitar el botón y aplicar filtro de escala de grises a la imagen
                button.disabled = true;
                img.style.filter = 'grayscale(100%)';
                return;
            }

            const redeemedCount = this.currentUser.redeemedProducts[product.name];

            // Si el producto ha sido redimido, habilitar el botón y eliminar cualquier filtro aplicado a la imagen
            button.disabled = false;
            img.style.filter = 'none';

            // Crear un contenedor div para el botón y el número de redenciones
            const container = document.createElement('div');
            container.classList.add('product-container');

            // Agregar la imagen del producto al contenedor
            const productImg = document.createElement('img');
            productImg.src = product.imgSrc;
            container.appendChild(productImg);

            // Agregar el número de redenciones al contenedor
            const badge = document.createElement('span');
            badge.classList.add('redeem-count');
            badge.textContent = redeemedCount;
            container.appendChild(badge);

            // Reemplazar el contenido del botón con el contenedor
            button.innerHTML = '';
            button.appendChild(container);
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
