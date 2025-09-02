window.onload = init;
function init() {
  if(localStorage.getItem('token')) {
    token = localStorage.getItem('token');
    document.querySelector('.btn-signin').addEventListener('click', signin);
    document.querySelector('.btn-deleteUser').addEventListener('click', deleteUser);
    
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            window.location.href = 'main.html';
        });
        const saveBtn = document.querySelector('.btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', modifyUser);
        } else {
            console.warn("Botón .btn-save no encontrado");
        }
    }
    } else {
        window.location.href = 'index.html';
    }
}

function signin() {
  window.location.href = 'signin.html'
}

function deleteUser() {
  window.location.href = 'deleteUser.html'
}

function modifyUser() {
  const userId = document.getElementById('input-userId').value;
  const name = document.getElementById('input-name').value.trim();
  const lastName = document.getElementById('input-lastName').value.trim();
  const email = document.getElementById('input-mail').value.trim();
  const phoneNumber = document.getElementById('input-phoneNumber').value.trim();
  const address = document.getElementById('input-address').value.trim();

  const dataToUpdate = {};
  if (name) dataToUpdate.name = name;
  if (lastName) dataToUpdate.lastName = lastName;
  if (email) dataToUpdate.email = email;
  if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;
  if (address) dataToUpdate.address = address;

  if (!userId || Object.keys(dataToUpdate).length === 0) {
    alert("Please provide user ID and at least one field to update.");
    return;
  }

  axios.patch(`http://localhost:3000/user/${userId}`, dataToUpdate, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(res => {
    if (res.data.code === 200) {
      alert("User successfully modified");
      window.location.href = 'modifyUser.html';
    } else {
      alert("Failed to update user: " + res.data.message);
    }
  }).catch(err => {
    console.error(err);
    alert("An error occurred while updating the user.");
  });
}