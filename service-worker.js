const VERSAO = 'guia-enchentes-v1.5';  // Nova versão com dados oficiais e alerta por SMS
const ARQUIVOS = [
  './',
  './index.html',
  './estilo.css',
  './manifest.json'
];

// Salva todos os arquivos no cache na primeira visita
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSAO).then(cache => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

// Usa o cache primeiro se não tiver internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resposta => resposta || fetch(e.request))
  );
});

// Apaga versões antigas quando atualizar
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(nomes => {
      return Promise.all(
        nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))
      );
    })
  );
  self.clients.claim();
});