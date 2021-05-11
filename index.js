const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

const fs = require("fs")

require('dotenv').config()

const {
  ipcMain
} = require('electron')

const {
  exception
} = require('console')

let loginWindow, mainWindow, raidWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    frame: false,
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

if (process.env.NODE_ENV === "development") {
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
  if (process.env.NODE_ENV !== "development" && process.env.PROD_DB_PASSWORD == undefined) {
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

ipcMain.handle('main-load-raids', (event) => {
  mainWindow.loadFile("raids.html")
})

ipcMain.handle('confirm-discard', async (event, address) => {
  confirmWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  confirmWindow.loadFile('confirm.html')

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  // Build and set menu
  const loginMenu = Menu.buildFromTemplate(loginMenuTemplate);
  // Insert menu
  confirmWindow.setMenu(loginMenu);
  confirmWindow.setResizable(false)
  await sleep(1500)
  confirmWindow.webContents.send('return-address', address);

})

ipcMain.handle("discard-confirmed", (event, address) => {
  mainWindow.loadFile(address)
})

ipcMain.handle('create-add-to-raid-window', async (event, payload) => {
  try {
    raidWindow.focus()
  } catch (err) {
    raidWindow = new BrowserWindow({
      width: 900,
      height: 500,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    raidWindow.loadFile('addToRaid.html')

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    // Build and set menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    raidWindow.setMenu(mainMenu);
    raidWindow.setResizable(false)
    await sleep(300)
    raidWindow.webContents.send('current-chars-in-raid', payload);

  }
})

ipcMain.handle('add-char-to-raid', (event, payload) => {
  mainWindow.webContents.send('add-char-to-raid', payload);
})

ipcMain.handle('exit-app', (event) => {
  app.quit()
})


if (process.env.NODE_ENV === "development") {
  const password = process.env.DEV_DB_PASSWORD
  const uri = "mongodb+srv://rgm-app-dev:" + password + "@cluster0.o0xx5.mongodb.net/rgm-dev?retryWrites=true&w=majority"
  process.env.RGM_DB_URI = uri
  process.env.RGM_DB_NAME = "rgm-dev"
} else if (process.env.NODE_ENV === "production") {
  const password = process.env.PROD_DB_PASSWORD
  const uri = "mongodb+srv://rgm-app-prod:" + password + "@cluster0.o0xx5.mongodb.net/raid-prod?retryWrites=true&w=majority"
  process.env.RGM_DB_URI = uri
  process.env.RGM_DB_NAME = "rgm-prod"
}