const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain;

Menu = require("menu");

function setupMenus(callbacks) {
  const template = [
    {
        label: 'File',
        submenu: [
          {
            label: 'New Project',
            accelerator: 'CmdOrCtrl+N',
            click: callbacks.new
          },
          {
            label: 'New Included Ink File',
            accelerator: 'CmdOrCtrl+Alt+N',
            click: callbacks.newInclude
          },
          {
            type: 'separator'
          },
          {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click: callbacks.open
          },
          {
            type: 'separator'
          },
          {
            label: 'Save Project',
            accelerator: 'CmdOrCtrl+S',
            enabled: callbacks.isFocusedWindow,
            click: callbacks.save
          },
          {
            label: 'Export to JSON...',
            accelerator: 'CmdOrCtrl+Shift+S',
            enabled: callbacks.isFocusedWindow,
            click: callbacks.exportJson
          },
          {
            label: 'Export for web...',
            enabled: callbacks.isFocusedWindow,
            click: callbacks.exportForWeb
          },
          {
            type: 'separator'
          },
          {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            enabled: callbacks.isFocusedWindow,
            click: callbacks.close
          }
        ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        },
      ]
    },
    {
      label: 'Story',
      submenu: [
        {
          label: 'Next Issue',
          accelerator: 'CmdOrCtrl+.',
          click: callbacks.nextIssue
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { 
            inklecate("hello world");
          }
        },
      ]
    },
  ];

  if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        },
      ]
    });
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

exports.setupMenus = setupMenus;