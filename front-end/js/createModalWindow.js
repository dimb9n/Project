import { addContacts } from "./addContacts.js"
import { plus } from "./svg.js";
import { clientDataFromForm } from "./operationModalWindow.js";

export const createModalWindow = function (title, del, id) {

    const modalBlock = document.createElement('div');
    const modalData = document.createElement('div');
    const modalTitle = document.createElement('h1');
    const modalIdClient = document.createElement('span');
    const closeBtn = document.createElement('button');

    const form = document.createElement('form');

    const lableSurname = document.createElement('label');
    const inputSurname = document.createElement('input');
    const lableTextSurname = document.createElement('div');
    const lableName = document.createElement('label');
    const inputName = document.createElement('input');
    const lableTextName = document.createElement('div');
    const lablePatronymic = document.createElement('label');
    const inputPatronymic = document.createElement('input');
    const lableTextPatronymic = document.createElement('div');
    const contactsBlock = document.createElement('div');
    const contactsList = document.createElement('div');
    const btnAddContacts = document.createElement('button');
    const blockErrText = document.createElement('div');
    const btnSaved = document.createElement('button');
    const btnCancell = document.createElement('button');
    const surnameStar = document.createElement('span');
    const nameStar = document.createElement('span');


    form.classList.add('modal-form');
    modalBlock.classList.add('modal-block', 'animation-modal-block');
    modalData.classList.add('modal-data');
    modalTitle.classList.add('modal-title')
    modalIdClient.classList.add('modal-id');
    closeBtn.classList.add('close-btn');
    lableSurname.classList.add('lable-form');
    lableName.classList.add('lable-form');
    lablePatronymic.classList.add('lable-form');
    inputSurname.classList.add('input-modal', 'input-modal-surname');
    inputName.classList.add('input-modal', 'input-modal-name');
    inputPatronymic.classList.add('input-modal', 'input-modal-patronymic');
    lableTextSurname.classList.add('lable-text', 'lable-text-surname');
    lableTextName.classList.add('lable-text', 'lable-text-name');
    lableTextPatronymic.classList.add('lable-text', 'lable-text-patronymic');
    contactsBlock.classList.add('contacts-block');
    contactsList.classList.add('contacts-list-block');
    btnAddContacts.classList.add('btn-add-contacts', 'btn-add-contacts-svg');
    blockErrText.classList.add('block-err-text');
    btnSaved.classList.add('btn-saved');
    btnCancell.classList.add('btnc-cancell');
    surnameStar.classList.add('star');
    nameStar.classList.add('star');

    // inputSurname.setAttribute('required', true);
    // inputName.setAttribute('required', true);

    if (id) {
        modalIdClient.textContent = `ID: ${id.substr(0, 6)}`;
    }

    modalTitle.textContent = title;
    lableTextSurname.textContent = 'Фамилия';
    lableTextName.textContent = 'Имя';
    surnameStar.textContent = '*'
    nameStar.textContent = '*'
    lableTextPatronymic.textContent = 'Отчество';
    btnSaved.textContent = `${title === 'Удалить клиента' ? 'Удалить' : 'Сохранить'}`;
    btnCancell.textContent = 'отмена';
    btnAddContacts.innerHTML = ` Добавить контакт`;


    lableSurname.append(inputSurname, lableTextSurname);
    lableTextSurname.append(surnameStar);
    lableTextName.append(nameStar);
    lableName.append(inputName, lableTextName);
    lablePatronymic.append(inputPatronymic, lableTextPatronymic);
    contactsBlock.append(contactsList, btnAddContacts);
    form.append(lableSurname, lableName, lablePatronymic, contactsBlock, blockErrText, btnSaved, btnCancell);
    modalData.append(modalTitle, modalIdClient, closeBtn, form);
    modalBlock.append(modalData);

    document.body.addEventListener('click', (e) => {
        if (e.target === modalData) return
        if (e.target === modalBlock || e.target === closeBtn) modalBlock.remove();
    });
    form.addEventListener('input', (e) => {
        const inputContact = document.querySelector('.inputContact');
        if (e.target.value && !e.target.classList.contains('inputContact')) e.target.nextSibling.classList.add('up-lable');
        else e.target.nextSibling.classList.remove('up-lable');
    });
    btnAddContacts.addEventListener('click', (e) => {
        e.preventDefault();
        const contactTypeList = document.querySelectorAll('.contacts-list');
        const contactListBtn = document.querySelectorAll('.contact-activ-btn')
        contactsBlock.classList.add('contacts-block-activ');
        const contactsAdd = addContacts();
        const contactsAll = document.querySelectorAll('.contact-element');
        if (contactsAll.length > 9) {
            btnAddContacts.style.display = 'none';
        }
        if (contactsAll.length > 4) {
            modalData.classList.add('js-modal-data');
        }
        contactTypeList.forEach(item => {
            item.classList.remove('js-contacts-list-expand');
            item.previousSibling.classList.remove('js-contact-activ-btn');
        })
    });

    btnAddContacts.addEventListener('mousemove', () => {
        btnAddContacts.classList.remove('btn-add-contacts-svg');
        btnAddContacts.classList.add('btn-add-contacts-svg-hover');
    });
    btnAddContacts.addEventListener('mouseleave', () => {
        btnAddContacts.classList.add('btn-add-contacts-svg');
        btnAddContacts.classList.remove('btn-add-contacts-svg-hover');
    })


    btnCancell.addEventListener('click', (e) => {
        e.preventDefault();
        modalBlock.remove();
    })

    if (del) {
        const createTextDel = document.createElement('div');
        createTextDel.textContent = 'Вы действительно хотите удалить данного клиента?';
        form.append(btnSaved, btnCancell);
        modalData.append(modalTitle, createTextDel, closeBtn, form);
        modalBlock.append(modalData);
        createTextDel.classList.add('text-del');
        modalData.classList.add('modal-data-del');
        modalTitle.classList.add('modal-title-del')
        lableSurname.remove();
        lableName.remove();
        lablePatronymic.remove();
        contactsBlock.remove();

        return {
            modalBlock,
            form
        }
    }

    const filteredInput = function () {
        function filter(element, spase = true) {
            element.addEventListener('input', function () {
                if (this.value) {
                    this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
                    this.value = this.value[0].toUpperCase() + this.value.slice(1);
                    if (spase) {
                        this.value = this.value.replace(/\s+/gi, '');
                    }
                }
            })
        }
        filter(inputName);
        filter(inputSurname);
        filter(inputPatronymic);
    }();


    return {
        modalBlock,
        modalData,
        form,
        inputSurname,
        inputName,
        inputPatronymic,
        closeBtn,
        btnAddContacts,
        blockErrText
    }
}