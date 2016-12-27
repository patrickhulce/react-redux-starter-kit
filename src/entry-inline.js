function injectStylesheet(bodyLoadingClass) {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(`
    .${bodyLoadingClass} .preload-spinner {
      margin: 100px auto 0;
      width: 70px;
      text-align: center;
    }

    .${bodyLoadingClass} .preload-spinner > div {
      width: 18px;
      height: 18px;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .${bodyLoadingClass} .preload-spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .${bodyLoadingClass} .preload-spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
    }
  `))
  document.head.appendChild(style)
  return style.sheet
}

function injectRules(sheet, rules) {
  for (const selector in rules) {
    const propKeys = Object.keys(rules[selector])
    const properties = propKeys
      .map(prop => `${prop}: ${rules[selector][prop]}`)
      .join('; ')

    sheet.insertRule(`${selector} { ${properties} }`, -1)
  }
}

module.exports = function bind(options = {}) {
  const loaderColor = options.loaderColor || '#333'
  const backgroundColor = options.backgroundColor || '#fff'
  const bodyLoadingClass = options.bodyLoadingClass || 'bundle-loading'
  const loaderContainerId = options.loaderContainerId || '#bundle-preloader'

  injectRules(injectStylesheet(bodyLoadingClass), {
    [`body.${bodyLoadingClass}`]: {
      'background-color': backgroundColor,
    },
    '.spinner > div': {
      'background-color': loaderColor,
    }
  })

  debugger;
  document.body.classList.addClass(bodyLoadingClass)
  const loaderContainer = document.getElementById(loaderContainerId)
  loaderContainer.innerHTML = `
    <div class="preload-spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  `
}
