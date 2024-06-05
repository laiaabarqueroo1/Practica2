document.addEventListener('DOMContentLoaded', () => {
    const userPoints = new UserPoints();
    const cardModal = new CardModal();
    const redeemButton = document.getElementById('redeem-button');

    redeemButton.onclick = () => {
        const selectedCardData = cardModal.selectedCardData;
        if (selectedCardData) {
            userPoints.redeemProduct(selectedCardData); 
            cardModal.close(); 
        } else {
            alert('There is no data for the selected card.');
        }
    };

    window.onclick = (event) => {
        if (event.target == cardModal.modal) {
            cardModal.close();
        }
    };
});
