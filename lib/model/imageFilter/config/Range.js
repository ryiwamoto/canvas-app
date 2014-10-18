///<reference path="ImageFilterConfig.ts"/>
define(["require", "exports"], function (require, exports) {
    /**
     * 範囲から値を設定する項目
     */
    var Range = (function () {
        /**
         * @param min 最小値
         * @param max 最大値
         * @param step 目盛り間の距離
         */
        function Range(min, max, step) {
            this.min = min;
            this.max = max;
        }
        return Range;
    })();
    return Range;
});
