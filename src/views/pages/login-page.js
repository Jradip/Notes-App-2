import LoginPresenter from '../../presenter/LoginPresenter.js';

const LoginPage = {
  async render() {
    return `
      <section id="formLogin" class="form-section">
        <h2 class="judul-cerita">Masuk ke Akun Anda</h2>
        <form id="formMasuk">
          <div class="form-group">
            <label for="inputEmail">Alamat Email:</label>
            <input type="email" id="inputEmail" placeholder="Alamat Email" required />
          </div>
          <div class="form-group">
            <label for="inputPassword">Kata Sandi:</label>
            <input type="password" id="inputPassword" placeholder="Kata Sandi" required />
          </div>
          <div class="form-group">
            <button type="submit" class="btn-login">Masuk</button>
          </div>
          <div id="pesanLogin" class="info-message"></div>
        </form>
      </section>
    `;
  },

  async afterRender() {
    const pesan = document.getElementById('pesanLogin');
    const presenter = new LoginPresenter(this, 'https://story-api.dicoding.dev/v1');

    const form = document.getElementById('formMasuk');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('inputEmail').value;
      const password = document.getElementById('inputPassword').value;
      presenter.prosesLogin(email, password);
    });
  },

  tampilkanPesan(teks, warna) {
  const pesan = document.getElementById('pesanLogin');
  if (pesan) {
    pesan.textContent = teks;
    pesan.style.color = warna || 'red';
  }
}
};

export default LoginPage;
