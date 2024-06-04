class CardModal {
    constructor() {
        this.modal = document.getElementById("myModal");
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.addButtons = document.querySelectorAll('.add-button');
        this.points = document.getElementById('modal-points');
        this.closeBtn = document.getElementsByClassName("close")[0];
        this.userPointsElement = document.getElementById('user-points');
        this.selectedCardData = null;

        this.addButtonsListeners();
    }

    open(cardData) {
        this.selectedCardData = cardData;
        this.title.innerText = cardData.title;
        this.description.innerText = cardData.description;
        this.points.innerText = Points: ${cardData.points};
        this.modal.style.display = 'block';
    }

    addButtonsListeners() {
        this.addButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const card = event.currentTarget.closest('.bg-white');
                const selectedCardData = {
                    id: card.getAttribute('data-id'),
                    title: card.getAttribute('data-title'),
                    description: card.getAttribute('data-description'),
                    points: card.getAttribute('data-points')
                };
                
                this.open(selectedCardData);
            });
        });

        this.closeBtn.onclick = () => {
            this.close();
        };
    }

    close() {
        this.modal.style.display = 'none';
    }
}