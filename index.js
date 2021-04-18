const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
    }
  })

  win.loadFile('index.html')

  // Build and set menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}
// Create Menu Template
const mainMenuTemplate = [{
  label: "File",
  submenu: [{
    label: "Quit",
    accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
    click() {
      app.quit()
    }
  }]
}]

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [{
        role: "reload"
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      },
    ]
  })
}

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