import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Squirrel from 'electron-squirrel-startup';

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// 在安装/卸载时在 Windows 上创建/删除快捷方式
if (Squirrel) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    minWidth: 600,
    height: 400,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,
    icon: 'public/icon/icon.png',
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('window-minimize', async () => {
  mainWindow.minimize();
});
ipcMain.handle('window-maximize', async () => {
  const isMaximized = mainWindow.isMaximized();

  isMaximized ? mainWindow.unmaximize() : mainWindow.maximize();

  return !isMaximized;
});
ipcMain.handle('window-close', async () => {
  mainWindow.close();
});
