///<reference path="./view/reference"/>

import App = require("./view/AppController");

declare var CanvasAppConfig: App.CanvasAppConfig;

declare var AppController: App.AppController;
window.addEventListener("load", ()=> {
    AppController = new App.AppController(CanvasAppConfig);
    AppController.start();
});
