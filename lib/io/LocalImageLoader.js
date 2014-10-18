///<reference path="../lib/es6-promise/es6-promise.d.ts"/>
/// <reference path="./ImageLoader.ts" />
define(["require", "exports", "./ImageLoader"], function (require, exports, ImageLoader) {
    /**
     * ローカルにある画像を読み込むローダー
     */
    var LocalImageLoader = (function () {
        /**
         * @param container コンテナ要素
         */
        function LocalImageLoader(container) {
            this.container = container;
        }
        /**
         * ユニークIDを生成する
         */
        LocalImageLoader.generateUniqueId = function () {
            return LocalImageLoader.idPrefix + (LocalImageLoader.cid++);
        };
        LocalImageLoader.prototype.createHiddenFileInputElement = function () {
            //<input type="file" accept="image/*" style="display:none">
            var input = document.createElement("input");
            var id = LocalImageLoader.generateUniqueId();
            input.id = id;
            input.name = id;
            input.type = "file";
            input.accept = "image/*";
            return input;
        };
        LocalImageLoader.prototype.load = function () {
            var _this = this;
            if (this.promise) {
                throw new Error("すでにローダーが起動しています");
            }
            this.promise = new Promise(function (resolve, reject) {
                _this.rejectCallback = reject;
                _this.fileInput = _this.createHiddenFileInputElement();
                _this.fileInput.onchange = function () {
                    var file = _this.fileInput.files[0];
                    if (!file.type.match(/image.*/)) {
                        reject(new Error("file is not image file."));
                    }
                    var objectURL = URL.createObjectURL(file);
                    _this.cleanup();
                    ImageLoader.load(objectURL).then(resolve, reject);
                };
                _this.container.appendChild(_this.fileInput);
            });
            return this.promise;
        };
        LocalImageLoader.prototype.cancel = function () {
            if (this.rejectCallback) {
                this.rejectCallback(new Error("canceled"));
            }
            this.cleanup();
        };
        LocalImageLoader.prototype.cleanup = function () {
            this.promise = null;
            this.rejectCallback = null;
            if (this.fileInput && this.fileInput.parentNode) {
                this.fileInput.parentNode.removeChild(this.fileInput);
            }
            this.fileInput = null;
        };
        /**
         * child id
         */
        LocalImageLoader.cid = 0;
        /**
         * idPrefix for element
         */
        LocalImageLoader.idPrefix = "UI-LocalImageFiler_";
        return LocalImageLoader;
    })();
    return LocalImageLoader;
});
