///<reference path="imageFilter/ImageFilter.ts"/>
///<reference path="FilteredImageEvents.ts"/>

import ImageFilter = require("imageFilter/ImageFilter");
import FilteredImageEvents = require("FilteredImageEvents");

/**
 * 画像処理フィルターが適用された画像
 */
class FilteredImage {
    /**
     * 画像名
     */
    name: string;

    /**
     * 元画像データ
     */
    originalImageData: ImageData;

    /**
     * フィルター適用後の画像データ
     */
    resultImageData: ImageData;

    /**
     * 適用された画像処理フィルター
     * @type {Array}
     */
    appliedImageFilters: ImageFilter[] = [];

    /**
     * イベントリスナーの配列
     */
    private eventListeners: FilteredImageEvents.FilteredImageEventListener[];

    /**
     * @param name 画像名
     * @param imageData 画像データ
     */
    constructor(name: string, imageData: ImageData) {
        this.name = name;
        this.originalImageData = imageData;
        this.resultImageData = imageData;
    }

    /**
     * イベントリスナーを追加する
     * @param listener
     */
    addEventListner(listener: FilteredImageEvents.FilteredImageEventListener): void {
        this.eventListeners.push(listener);
    }

    /**
     * 画像処理フィルターを適用する
     * @param filter 画像処理フィルター
     * @param index フィルターの適用位置。省略すると一番上に追加される
     */
    addImageFilter(filter: ImageFilter, index = this.appliedImageFilters.length - 1): void {
        if (index < 0 || index > this.appliedImageFilters.length) {
            throw new Error('given index is out of range: ' + index);
        }
        this.appliedImageFilters.splice(index, 0, filter);
        this.reApplyFilters();

        var event = new FilteredImageEvents.FilterAddedEvent(filter);
        this.eventListeners.forEach((listener: FilteredImageEvents.FilteredImageEventListener)=> {
            listener.onFilterAdded(event);
        });
    }

    /**
     * フィルターを適用し直す
     * TODO: キャッシュ機構をつける
     */
    private reApplyFilters(): void {
        this.resultImageData = this.appliedImageFilters.reduce((imageData: ImageData, filter: ImageFilter)=> {
            return filter.process(imageData);
        }, this.originalImageData);
    }
}

export = FilteredImage
