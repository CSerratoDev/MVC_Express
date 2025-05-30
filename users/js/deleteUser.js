window.onload = init;
function init() {
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        document.querySelector('.btn-cancel').addEventListener('click', function(){
            window.location.href = 'main.html';
        });
        document.querySelector('.btn-delete').addEventListener('click', userDelete);
        
    }
    else {
        window.location.href = 'index.html';
    }
}

function userDelete() {
    axios.delete(`http://localhost:3000/user/${document.getElementById('input-userId').value}`, 
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(function(res) {
        if(res.data.code == 200){
            alert("User successfully deleted");
            window.location.href = 'deleteUser.html';
        }
    }).catch(function(err) {
        alert("An error occurred");
    });
}