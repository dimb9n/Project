export const validationForm = function (form, contacts) {
    let err;
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regVk = /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/;
    const regFacebook = /^(https?:\/\/)?(www\.)?facebook\.com\/(\w|\d)+?\/?$/;

    const validationContact = function (item, cfgReg, textErr) {

        if (item.lastChild.previousSibling.value.replace(cfgReg, '') || item.lastChild.previousSibling.value.length < 5) {
            form.blockErrText.textContent = textErr;
            item.lastChild.previousSibling.focus();
            err = true;
            return;

        }
    }



    if (contacts.length > 0) {
        contacts.forEach(item => {
            if (item.firstChild.textContent === 'Телефон') {
                validationContact(item, regPhone, 'Ошибка: Неверно введен номер телефона')
            }
            if (item.firstChild.textContent === 'Email') {
                validationContact(item, regEmail, 'Ошибка: Неверно введен Email')
            }
            if (item.firstChild.textContent === 'VK') {
                validationContact(item, regVk, 'Ошибка: Неверно введен адрес страницы "Вконтакте"')
            }
            if (item.firstChild.textContent === 'facebook') {
                validationContact(item, regFacebook, 'Ошибка: Неверно введен адрес страницы "facebook"')
            }
            if (item.firstChild.textContent === 'Другое') {
                if (item.lastChild.previousSibling.value.length < 5) {
                    form.blockErrText.textContent = 'Ошибка: Неверно введен данные контакта "Другое"';
                    item.lastChild.previousSibling.focus();
                    err = true;
                    return;
                }

            }
        });
    }
    if (!form.inputName.value) {
        form.blockErrText.textContent = 'Ошибка: Введите имя';
        form.inputName.focus();
        err = true;
    }
    if (!form.inputSurname.value) {
        form.blockErrText.textContent = 'Ошибка: Введите Фамилию';
        form.inputSurname.focus();
        err = true;
    }

    return err;
}