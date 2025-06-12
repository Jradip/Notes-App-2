import { getAllOfflineStories, deleteOfflineStory } from '../../utils/indexedDb.js';


const FavoritePage = {
  async render() {
    return `
      <section class="halamanFavorit page-enter">
        <h2 class="judul-cerita">Cerita Favorit</h2>
        <div id="listFavorit"></div>
      </section>
    `;
  },

  async afterRender() {
    const daftar = await getAllOfflineStories();
    const kontainer = document.getElementById('listFavorit');

    if (daftar.length === 0) {
      kontainer.innerHTML = '<p>Belum ada cerita favorit tersimpan.</p>';
      return;
    }

    daftar.forEach((cerita) => {
      const elemen = document.createElement('article');
      elemen.classList.add('card-cerita');
      elemen.innerHTML = `
        <h3>👤 ${cerita.name}</h3>
        <p>${cerita.description}</p>
        <button data-id="${cerita.id}" class="btn-hapus">❌ Hapus</button>
      `;

      elemen.querySelector('.btn-hapus').addEventListener('click', async () => {
        await deleteOfflineStory(cerita.id);
        elemen.remove();
        alert('Cerita dihapus dari favorit.');
      });

      kontainer.appendChild(elemen);
    });
  }
};

export default FavoritePage;
