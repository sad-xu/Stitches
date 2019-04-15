'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'

const path = require('path')
const os = require('os')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`



// 初始化浏览器窗口
function createWindow () {
  console.log('createWindow...')
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    icon: path.join(__static, 'icon.png'),
    resizable: false,         //禁止调整大小
    fullscreenable: false,    // 禁止全屏
    frame: false,             // 无边框
    titleBarStyle: 'hidden',  // mac保留红绿灯
    backgroundColor: '#2F384B',
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

/**
 * 主进程生命周期
 * 
 */
// 初始化触发 
app.on('ready', () => {
  if (process.env.NODE_ENV === 'development') { // 开发环境下vue-devtools
    BrowserWindow.addDevToolsExtension('C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.0.9_0')
  }
  createWindow()
})

// 所有窗口都关闭时触发
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用被激活时触发 *mac
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
