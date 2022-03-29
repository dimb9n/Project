import { getClient } from "./api.js";
import { createClient } from "./createClients.js";
import { remove as removes } from "./removeTableItems.js";
import { searchParam } from "./api.js";
export const linkToClient = async function () {
    const AZ = document.querySelector('.full-name-span-az');
    const vector = document.querySelectorAll('.span-vector');
    const getLocationSerch = searchParam();
    if (getLocationSerch) {
        document.querySelector('.button-add').style.display = 'none';
        document.querySelector('.input-serch').style.display = 'none';
        document.querySelector('.header-clients').textContent = 'Клиент';
        document.querySelector('.btn-type-search').style.display = 'none';
        vector.forEach(item => item.remove());
        AZ.remove();
        const client = await getClient(getLocationSerch);
        removes();
        console.log(client);
        createClient([client]);
    }
}