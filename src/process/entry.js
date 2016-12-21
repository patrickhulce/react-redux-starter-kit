import {app, BrowserWindow} from 'electron'

let __DEV__ = process.env.NODE_ENV === 'dev'
let mainWindow = null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function installExtensions() {
  if (__DEV__) {
    require('electron-debug')({showDevTools: true})

    const installer = require('electron-devtools-installer')
    const forceDownload = Boolean(process.env.UPGRADE_EXTENSIONS)
    return Promise.all([
      installer.default(installer.REACT_DEVELOPER_TOOLS, forceDownload),
      installer.default(installer.REDUX_DEVTOOLS, forceDownload),
    ])
  } else {
    return Promise.resolve()
  }
}

function setupMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  })

  mainWindow.loadURL(`file://${__dirname}/../../index.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()

    if (__DEV__) {
      require('devtron').install()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  return installExtensions()
    .then(setupMainWindow)
})
