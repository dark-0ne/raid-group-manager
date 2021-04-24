const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

const fs = require("fs")
const {
  ipcMain
} = require('electron')

var loginWindow
var mainWindow


function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.setResizable(false)

  // Build and set menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 350,
    height: 250,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  loginWindow.loadFile('login.html')
  loginWindow.setResizable(false)

  // Build and set menu
  const loginMenu = Menu.buildFromTemplate(loginMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(loginMenu);
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

const loginMenuTemplate = [{
  label: ""
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
  loginMenuTemplate.push({
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
  if (!fs.existsSync("credentials")) {
    createLoginWindow()
  } else {
    createMainWindow()
  }

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

ipcMain.handle('after-login', (event) => {
  createMainWindow()
  loginWindow.close()
})

ipcMain.handle('show-login', (event) => {
  createLoginWindow()
  mainWindow.close()
})

ipcMain.handle('open-armory', (event, link) => {

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
  })

  win.loadURL(link)

  // Build and set menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
})

ipcMain.handle('main-load-characters', (event) => {
  mainWindow.loadFile("characters.html")
})

ipcMain.handle('exit-app', (event) => {
  app.quit()
})