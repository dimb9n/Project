export const remove = function () {
    const clientRoad = document.querySelector('.table-body');
    while (clientRoad.firstChild) {
        clientRoad.removeChild(clientRoad.firstChild);
    }
}