window.onload = init;
function init() {
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login() {
    var email = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;

    axios({
        method : 'post',
        url: 'http://localhost:3000/admin/login',
        data: {
            email: email,
            password: password
        }
    }).then(function(res) {
        if(res.data.code == 200){
            localStorage.setItem('token', res.data.message);
            window.location.href = 'main.html';
        }
    }).catch(function(err) {
        console.log(err);
        alert("Incorrect Username/Password");
    });
}