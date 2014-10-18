///<reference path="imageFilter/ImageFilter.ts"/>
define(["require", "exports"], function (require, exports) {
    /**
     * 画像処理フィルターが追加されたときのイベント
     */
    var FilterAddedEvent = (function () {
        /**
         * @param addedFilter 追加された画像処理フィルター
         */
        function FilterAddedEvent(addedFilter) {
            this.addedFilter = addedFilter;
        }
        return FilterAddedEvent;
    })();
    exports.FilterAddedEvent = FilterAddedEvent;
});
