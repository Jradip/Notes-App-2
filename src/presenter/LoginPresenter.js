import UserData from '../data/UserData.js';

class LoginPresenter {
  constructor(view, apiEndpoint) {
    this.view = view;
    this.model = new UserData(apiEndpoint);
  }

  async prosesLogin(email, password) {
    if (!email || !password) {
      this.view.tampilkanPesan('Email dan kata sandi wajib diisi.', 'red');
      return;
    }

    try {
      const hasil = await this.model.login(email, password);
      const { token, userId, name } = hasil.loginResult;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('name', name);

      const navFavorite = document.getElementById('nav-favorite');
      if (navFavorite) {
        navFavorite.style.display = 'inline-block';
      }

      this.view.tampilkanPesan('Berhasil masuk. Mengalihkan...', 'green');

      setTimeout(() => {
        window.location.hash = '/';
      }, 800);

    } catch (err) {
      this.view.tampilkanPesan('Login gagal: ' + err.message, 'red');
    }
  }
}

export default LoginPresenter;
