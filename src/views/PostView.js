import { saveStoryOffline } from '../utils/indexedDb';

class PostView {
  constructor(elemenTarget, idPeta) {
    this.kontainer = elemenTarget;
    this.idPeta = idPeta;
  }

  renderStories(daftarCerita) {
    this.kontainer.innerHTML = '';

    daftarCerita.forEach((cerita) => {
      const waktuFormat = new Date(cerita.createdAt).toLocaleString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const elemenCerita = document.createElement('article');
      elemenCerita.classList.add('card-cerita');
      elemenCerita.innerHTML = `
        <header>
          <h3 class="nama-user">👤 ${cerita.name}</h3>
          <time class="tanggal-post">🕒 ${waktuFormat}</time>
        </header>
        <p class="deskripsi-cerita">${cerita.description}</p>
        <figure>
          <img src="${cerita.photoUrl}" alt="Foto oleh ${cerita.name}" loading="lazy" />
        </figure>
      `;
     const tombolSimpan = document.createElement('button');
    tombolSimpan.textContent = '⭐ Simpan';
    tombolSimpan.addEventListener('click', () => {
      saveStoryOffline(cerita);
      alert('Cerita disimpan ke favorit!');
    });
    elemenCerita.appendChild(tombolSimpan); 

    this.kontainer.appendChild(elemenCerita); 
  });

  this.tampilkanPeta(daftarCerita);
}

  renderError(pesanKesalahan) {
    this.kontainer.innerHTML = `
      <div class="error-message">
        ⚠️ ${pesanKesalahan}
      </div>
    `;
  }

  tampilkanPeta(daftarCerita) {
  const petaContainer = document.getElementById(this.idPeta);
  if (!petaContainer) {
    console.warn('🗺️ Kontainer peta tidak ditemukan.');
    return;
  }

  if (L.DomUtil.get(this.idPeta) != null) {
    L.DomUtil.get(this.idPeta)._leaflet_id = null;
  }

  const peta = L.map(this.idPeta).setView([-2.5, 118.0], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Data © OpenStreetMap contributors',
  }).addTo(peta);

  daftarCerita.forEach((cerita) => {
    if (cerita.lat && cerita.lon) {
      const marker = L.marker([cerita.lat, cerita.lon]).addTo(peta);
      marker.bindPopup(`
        <strong>${cerita.name}</strong><br>${cerita.description}
      `);
    }
  });
}

}

export default PostView;
