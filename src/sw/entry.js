/* eslint-env serviceworker */

const VERSION = '1'

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      'index.html',
      'app.js',
    ])
  }))
})

self.addEventListener('fetch', e => {
  const tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      return response || handleNoCacheMatch(e)
    })
  })
  e.respondWith(tryInCachesFirst)
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => {
    const invalidKeys = keys.filter(key => key !== VERSION)
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
