// Service worker do app — guarda os arquivos para abrir offline.
const NOME_DO_CACHE = 'atelie-acucar-v1';

// Somente caminhos de arquivos que existem no projeto.
const ARQUIVOS_DO_APP = [
  './',
  './index.html',
  './Bebidas.html',
  './BoloFatia.html',
  './BoloPote.html',
  './style.css',
  './script.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Na instalação, abrimos o cache e guardamos todos os arquivos.
self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(NOME_DO_CACHE).then(function (cache) {
      return cache.addAll(ARQUIVOS_DO_APP);
    })
  );
});

// Na ativação, removemos caches antigos com nome diferente.
self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(
        nomes.map(function (nome) {
          if (nome !== NOME_DO_CACHE) {
            return caches.delete(nome);
          }
        })
      );
    })
  );
});

// Quando o app pede um arquivo, usamos primeiro a cópia guardada.
self.addEventListener('fetch', function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (respostaGuardada) {
      if (respostaGuardada) {
        return respostaGuardada;
      } else {
        return fetch(evento.request);
      }
    })
  );
});
