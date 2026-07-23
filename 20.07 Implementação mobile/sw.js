// Modelo inicial do service worker para copiar e completar.
// Complete cada TODO durante a atividade.

const NOME_DO_CACHE = '';

// TODO: acrescente somente caminhos de arquivos que já existem no projeto.
const ARQUIVOS_DO_APP = [
  './',
  './index.html',
  './Bebidas.html',
  './BoloFatia.html',
  './BoloPote.html',
  './js/script.js',
  './manifest.webmanifest',
  './img/BoloFatiaChocolate.png',
  './img/BoloFatiaMaracuja.png',
  './img/BoloFatiaBemCasado.webp',
  './img/BoloFatiaRedVelt.png',
  './img/BoloPoteRedVelt.png',
  './img/BoloPoteNutellaNinhoMorango.png',
  './img/BoloPoteAbacaxiDoceLeite.png',
  './img/BoloPoteChocolate.png',
  './img/BoloPoteBrigadeiroMorango.png',
  './img/BoloPoteNinho.png',
  './img/BoloPoteAbacaxiNinhoDuplo.png',
  './img/BoloPoteFrutasVermelhasNinhoDuplo.png',
  './img/BoloPoteMorangoNinho.png',
  './img/BebidaSucoPolpa.jpg',
  './img/BebidaSucoNatural.jpg',
  './img/BebidaRefri.png',
  './css/style.css',
];

self.addEventListener('install', function (evento) {
  // TODO: abra o cache e salve ARQUIVOS_DO_APP com cache.addAll().
  console.log('Service worker instalado.');
});

self.addEventListener('activate', function (evento) {
  // TODO: remova caches cujo nome seja diferente de NOME_DO_CACHE.
  console.log('Service worker ativado.');
});

self.addEventListener('fetch', function (evento) {
  // TODO: procure a solicitação no cache e use a rede como alternativa.
});
