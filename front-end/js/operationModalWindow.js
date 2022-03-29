import { createModalWindow } from './createModalWindow.js';
import { createClient } from './api.js';
import { remove } from "./removeTableItems.js";
import { createClient as createClients } from "./createClients.js";
import { validationForm } from './validationForm.js';

export const clientDataFromForm = function (modal) {
    const contactsType = document.querySelectorAll('.contact-activ-btn');
    const contactValue = document.querySelectorAll('.inputContact');

    const clientContacts = [];

    const client = {
        surname: modal.inputSurname.value.trim(),
        name: modal.inputName.value.trim(),
        lastName: modal.inputPatronymic.value.trim(),
        contacts: clientContacts,
    };

    for (let i = 0; i < contactsType.length; i++) {
        clientContacts.push(
            {
                type: contactsType[i].textContent,
                value: contactValue[i].value.trim(),
            }
        );
    }
    return client;
}
export const callModal = function () {
    const btnAdd = document.querySelector('.button-add');
    btnAdd.addEventListener('click', () => {
        const modal = createModalWindow('Новый клиент');
        document.body.append(modal.modalBlock);
        modal.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const client = clientDataFromForm(modal);
            const contactList = document.querySelectorAll('.contact-element');

            const validation = validationForm(modal, contactList);

            if (validation) return;

            await createClient(client);

            modal.modalBlock.remove();
            remove();
            createClients();
        });
    });
} 