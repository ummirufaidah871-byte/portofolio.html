// Simulasi: login dulu -> baru boleh kirim pesan (tanpa database)
const loginForm = document.getElementById('loginForm');
const messageForm = document.getElementById('messageForm');
const loginPanel = document.getElementById('loginPanel');
const messagePanel = document.getElementById('messagePanel');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

// Tandai input valid / tidak valid, lalu tampilkan pesan kesalahannya
function setState(input, valid, text) {
  input.classList.toggle('is-valid', valid);
  input.classList.toggle('is-invalid', !valid);
  if (!valid) input.nextElementSibling.textContent = text;
  return valid;
}

function showAlert(id, type, text) {
  document.getElementById(id).innerHTML =
    `<div class="alert alert-${type}" role="alert">${text}</div>`;
}

// ----- Validasi login -----
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();                       // form tidak dikirim ke server

  const emailValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let emailOk;
  if (emailValue === '') emailOk = setState(email, false, 'Email tidak boleh kosong.');
  else if (!emailPattern.test(emailValue)) emailOk = setState(email, false, 'Format email tidak valid.');
  else emailOk = setState(email, true);

  let passOk;
  if (password.value === '') passOk = setState(password, false, 'Password tidak boleh kosong.');
  else if (password.value.length < 8) passOk = setState(password, false, 'Password minimal 8 karakter.');
  else passOk = setState(password, true);

  if (emailOk && passOk) {
    // login "berhasil": ganti panel login dengan panel kirim pesan
    document.getElementById('userName').textContent = emailValue.split('@')[0];
    loginPanel.classList.add('d-none');
    messagePanel.classList.remove('d-none');
  } else {
    showAlert('loginAlert', 'danger', 'Login gagal. Periksa input yang berwarna merah.');
  }
});

// ----- Validasi pesan -----
messageForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (message.value.trim().length < 10) {
    setState(message, false, 'Pesan minimal 10 karakter.');
    showAlert('messageAlert', 'danger', 'Pesan belum terkirim.');
    return;
  }
  setState(message, true);
  showAlert('messageAlert', 'success', 'Pesan terkirim! Terima kasih sudah menghubungi.');
  message.value = '';
  message.classList.remove('is-valid');
});

// ----- Logout: kembali ke panel login -----
document.getElementById('logoutBtn').addEventListener('click', function () {
  messagePanel.classList.add('d-none');
  loginPanel.classList.remove('d-none');
  loginForm.reset();
  messageForm.reset();
  document.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
  document.getElementById('loginAlert').innerHTML = '';
  document.getElementById('messageAlert').innerHTML = '';
});