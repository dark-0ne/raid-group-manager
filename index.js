const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

const fs = require("fs")

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('index.html')

  // Build and set menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
}

function createLoginWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 225,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('login.html')
  win.setResizable(false)

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
  if (!fs.existsSync("credintials")) {
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