import { getClients } from "./api.js";
import { deleteClients } from "./api.js";
import { createModalWindow } from './createModalWindow.js';
import { getClient } from "./api.js";
import { patchClient } from "./api.js";
import { addContacts } from "./addContacts.js";
import { clientDataFromForm } from "./operationModalWindow.js";
import { remove } from "./removeTableItems.js";
import { validationForm } from "./validationForm.js";
import { searchParam } from "./api.js";
import { svgVk, svgFb, svgMail, svgOther, svgPhone, hrefClient } from "./svg.js";

const dateWork = function (data, type, time) {

    const day = new Date(data[type]).getDate();
    const month = new Date(data[type]).getMonth() + 1;
    const FullYear = new Date(data[type]).getFullYear();
    const hours = new Date(data[type]).getHours();
    const minutes = new Date(data[type]).getMinutes();
    let ret = ``;
    if (!time) {
        ret = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${FullYear}`;
    } else {
        ret = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return ret;
}
const createContactList = function (data) {
    const contactHrefDiv = document.createElement('div');
    const contactHref = document.createElement('a');

    const contactTooltip = document.createElement('div');
    const contactType = document.createElement('span');
    const contactValue = document.createElement('span');

    contactHrefDiv.classList.add('block-href');
    contactHref.classList.add('contact-href');
    contactTooltip.classList.add('contact-tooltip', 'tooltip');
    contactType.classList.add('contact-tooltip-type');
    contactValue.classList.add('contact-tooltip-value');

    contactValue.textContent = data.value;
    if (data.type === 'Телефон') contactType.textContent = '';
    else {
        contactType.textContent = `${data.type}: `;
        contactValue.classList.add('color-text-tooltip');
    }
    contactTooltip.append(contactType, contactValue);
    contactHrefDiv.append(contactHref, contactTooltip);

    let img;

    if (data.type === 'Телефон') {
        img = svgPhone;
    }
    if (data.type === 'Email') {
        img = svgMail;
    }
    if (data.type === 'VK') {
        img = svgVk;
    }
    if (data.type === 'facebook') {
        img = svgFb;
    }
    if (data.type === 'Другое') {
        img = svgOther;
    }
    const href = data.value;
    contactHref.innerHTML = img;
    contactHref.href = href;

    contactHref.addEventListener('click', (e) => {
        e.preventDefault();
    })

    return {
        contactHrefDiv,
        contactHref,
        contactTooltip
    };
}
export const createClientRoad = function (data) {
    const getLocationSerch = searchParam();
    const tableRoadClient = document.createElement('tr');

    const clientId = document.createElement('td');
    const clientIdData = document.createElement('span');

    const clientFullName = document.createElement('td');
    const clientName = document.createElement('span');
    const clientLastName = document.createElement('span');
    const clientSurname = document.createElement('span');

    const clientCreateData = document.createElement('td');
    const createData = document.createElement('span');
    const createTime = document.createElement('span');


    const сlientUpdated = document.createElement('td');
    const updatedData = document.createElement('span');
    const updatedTime = document.createElement('span');

    const сlientContacts = document.createElement('td');
    const clientContactsBlock = document.createElement('div');

    const clientActions = document.createElement('td');
    const clientBtnСhange = document.createElement('button');
    const clientBtnDelet = document.createElement('button');
    const clientIdAux = document.createElement('div');
    const clientHrefBlock = document.createElement('div');
    const clientHref = document.createElement('a');
    const clientHrefTooltip = document.createElement('span');



    clientId.append(clientIdData);
    clientFullName.append(clientSurname, clientName, clientLastName);
    clientCreateData.append(createData, createTime);
    сlientUpdated.append(updatedData, updatedTime);
    clientActions.append(clientBtnСhange, clientIdAux, clientBtnDelet, clientHrefBlock);
    tableRoadClient.append(clientId, clientFullName, clientCreateData, сlientUpdated, сlientContacts, clientActions);
    сlientContacts.append(clientContactsBlock);
    clientHrefBlock.append(clientHref, clientHrefTooltip)

    clientId.classList.add('client-id', 'client-td');
    clientIdData.classList.add('client-id-data', 'client-span');

    tableRoadClient.classList.add('table-road-client');
    clientFullName.classList.add('client-full-name', 'client-td');
    clientName.classList.add('client-name', 'client-span');
    clientLastName.classList.add('client-last-name', 'client-span');
    clientSurname.classList.add('client-surname', 'client-span');

    clientCreateData.classList.add('client-create-data', 'client-td');
    createData.classList.add('create-data', 'client-span');
    createTime.classList.add('create-time', 'client-span');

    сlientUpdated.classList.add('client-updated', 'client-td');
    updatedData.classList.add('updated-data', 'client-span');
    updatedTime.classList.add('updated-time', 'client-span');

    сlientContacts.classList.add('client-contacts', 'client-td');
    clientContactsBlock.classList.add('client-contact-block');

    clientActions.classList.add('client-actionst', 'client-td');
    clientBtnСhange.classList.add('client-btn-change-img', 'client-btn-change', 'client-btn');
    clientBtnDelet.classList.add('client-btn-delet-img', 'client-btn-delet', 'client-btn');
    clientIdAux.classList.add('client-id-aux');

    clientHrefBlock.classList.add('client-href-block');
    clientHref.classList.add('client-href');
    clientHrefTooltip.classList.add('tooltip', 'client-href-tooltip');

    tableRoadClient.setAttribute('tabindex', '0');

    tableRoadClient.id = data.id;

    clientIdData.textContent = data.id.substr(0, 7);
    clientSurname.textContent = `${data.surname} `;
    clientName.textContent = `${data.name} `;
    clientLastName.textContent = data.lastName;
    createData.textContent = dateWork(data, 'createdAt');
    createTime.textContent = dateWork(data, 'createdAt', true);
    updatedData.textContent = dateWork(data, 'updatedAt');
    updatedTime.textContent = dateWork(data, 'updatedAt', true);
    clientBtnСhange.innerHTML = ` Изменить`;
    clientBtnDelet.innerHTML = ` Удалить`;
    clientIdAux.textContent = data.id;
    clientHref.href = `index.html?id=${data.id}`;
    clientHref.innerHTML = hrefClient;
    clientHref.target = '_blank';
    clientHrefTooltip.textContent = 'Ссылка на клиента';

    if (getLocationSerch) {
        clientHref.style.display = 'none'
    }

    tableRoadClient.addEventListener('click', async (e) => {

        if (e.target === clientBtnDelet) {
            const idClient = e.target.previousSibling.textContent
            const modal = createModalWindow('Удалить клиента', true);
            document.body.append(modal.modalBlock);
            modal.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await deleteClients(idClient);
                modal.modalBlock.remove();
                remove();
                if (getLocationSerch) {
                    return
                } else createClient();

            });
        }
        if (e.target === clientBtnСhange) {
            const clientId = e.target.nextSibling.textContent;
            const dataClietn = await getClient(clientId);
            const modal = createModalWindow('Изменить данные', false, clientId);

            modal.inputSurname.value = dataClietn.surname;
            modal.inputName.value = dataClietn.name;
            modal.inputPatronymic.value = dataClietn.lastName;

            document.body.append(modal.modalBlock);

            const inputModal = document.querySelectorAll('.input-modal');

            inputModal.forEach(item => {
                if (item.value) {
                    item.nextSibling.classList.add('up-lable');
                }
            });

            dataClietn.contacts.forEach(item => {
                const contacts = addContacts();
                contacts.contactActivBtn.textContent = item.type;
                if (contacts.contactActivBtn.textContent !== 'Телефон') contacts.inputContact.type = 'text';
                else contacts.inputContact.type = 'number';
                if (contacts.contactActivBtn.textContent === 'Email') contacts.inputContact.type = 'email';
                contacts.inputContact.value = item.value;
                console.log(contacts.inputContact.value);
            });

            const contactBlock = document.querySelector('.contacts-block');
            const contactElement = document.querySelectorAll('.contact-element');
            console.log(contactElement);
            if (contactElement.length > 0) {
                contactBlock.classList.add('contacts-block-activ');
            }

            modal.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const client = clientDataFromForm(modal);

                const contactList = document.querySelectorAll('.contact-element');

                const validation = validationForm(modal, contactList);
                console.log(validation);
                if (validation) return;
                modal.modalBlock.remove();
                await patchClient(client, clientId);
                remove();
                if (getLocationSerch) {
                    const client = await getClient(getLocationSerch)
                    createClient([client]);
                } else createClient();

            });
        }
    })
    return {
        tableRoadClient,
        сlientContacts,
        clientContactsBlock,
        clientBtnDelet,
        clientBtnСhange,
    }

}
export async function createClient(data) {
    let clients;
    if (data) clients = data;
    else clients = await getClients();
    const tableBody = document.querySelector('.table-body');
    clients.forEach(item => {
        const td = createClientRoad(item);
        item.contacts.forEach(item => {
            const tdContacts = createContactList(item);
            td.clientContactsBlock.append(tdContacts.contactHrefDiv);
        })
        tableBody.append(td.tableRoadClient);
    });
}
