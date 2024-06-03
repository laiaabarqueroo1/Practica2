class Menu {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    load() {
        fetch("menu.html")
            .then(response => response.text())
            .then(data => {
                this.container.innerHTML = data;
                this.addEventListeners();
            })
            .catch(error => console.error("Error loading menu:", error));
    }
    addEventListeners() {
        const addButtons = this.container.querySelectorAll('.add-button');
        const cardModal = new CardModal();
        const userPoints = new UserPoints();

        addButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.currentTarget.closest('.bg-white');
                const cardData = {
                    id: card.getAttribute('data-id'),
                    title: card.getAttribute('data-title'),
                    description: card.getAttribute('data-description'),
                    points: card.getAttribute('data-points')
                };
                cardModal.open(cardData);
            });
        });

        cardModal.closeBtn.onclick = () => cardModal.close();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const menu = new Menu("menu-container");
    menu.load();
});