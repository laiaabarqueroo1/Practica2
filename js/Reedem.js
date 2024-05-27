/*// Datos de los items
const items = {
    heart: {
        name: "Incrementar Vidas",
        description: "Aumenta una vida extra en el juego.",
        cost: 100
    },
    time: {
        name: "Tiempo Extra",
        description: "Agrega tiempo adicional al cronómetro.",
        cost: 50
    },
    points: {
        name: "Doble Puntuación",
        description: "Duplica los puntos obtenidos por un tiempo limitado.",
        cost: 150
    }
};
*/
// Producto a favoritos
$('.card .aFavs').click(function(){
    $(this).parents('.card').toggleClass('esFav');
});

// Producto al carrito
$('.card .alCarrito').click(function(){
    $(this).parents('.card').toggleClass('enCarrito');
});
  