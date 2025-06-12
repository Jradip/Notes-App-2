import UserData from '../data/UserData.js';

class RegisterPresenter {
  constructor(view) {
    this.view = view;
    this.api = new UserData('https://story-api.dicoding.dev/v1');
  }

  async handleRegister(name, email, password) {
    if (!name || !email || !password) {
      this.view.showMessage('Semua kolom wajib diisi.', 'red');
      return;
    }

    try {
      await this.api.register(name, email, password);
      this.view.showMessage('✅ Registrasi berhasil. Anda akan diarahkan ke halaman login.', 'green');
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 1000);
    } catch (err) {
      this.view.showMessage('❌ Gagal daftar: ' + err.message, 'red');
    }
  }
}

export default RegisterPresenter;
