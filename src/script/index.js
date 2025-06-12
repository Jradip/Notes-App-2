import '../style/style.css';
import Router from '../utils/router.js';
import {
  isCurrentPushSubscriptionAvailable,
  subscribe,
  unsubscribe
} from '../utils/notification-helper.js';

/**
 * Fungsi untuk mengatur tampilan navigasi berdasarkan status login
 */
function aturNavigasi() {
  const token = localStorage.getItem('token');

  const navHome = document.getElementById('nav-home');
  const navAdd = document.getElementById('nav-add');
  const navFavorite = document.getElementById('nav-favorite');
  const navLogin = document.getElementById('nav-login');
  const navRegister = document.getElementById('nav-register');
  const navLogout = document.getElementById('nav-logout');

  if (token) {
    navHome.style.display = 'inline-block';
    navAdd.style.display = 'inline-block';
    navFavorite.style.display = 'inline-block';
    navLogin.style.display = 'none';
    navRegister.style.display = 'none';
    navLogout.style.display = 'inline-block';
  } else {
    navHome.style.display = 'inline-block';
    navAdd.style.display = 'none';
    navFavorite.style.display = 'none';
    navLogin.style.display = 'inline-block';
    navRegister.style.display = 'inline-block';
    navLogout.style.display = 'none';
  }
}

async function initPushUI() {
  const pushTools = document.getElementById('push-notification-tools');
  if (!pushTools) return;

  const subscribed = await isCurrentPushSubscriptionAvailable();

  pushTools.innerHTML = `
    <button id="notif-button">
      ${subscribed ? 'Unsubscribe' : 'Subscribe'} Notification
    </button>
  `;

  document.getElementById('notif-button').addEventListener('click', async () => {
    if (await isCurrentPushSubscriptionAvailable()) {
      await unsubscribe();
    } else {
      await subscribe();
    }

    await initPushUI();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  console.info('Aplikasi dimuat. Menyiapkan navigasi SPA...');
  Router.mulai();

  // tampilan navigasi
  aturNavigasi();

  // Event logout
  const tombolLogout = document.getElementById('nav-logout');
  if (tombolLogout) {
    tombolLogout.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');

      aturNavigasi();        
      Router.mulai();        
      window.location.hash = '/login';
    });
  }

  await initPushUI();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.bundle.js')
      .then(reg => console.log('✅ Service Worker terdaftar:', reg))
      .catch(err => console.error('❌ Service Worker gagal:', err));
  });
}
