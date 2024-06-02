class MenuLoader {
    loadMenu() {
        $('#menu').empty();
        const menuOptions = [
            { name: 'Inmortalizar', id: 'inmortalizar' },
            { name: 'Time Master', id: 'timemaster' },
            { name: 'Score Sensei', id: 'scoresensei' }
        ];
        menuOptions.forEach(option => {
            const menuItem = $('<li>').text(option.name);
            const button = $('<button>').addClass('buttonShop').attr('id', option.id).text('Canjear');
            menuItem.append(button);
            $('#menu').append(menuItem);
        });
    }
}