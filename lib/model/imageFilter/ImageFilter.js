define(["require", "exports"], function (require, exports) {
    /**
     * 画像フィルター
     */
    var ImageFilter = (function () {
        /**
         * @param name 画像処理フィルターの名前
         */
        function ImageFilter(name) {
            this.name = name;
        }
        /**
         * 適用する関数
         * @param imageData 画像データ
         * @returns {ImageData} 画像データ
         */
        ImageFilter.prototype.process = function (imageData) {
            return imageData;
        };
        /**
         * 画素の輝度値を計算する
         * @param r R
         * @param g G
         * @param b B
         * @returns {number} 輝度値
         */
        ImageFilter.prototype.calcLuminance = function (r, g, b) {
            return ~~(0.299 * r + 0.587 * g + 0.114 * b);
        };
        return ImageFilter;
    })();
    return ImageFilter;
});
