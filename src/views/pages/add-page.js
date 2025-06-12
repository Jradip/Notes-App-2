import AddStoryPresenter from '../../presenter/AddStoryPresenter.js';
import { initMap, getSelectedLocation } from '../../utils/location.js';

let streamKamera = null;

function matikanKamera() {
  const video = document.getElementById('kameraLive');
  const btnCapture = document.getElementById('ambilFoto');
  const btnStop = document.getElementById('matikanKamera');
  const btnStart = document.getElementById('mulaiKamera');
  const fileInput = document.getElementById('image');

  if (streamKamera) {
    streamKamera.getTracks().forEach(track => track.stop());
    streamKamera = null;
  }

  if (video) video.srcObject = null;
  if (video) video.style.display = 'none';
  if (btnCapture) btnCapture.style.display = 'none';
  if (btnStop) btnStop.style.display = 'none';
  if (btnStart) btnStart.style.display = 'block';
  if (fileInput) fileInput.style.display = 'block';
}

const AddStory = {
  async render() {
    return `
      <section class="halamanTambahCerita page-enter">
        <h2 class="judul-cerita">Tambah Cerita Baru</h2>
        <form id="formCerita">
          <label for="description">Deskripsi:</label>
          <textarea id="description" required></textarea>

          <label for="kameraLive">Ambil Gambar:</label>
          <video id="kameraLive" autoplay style="display: none;"></video>
          <canvas id="kanvas" style="display: none;"></canvas>
          <img id="pratinjauFoto" alt="Preview Foto" style="display: none; max-width: 100%;">

          <button type="button" id="mulaiKamera">Buka Kamera</button>
          <button type="button" id="ambilFoto" style="display: none;">Ambil Foto</button>
          <button type="button" id="matikanKamera" style="display: none;">Matikan Kamera</button>

          <label for="image">Atau Pilih Gambar:</label>
          <input id="image" type="file" accept="image/*">

          <div id="map" style="height: 300px;"></div>
          <label for="latInput">Latitude:</label>
          <input id="latInput" type="text" readonly>
          <label for="lngInput">Longitude:</label>
          <input id="lngInput" type="text" readonly>

          <button type="submit">Kirim Cerita</button>
        </form>
      </section>
    `;
  },

  async afterRender() {
    initMap();
    const presenter = new AddStoryPresenter(this);

    const video = document.getElementById('kameraLive');
    const canvas = document.getElementById('kanvas');
    const preview = document.getElementById('pratinjauFoto');
    const btnStart = document.getElementById('mulaiKamera');
    const btnCapture = document.getElementById('ambilFoto');
    const btnStop = document.getElementById('matikanKamera');
    const fileInput = document.getElementById('image');

    let gambarTertangkap = null;

    async function mulaiKamera() {
      try {
        streamKamera = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = streamKamera;

        await new Promise(resolve => {
          video.onloadedmetadata = () => resolve();
        });

        video.play();
        video.style.display = 'block';
        btnCapture.style.display = 'block';
        btnStop.style.display = 'block';
        btnStart.style.display = 'none';
        fileInput.style.display = 'none';
      } catch (err) {
        alert('Tidak bisa mengakses kamera.');
        console.error(err);
      }
    }

    function ambilFoto() {
      if (!video.videoWidth || !video.videoHeight) {
        alert('Kamera belum siap.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (!blob) {
          alert('Gagal mengambil foto.');
          return;
        }

        gambarTertangkap = blob;
        preview.src = URL.createObjectURL(blob);
        preview.style.display = 'block';
        preview.classList.add('show');
      }, 'image/png');

      matikanKamera();
    }

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        gambarTertangkap = file;
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
      }
    });

    document.getElementById('formCerita').addEventListener('submit', async (e) => {
      e.preventDefault();
      const lokasi = getSelectedLocation();
      const token = localStorage.getItem("token");
      const deskripsi = document.getElementById('description').value;

      if (!lokasi || !lokasi.lat || !lokasi.lng) {
        alert('Pilih lokasi dulu.');
        return;
      }

      if (!gambarTertangkap) {
        alert('Ambil atau pilih gambar dulu.');
        return;
      }

      presenter.submitStory({
        description: deskripsi,
        photo: gambarTertangkap,
        lat: lokasi.lat,
        lon: lokasi.lng,
        token: token
      });
    });

    btnStart.addEventListener('click', mulaiKamera);
    btnCapture.addEventListener('click', ambilFoto);
    btnStop.addEventListener('click', matikanKamera);
  },

  showSuccess(message) {
    alert(message);
  },

  showError(message) {
    alert(message);
  }
};

export { matikanKamera };
export default AddStory;
