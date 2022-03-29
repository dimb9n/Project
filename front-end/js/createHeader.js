export const createHeader = function () {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const logoHref = document.createElement('a');
    const logoImg = document.createElement('img');
    const form = document.createElement('form');
    const blockSearch = document.createElement('div');
    const inputSerch = document.createElement('input');
    const blockSearchAutoComplete = document.createElement('div');
    const listAutoComplete = document.createElement('ul');
    const btnTypeSearch = document.createElement('button');

    header.classList.add('header');
    container.classList.add('container-header');
    logoHref.classList.add('logo-href');
    logoImg.classList.add('logo-img');
    inputSerch.classList.add('input-serch');
    form.classList.add('serch-form');
    blockSearch.classList.add('block-search');
    blockSearchAutoComplete.classList.add('block-search-auto-complete');
    listAutoComplete.classList.add('list-auto-complete');
    btnTypeSearch.classList.add('btn-type-search');



    logoImg.src = './img/logo.svg';
    logoImg.alt = 'logo skb.';
    inputSerch.placeholder = 'Введите запрос';
    logoHref.href = 'index.html';
    btnTypeSearch.textContent = 'OFF';

    logoHref.append(logoImg);
    blockSearchAutoComplete.append(listAutoComplete)
    blockSearch.append(inputSerch, btnTypeSearch, blockSearchAutoComplete)
    form.append(blockSearch);
    container.append(logoHref, form);
    header.append(container);
    document.body.append(header);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    return header;
}




