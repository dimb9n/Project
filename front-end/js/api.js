export const createClient = async function (client) {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(client),
    });
}

export const patchClient = async function (client, id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        headers: { 'content-Type': 'appLication/json' },
        body: JSON.stringify(client),
    })

}

export const getClients = async function () {
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
        headers: { 'content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
}

export const getClient = async function (id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'GET',
        headers: { 'content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
}

export const deleteClients = async function (id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
        headers: { 'content-Type': 'application/json' }
    })
}

export const serchClient = async function (search) {
    const response = await fetch(`http://localhost:3000/api/clients?search=${search}`, {
        method: 'GET',
        headers: { 'content-Type': 'application/json' },
    })
    const data = await response.json();
    return data;
}

export const searchParam = function () {
    const locationSerch = new URLSearchParams(window.location.search);
    const getLocationSerch = locationSerch.get('id');
    return getLocationSerch;
}
