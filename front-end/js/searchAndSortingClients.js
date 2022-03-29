import { serchClient } from "./api.js"
import { createClient } from "./createClients.js";
import { remove } from "./removeTableItems.js";
import { getClients } from "./api.js";
import { searchParam } from "./api.js";


export const searchAndSortingClients = async function () {
    const getLocationSerch = searchParam();

    const tHeadClient = document.querySelector('.thead-road');
    const allSpanVector = document.querySelectorAll('.span-vector');
    const hId = document.querySelector('.span-client-id');
    const hFullName = document.querySelector('.span-client-fullname');
    const creation = document.querySelector('.span-client-creation');
    const change = document.querySelector('.span-client-change');
    const inputSearch = document.querySelector('.input-serch');
    const listAutoComplete = document.querySelector('.list-auto-complete');
    const blockSearch = document.querySelector('.block-search');
    const btnOnOff = document.querySelector('.btn-type-search');

    let focusSearchItem = -1;
    let arrResult = [];
    let timeout;

    const searchAutoComplete = async function (item) {
        const list = document.querySelector('.list-auto-complete');
        const clients = await serchClient(item);

        const listenerSearch = function (e) {
            const clientId = e.target.lastChild.textContent;
            const focusClient = document.getElementById(clientId);
            focusClient.classList.add('focus-client');
            focusClient.focus();

            inputSearch.value = '';
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                focusClient.classList.remove('focus-client');
            }, 1000);
        }

        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        clients.forEach(element => {
            const listElementSearch = document.createElement('li');
            const spanFullname = document.createElement('span');
            const spanId = document.createElement('span');
            listElementSearch.classList.add('list-element-search');
            spanId.classList.add('client-id-auto-complite');
            spanFullname.classList.add('client-fullname-auto-complete');
            const fullname = `${element.surname} ${element.name} ${element.lastName}`;
            const clientId = element.id;
            spanFullname.append(fullname);
            spanId.append(clientId);
            listElementSearch.append(spanFullname, spanId);
            listAutoComplete.append(listElementSearch);

            listElementSearch.addEventListener('click', listenerSearch)
            listElementSearch.setAttribute('tabinde', '0');
        });

        if (!item) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        }


    }

    btnOnOff.addEventListener('click', () => {
        btnOnOff.classList.toggle('btn-on');
        if (btnOnOff.classList.contains('btn-on')) btnOnOff.textContent = 'ON'
        else btnOnOff.textContent = 'OFF';
        inputSearch.value = '';
        remove();
        createClient();
    });

    const searchResult = async function (item) {
        const clients = await serchClient(item.value);
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            remove();
            createClient(clients);
        }, 300);
        return clients;
    }

    inputSearch.addEventListener('input', async () => {
        if (!btnOnOff.classList.contains('btn-on')) {
            const result = await searchResult(inputSearch);
            arrResult = result.slice();
        }
        else searchAutoComplete(inputSearch.value);
    });



    blockSearch.addEventListener('keydown', (e) => {
        const list = document.querySelectorAll('.list-element-search');
        if (list.length > 0) {
            if (e.key === 'ArrowDown') {
                focusSearchItem += 1;
                if (focusSearchItem >= list.length) focusSearchItem = 0;
                list.forEach(element => {
                    element.classList.remove('js-elsement-search');
                })
                list[focusSearchItem].classList.add('js-elsement-search');
            }
            if (e.key === 'ArrowUp') {
                if (focusSearchItem <= 0) focusSearchItem = list.length;
                focusSearchItem -= 1
                list.forEach(element => {
                    element.classList.remove('js-elsement-search');
                });
                list[focusSearchItem].classList.add('js-elsement-search');
            }
            if (e.key === 'Enter') {
                const listBlock = document.querySelector('.list-auto-complete');
                console.log(listBlock);
                const clientId = list[focusSearchItem].lastChild.textContent;
                const focusClient = document.getElementById(clientId);
                focusClient.classList.add('focus-client');
                focusClient.focus();
                inputSearch.value = '';
                while (listBlock.firstChild) {
                    listBlock.removeChild(listBlock.firstChild);
                }
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    focusClient.classList.remove('focus-client');
                }, 1000);
            }
        }
    })

    const tHeadListener = async function (e) {
        const client = await getClients();
        let data;
        if (arrResult.length > 0) data = arrResult
        else data = client;

        const sorting = function (dataClient, key) {
            remove();
            allSpanVector.forEach(item => {
                if (item === e.target.nextSibling) return
                else item.classList.remove('sort', 'sort-up');
            })
            if (e.target.nextSibling.classList.contains('sort')) e.target.nextSibling.classList.toggle('sort-up');
            e.target.nextSibling.classList.add('sort');
            let sort;
            if (!e.target.nextSibling.classList.contains('sort-up')) {
                sort = dataClient.slice().sort((a, b) => a[key] > b[key] ? 1 : -1);
            } else {
                sort = dataClient.slice().sort((a, b) => a[key] > b[key] ? -1 : 1);
            }

            createClient(sort);
        }
        if (e.target === hId) sorting(data, 'id');

        if (e.target === hFullName) sorting(data, 'surname');

        if (e.target === creation) sorting(data, 'createdAt');

        if (e.target === change) sorting(data, 'updatedAt');
    }
    tHeadClient.addEventListener('click', tHeadListener);
    if (getLocationSerch) {
        tHeadClient.removeEventListener('click', tHeadListener);
    }
}

