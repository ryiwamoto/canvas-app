///<reference path="imageFilter/ImageFilter.ts"/>

import ImageFilter = require("imageFilter/ImageFilter");

/**
 * 画像処理フィルターが適用された画像のイベントを受け取るリスナーのインターフェース
 */
export interface FilteredImageEventListener {
    onFilterAdded(event: FilterAddedEvent): void;
}

/**
 * 画像処理フィルターが追加されたときのイベント
 */
export class FilterAddedEvent{
    /**
     * @param addedFilter 追加された画像処理フィルター
     * @param resultImage フィルター後の画像
     */
    constructor(public addedFilter: ImageFilter){
    }
}
