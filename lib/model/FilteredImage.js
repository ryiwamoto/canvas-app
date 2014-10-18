///<reference path="imageFilter/ImageFilter.ts"/>
///<reference path="FilteredImageEvents.ts"/>
define(["require", "exports", "FilteredImageEvents"], function (require, exports, FilteredImageEvents) {
    /**
     * 画像処理フィルターが適用された画像
     */
    var FilteredImage = (function () {
        /**
         * @param name 画像名
         * @param imageData 画像データ
         */
        function FilteredImage(name, imageData) {
            /**
             * 適用された画像処理フィルター
             * @type {Array}
             */
            this.appliedImageFilters = [];
            this.name = name;
            this.originalImageData = imageData;
            this.resultImageData = imageData;
        }
        /**
         * イベントリスナーを追加する
         * @param listener
         */
        FilteredImage.prototype.addEventListner = function (listener) {
            this.eventListeners.push(listener);
        };
        /**
         * 画像処理フィルターを適用する
         * @param filter 画像処理フィルター
         * @param index フィルターの適用位置。省略すると一番上に追加される
         */
        FilteredImage.prototype.addImageFilter = function (filter, index) {
            if (index === void 0) { index = this.appliedImageFilters.length - 1; }
            if (index < 0 || index > this.appliedImageFilters.length) {
                throw new Error('given index is out of range: ' + index);
            }
            this.appliedImageFilters.splice(index, 0, filter);
            this.reApplyFilters();
            var event = new FilteredImageEvents.FilterAddedEvent(filter);
            this.eventListeners.forEach(function (listener) {
                listener.onFilterAdded(event);
            });
        };
        /**
         * フィルターを適用し直す
         * TODO: キャッシュ機構をつける
         */
        FilteredImage.prototype.reApplyFilters = function () {
            this.resultImageData = this.appliedImageFilters.reduce(function (imageData, filter) {
                return filter.process(imageData);
            }, this.originalImageData);
        };
        return FilteredImage;
    })();
    return FilteredImage;
});
