///<reference path="../model/reference.ts"/>
define(["require", "exports"], function (require, exports) {
    /**
     * フィルター処理された画像のビュー
     */
    var FilteredImageView = (function () {
        /**
         * @param filteredImage フィルター処理された画像
         */
        function FilteredImageView(filteredImage, container) {
            this.filteredImage = filteredImage;
            this.container = container;
            this.canvasElement = document.createElement("canvas");
            this.container.appendChild(this.canvasElement);
        }
        /**
         * 画像処理フィルターが追加されたときのコールバック
         * @param event
         */
        FilteredImageView.prototype.onFilterAdded = function (event) {
            this.repaintCanvas(this.filteredImage.resultImageData);
        };
        /**
         * Canvas要素を再描画する
         * @param imageData
         */
        FilteredImageView.prototype.repaintCanvas = function (imageData) {
            this.canvasElement.width = imageData.width;
            this.canvasElement.height = imageData.height;
            this.canvasElement.getContext("2d").putImageData(imageData, 0, 0);
        };
        return FilteredImageView;
    })();
    return FilteredImageView;
});
