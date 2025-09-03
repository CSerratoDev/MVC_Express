window.onload = init;
function init() {
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        document.querySelector('.btn-signin').addEventListener('click', signin);
        document.querySelector('.btn-deleteUser').addEventListener('click', deleteUser);
        document.querySelector('.btn-modify').addEventListener('click', modifyUser);
        document.querySelector('.btn-search').addEventListener('click', printUser);
        document.querySelector('.btn-exit').addEventListener('click', logOut);
    }
    else {
        window.location.href = 'index.html';
    }
}

function signin() {
    window.location.href = 'signin.html';
}

function deleteUser() {
    window.location.href = 'deleteUser.html';
}

function modifyUser() {
    window.location.href = 'modifyUser.html';
}

function printUser() {
    window.location.href = 'printUsers.html';
}

function logOut() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}