///<reference path="../../../lib/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../io/reference.ts"/>
///<reference path="./local_image_loader.d.ts"/>
define(["require", "exports", "../../../io/LocalImageLoader", "./local_image_loader"], function (require, exports, LocalImageLoader, template) {
    /**
     * ローカルの画像を読み込むビュー要素
     */
    var LocalImageLoaderView = (function () {
        /**
         * @param container コンテナHTML要素
         */
        function LocalImageLoaderView(container) {
            this.container = $(container);
            this.dialog = this.createDialogElement();
            this.container.append(this.dialog);
        }
        /**
         * ダイアログ要素を生成する
         * @returns {JQuery}
         */
        LocalImageLoaderView.prototype.createDialogElement = function () {
            var dialog = $(document.createElement("div"));
            dialog.addClass("modal");
            dialog.addClass("fade");
            dialog.html(template());
            return dialog;
        };
        /**
         * ロカール画像読み込みダイアログを開く
         */
        LocalImageLoaderView.prototype.open = function () {
            var _this = this;
            var fileInputContainer = this.dialog.find("#js_file-input-container");
            this.loader = new LocalImageLoader(fileInputContainer.get(0));
            var promise = this.loader.load();
            $(this.dialog).on("hidden.bs.modal", function () {
                _this.loader.cancel();
            });
            promise.then(function (result) {
                _this.dialog.modal("hide");
                return result;
            });
            console.log(this.dialog.html());
            this.dialog.modal("show");
            return promise;
        };
        return LocalImageLoaderView;
    })();
    return LocalImageLoaderView;
});
