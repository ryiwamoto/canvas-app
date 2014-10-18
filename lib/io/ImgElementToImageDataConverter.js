///<reference path="../lib/es6-promise/es6-promise.d.ts"/>
define(["require", "exports"], function (require, exports) {
    /**
     * 画像要素をImageDataに変換する
     */
    var ImgElemntToImageDataConverter = (function () {
        function ImgElemntToImageDataConverter(container) {
            this.container = container;
        }
        ImgElemntToImageDataConverter.prototype.toImageData = function (imgElement) {
            var canvas = document.createElement("canvas");
            canvas.style.display = "none";
            this.container.appendChild(canvas);
            return new Promise(function (resolve, reject) {
                var context = canvas.getContext("2d");
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                context.drawImage(imgElement, 0, 0);
                resolve(context.getImageData(0, 0, imgElement.width, imgElement.height));
            });
        };
        return ImgElemntToImageDataConverter;
    })();
    return ImgElemntToImageDataConverter;
});
