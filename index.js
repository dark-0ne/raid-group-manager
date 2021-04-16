const { app, BrowserWindow, Menu} = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()

  // Build and set menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplace)
  Menu.setApplicationMenu(mainMenu)

}

// Create Menu Template
const mainMenuTemplace = [
  {
    label: "File"
  }
]

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
