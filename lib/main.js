///<reference path="./view/FilteredImageView"/>
///<reference path="./io/reference"/>
///<reference path="./view/reference"/>
define(["require", "exports", "./view/io/localImageLoader/LocalImageLoaderView"], function (require, exports, LocalImageLoaderView) {
    window.addEventListener("load", function () {
        var config = CanvasAppConfig;
        var localImageLoaderView = new LocalImageLoaderView(config.localImageLoaderView);
        localImageLoaderView.open().then(function (img) {
            console.log(img);
        }, function (error) {
            console.log(error);
        });
    });
});
