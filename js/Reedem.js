const addButtons = document.querySelectorAll('.add-button');

  
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const card = button.closest('.rounded-lg');
      card.classList.toggle('redeem-active');
    });
  });