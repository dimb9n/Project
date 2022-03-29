import { svgAdd } from "./svg.js";
import { svgDelete } from "./svg.js";
export const createSectionClients = function () {
    const main = document.createElement('main');
    const sectionClients = document.createElement('section');
    const container = document.createElement('div');
    const headerClients = document.createElement('h1');
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const theadRoad = document.createElement('tr');
    const tbody = document.createElement('tbody');
    const tableContainer = document.createElement('div');
    const buttonAdd = document.createElement('button');

    // const spanAdd = document.createElement('span');
    // spanAdd.classList.add('span-add');
    // buttonAdd.prepend(spanAdd);
    // spanAdd.innerHTML = svgAdd;

    const columId = document.createElement('td');
    const spanId = document.createElement('span');

    const columIdSpan = document.createElement('span');
    const columFullName = document.createElement('td');
    const spanFullName = document.createElement('span');

    const columFullNameSpanAZ = document.createElement('span');
    const columFullNameSpan = document.createElement('span');
    const DataOfCreation = document.createElement('td');
    const spanDataOfCreation = document.createElement('span');

    const DataOfCreationSpan = document.createElement('span');
    const lastСhange = document.createElement('td');
    const spanlastChange = document.createElement('span');

    const lastСhangeSpan = document.createElement('span');
    const contacts = document.createElement('td');
    const spanContacts = document.createElement('span');

    const action = document.createElement('td');
    const spanAction = document.createElement('span');


    headerClients.textContent = 'Клиенты';
    spanId.textContent = 'ID';
    spanFullName.textContent = 'Фамилия Имя Отчество';
    columFullNameSpanAZ.textContent = 'А-Я';
    spanDataOfCreation.textContent = 'Дата и время создания';
    spanlastChange.textContent = 'Последние изменения';
    spanContacts.textContent = 'Контакты';
    spanAction.textContent = 'Действия';
    buttonAdd.innerHTML = `${svgAdd} Добавить клиента`;



    main.classList.add('main');
    sectionClients.classList.add('section-clients');
    container.classList.add('container');
    headerClients.classList.add('header-clients');
    table.classList.add('table-clients');
    tableHeader.classList.add('table-header');
    theadRoad.classList.add('thead-road');
    tbody.classList.add('table-body');
    tableContainer.classList.add('table-container');
    buttonAdd.classList.add('button-add');

    columId.classList.add('thead-cell', 'thead-id');
    columFullName.classList.add('thead-cell', 'thead-full-name');
    DataOfCreation.classList.add('thead-cell', 'thead-data-creation');
    lastСhange.classList.add('thead-cell', 'thead-last-change');
    contacts.classList.add('thead-cell', 'thead-contacts');
    action.classList.add('thead-cell', 'thead-action');

    columIdSpan.classList.add('span-vector', 'id-span');
    columFullNameSpan.classList.add('span-vector', 'full-name-span');
    columFullNameSpanAZ.classList.add('full-name-span-az');
    DataOfCreationSpan.classList.add('span-vector', 'data-span');
    lastСhangeSpan.classList.add('span-vector', 'last-change-span');

    spanId.classList.add('span-client', 'span-client-id');
    spanFullName.classList.add('span-client', 'span-client-fullname');
    spanDataOfCreation.classList.add('span-client', 'span-client-creation');
    spanlastChange.classList.add('span-client', 'span-client-change');
    spanContacts.classList.add('span-client', 'span-client-contacts');
    spanAction.classList.add('span-client', 'span-client-action');


    columId.append(spanId, columIdSpan);
    columFullName.append(spanFullName, columFullNameSpan, columFullNameSpanAZ);
    DataOfCreation.append(spanDataOfCreation, DataOfCreationSpan);
    lastСhange.append(spanlastChange, lastСhangeSpan);
    contacts.append(spanContacts);
    action.append(spanAction)

    theadRoad.append(
        columId,
        columFullName,
        DataOfCreation,
        lastСhange,
        contacts,
        action,
    );

    tableHeader.append(theadRoad);
    table.append(tableHeader, tbody);

    tableContainer.append(table);
    container.append(headerClients, tableContainer);
    sectionClients.append(container, buttonAdd);
    main.append(sectionClients)

    document.body.append(main);


    return {
        tbody,
        theadRoad,
        spanId,
        spanFullName,
        spanDataOfCreation,
        spanlastChange
    }
}