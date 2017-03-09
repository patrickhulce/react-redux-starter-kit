function register() {
  if (__HOT__) {
    console.warn('ServiceWorker not supported by HMR, turn off hot reloading to enable')
  } else if (__PROD__ || localStorage.getItem('__forcesw__')) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }).catch(function (err) {
      console.log('ServiceWorker registration failed: ', err)
    })
  } else {
    console.log('Skipping service worker registration, enable by setting localStorage[__forcesw__]')
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', register)
}
