window.onload = init;
function init() {
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        document.querySelector('.btn-cancel').addEventListener('click', function(){
            window.location.href = 'main.html';
        });
        document.querySelector('.btn-add').addEventListener('click', signin);
        
    }
    else {
        window.location.href = 'index.html';
    }
}

function signin() {
    axios.post('http://localhost:3000/user/signin', {
        name: document.getElementById('input-name').value,
        lastName: document.getElementById('input-lastName').value,
        phoneNumber: document.getElementById('input-phoneNumber').value,
        address: document.getElementById('input-address').value,
        email: document.getElementById('input-mail').value
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function(res) {
        if(res.data.code == 201){
            alert("Successfully registered user");
            window.location.href = 'signin.html';
        }
    }).catch(function(err) {
        console.log(err);
        alert("An error occurred");
    });
    
}