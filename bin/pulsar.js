const electron = require("electron")

console.log("running...")

// creates a new electron window
const createWindow = () => {
  const frame = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // applies html file to current electron window
  frame.loadFile("src/html/index.html")

  // frame.webContents.openDevTools()
}

electron.app.whenReady().then(createWindow)

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit()
  }
})

electron.app.on('activate', () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
