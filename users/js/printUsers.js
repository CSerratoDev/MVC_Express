window.onload = init;
function init() {
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        document.querySelector('.btn-search').addEventListener('click', searchUser);
        document.querySelector('.btn-print').addEventListener('click', printAll);
        document.querySelector('.btn-cancel').addEventListener('click', function(){
            document.querySelector('#search-section').classList.add('hidden');
            document.querySelector('.card-container').classList.remove('hidden');
        });
    }
    else {
        window.location.href = 'index.html';
    }
}

function printAll() {
    axios.get('http://localhost:3000/user/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function(res) {
        if(res.data.code == 200){
            showResultsSection();
            DisplayUsers(res.data.message);
        }
    }).catch(function(err) {
        console.log(err);
        alert("An error occurred");
    });
    
}

function searchUser(){
    var name = document.getElementById('input-name').value;
    axios.get(`http://localhost:3000/user/${name}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function(res) {
        if(res.data.code == 200){
            showResultsSection();
            DisplayUsers(res.data.message);
        }
    }).catch(function(err) {
        console.log(err);
        alert("An error occurred");
    });
}

function showResultsSection() {
    document.querySelector('.card-container').classList.add('hidden');
    document.querySelector('#search-section').classList.remove('hidden');
}

function DisplayUsers(user){
    var body = document.querySelector('#Tbody');
    body.innerHTML = '';
    var html = `<center><h1>Empleados</h1></center>`;
    html += `<table border="1" cellpadding="5" cellspacing="0" style="width: 100%; text-align: left;">`;
    html += `<tr>`;
    html += `<th>userId</th>`;
    html += `<th>Name</th>`;
    html += `<th>Last Name</th>`;
    html += `<th>Email</th>`;
    html += `<th>Phone Number</th>`;
    html += `<th>Addres</th>`;
    html += `</tr>`;
    for (var i = 0; i < user.length; i++) {
        html += `<tr>`;
        html += `<td>${user[i].userId}</td>`;
        html += `<td>${user[i].name}</td>`;
        html += `<td>${user[i].lastName}</td>`;
        html += `<td>${user[i].email}</td>`;
        html += `<td>${user[i].phoneNumber}</td>`;
        html += `<td>${user[i].address}</td>`;
        html += `</tr>`;
    }
    html += `</table>`;
    body.innerHTML = html;
}
