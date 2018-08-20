//Ardublockly
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const root = app.getAppPath();


let mainWindow

function createWindow() {
  // Create the browser window.
  //1 233 × 925
  mainWindow = new BrowserWindow({ width: 1400, height: 925, icon: root + '\\logo.ico' });
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })


  initIpc();
}



function initIpc() {
  ipc.on('get-json', function (event, path, flag, keyA, keyB) {
    jsonResponse = jsonManager.readJson(path);
    event.sender.send('get-json-response', JSON.stringify(jsonResponse), flag, keyA, keyB);
  });

  ipc.on('add-json-element', function (path, jsonElement) {
    jsonElement = JSON.parse(jsonElement)
    rawJson = jsonManager.readJson(path);
    newJson = rawJson;
    for (objectKey in jsonElement) {
      if (rawJson[objectKey] == null){
        rawJson[objectKey] = jsonElement[objectKey];
      }
    }
    if(newJson != rawJson){
      jsonManager.saveJson(path, newJson);
    }
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})



var jsonManager = {};

jsonManager.readJson = function (path) {
  fs = require('fs');
  var content = null;
  spath = app.getAppPath() + '/' + path;
  try {
    content = fs.readFileSync(spath, 'utf-8')
  } catch (error) {
    console.log(error);
  }

  json = JSON.parse(content);
  return json;
}


jsonManager.saveJson = function (path, json) {
  fs = require('fs');
  spath = app.getAppPath() + '/' + path;
  try {
    fs.writeFile(spath, JSON.stringify(json), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
  }
}
