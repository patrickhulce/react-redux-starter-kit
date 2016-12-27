function register() {
  if (__HOT__) {
    console.warn('ServiceWorker not supported by HMR, turn off hot reloading to enable')
  } else {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }).catch(function (err) {
      console.log('ServiceWorker registration failed: ', err)
    })
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', register)
}
