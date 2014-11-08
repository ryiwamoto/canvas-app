///<reference path="imageFilter/ImageFilter.ts"/>

import ImageFilter = require("imageFilter/ImageFilter");

/**
 * 画像処理フィルターが適用された画像のイベントを受け取るリスナーのインターフェース
 */
export interface FilteredImageEventListener {
    onFilterChanged(event: FilterChangedEvent): void;
}

/**
 * 画像処理フィルターが追加されたときのイベント
 */
export class FilterChangedEvent{
    /**
     * @param appliedFilters 適用されている画像処理フィルターのリスト
     */
    constructor(public appliedFilters: ImageFilter[]){
    }
}
