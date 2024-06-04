document.addEventListener('DOMContentLoaded', () => {
    const userPoints = new UserPoints();
    const cardModal = new CardModal();
    const redeemButton = document.getElementById('redeem-button');
    const cancelButton = document.getElementById('cancel-button');

    redeemButton.onclick = () => {
        const selectedCardData = cardModal.selectedCardData;
        if (selectedCardData) {
            userPoints.redeemProduct(selectedCardData); 
            cardModal.close(); 
        } else {
            alert('No hay datos de la tarjeta seleccionada.');
        }
    };

    cancelButton.onclick = () => {
        cardModal.close();
    };

    window.onclick = (event) => {
        if (event.target == cardModal.modal) {
            cardModal.close();
        }
    };
});