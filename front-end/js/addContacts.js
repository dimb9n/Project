import { svgDelete } from "./svg.js";
export const addContacts = function () {
    const contacts = document.querySelector('.contacts-block');
    const contactsBlock = document.querySelector('.contacts-list-block');
    const modalData = document.querySelector('.modal-data')

    const contact = document.createElement('div');
    const contactActivBtn = document.createElement('button');
    const contactsList = document.createElement('ul');
    const phone = document.createElement('li');
    const email = document.createElement('li');
    const vk = document.createElement('li');
    const facebook = document.createElement('li');
    const oter = document.createElement('li');
    const inputContact = document.createElement('input');
    const delTooltip = document.createElement('span');
    const removeContactBtn = document.createElement('button');
    inputContact.type = 'number'

    contact.classList.add('contact-element');
    contactActivBtn.classList.add('contact-activ-btn');
    contactsList.classList.add('contacts-list');
    phone.classList.add('contact-item', 'phone');
    email.classList.add('contact-item', 'email');
    vk.classList.add('contact-item', 'vk');
    facebook.classList.add('contact-item', 'facebook');
    oter.classList.add('contact-item', 'oter');
    inputContact.classList.add('inputContact');
    removeContactBtn.classList.add('remove-contact-btn');
    delTooltip.classList.add('del-tooltip', 'tooltip');



    contactActivBtn.textContent = 'Телефон';
    phone.textContent = 'Телефон';
    email.textContent = 'Email';
    vk.textContent = 'VK';
    facebook.textContent = 'facebook';
    oter.textContent = 'Другое';
    inputContact.placeholder = 'Введите данные контакта';
    removeContactBtn.innerHTML = svgDelete;
    delTooltip.textContent = 'Удалить контакт';

    contactsList.append(phone, email, vk, facebook, oter);
    contact.append(contactActivBtn, contactsList, inputContact, removeContactBtn);
    contactsBlock.append(contact);
    removeContactBtn.append(delTooltip);


    contact.addEventListener('click', (e) => {
        e.preventDefault();
        const ulContacts = document.querySelectorAll('.contacts-list');
        if (e.target === contactActivBtn) {
            contactActivBtn.classList.toggle('js-contact-activ-btn')
            contactsList.classList.toggle('js-contacts-list-expand');
            ulContacts.forEach(item => {
                if (item === e.target.nextSibling) {
                    return
                } else {
                    item.classList.remove('js-contacts-list-expand');
                    item.previousSibling.classList.remove('js-contact-activ-btn');
                }
            })
        }
        if (e.target !== contactActivBtn) {
            ulContacts.forEach(item => {
                item.classList.remove('js-contacts-list-expand')
                item.previousSibling.classList.remove('js-contact-activ-btn');
            })
        }
        if (e.target.classList.contains('contact-item')) {
            contactActivBtn.textContent = e.target.textContent;
            contactsList.classList.remove('js-contact-activ-btn');
            if (e.target.textContent !== 'Телефон') inputContact.type = 'text'
            else inputContact.type = 'number';
            // if (e.target.textContent === 'Email') inputContact.type = 'email';

        }
    });

    removeContactBtn.addEventListener('click', () => {
        const contactsAll = document.querySelectorAll('.contact-element');
        const btnadd = document.querySelector('.btn-add-contacts');
        contact.remove();
        if (contactsAll.length <= 1) {
            contacts.classList.remove('contacts-block-activ')
        }
        if (contactsAll.length <= 10) {
            btnadd.style.display = 'block';
        }
        if (contactsAll.length < 5) {
            modalData.classList.remove('js-modal-data');
        }
    });
    return {
        contactActivBtn,
        inputContact
    }
}
