///<reference path="./view/FilteredImageView"/>
///<reference path="./io/reference"/>
///<reference path="./view/reference"/>

import LocalImageLoaderView = require("./view/io/localImageLoader/LocalImageLoaderView");

interface CanvasAppConfig{
    localImageLoaderView: HTMLElement;
}
declare var CanvasAppConfig: CanvasAppConfig;

window.addEventListener("load", ()=> {
    var config = CanvasAppConfig;
    var localImageLoaderView = new LocalImageLoaderView(config.localImageLoaderView);
    localImageLoaderView.open().then((img: HTMLImageElement)=>{
        console.log(img);
    }, (error)=>{
        console.log(error);
    });
});
