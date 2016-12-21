var VERSION = '1'

this.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      'index.html',
      'app.js',
      'sw.js',
    ])
  }))
})

this.addEventListener('fetch', function (e) {
  var tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      return response || handleNoCacheMatch(e)
    })
  })
  e.respondWith(tryInCachesFirst)
})

this.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(keys => {
    var invalidKeys = keys.filter(key => key !== VERSION)
    return Promise.all(invalidKeys.map(key => caches.delete(key)))
  }))
})

function handleNoCacheMatch(e) {
  return fetch(e.request).then(res => {
    return caches.open(VERSION).then(cache => {
      cache.put(e.request, res.clone())
      return res
    })
  })
}
