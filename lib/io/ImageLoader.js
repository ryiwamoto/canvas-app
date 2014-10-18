/// <reference path="../lib/es6-promise/es6-promise.d.ts" />
define(["require", "exports"], function (require, exports) {
    /**
     * 画像を指定URLから読み込むローダー
     */
    var ImageLoader = (function () {
        function ImageLoader() {
        }
        /**
         * 指定URLの画像を非同期に読み込む
         * @param imageURL 画像URL
         * @returns {Promise}
         */
        ImageLoader.prototype.load = function (imageURL) {
            return new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = reject;
                img.src = imageURL;
            });
        };
        return ImageLoader;
    })();
    var ImageLoaderImpl = new ImageLoader();
    return ImageLoaderImpl;
});
