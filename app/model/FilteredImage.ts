///<reference path="../io/reference.ts"/>
///<reference path="imageFilter/ImageFilter.ts"/>
///<reference path="FilteredImageEvents.ts"/>

import ImageFilter = require("./imageFilter/ImageFilter");
import FilteredImageEvents = require("./FilteredImageEvents");
import ImageDataCopyMaker = require("../io/ImageDataCopyMaker");

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
    private originalImageData: ImageData;

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
    private eventListeners: FilteredImageEvents.FilteredImageEventListener[] = [];

    /**
     * 画像データーのコピー生成サービス
     */
    private imageDataCopyMaker: ImageDataCopyMaker;

    /**
     * @param name 画像名
     * @param imageData 画像データ
     */
    constructor(name: string, imageData: ImageData) {
        this.name = name;
        this.originalImageData = imageData;
        this.resultImageData = imageData;
        this.imageDataCopyMaker = new ImageDataCopyMaker();
    }

    /**
     * イベントリスナーを追加する
     * @param listener
     */
    addEventListener(listener: FilteredImageEvents.FilteredImageEventListener): void {
        this.eventListeners.push(listener);
    }

    /**
     * 画像処理フィルターを追加する
     * @param filter 画像処理フィルター
     */
    addImageFilter(filter: ImageFilter): void {
        this.spliceImageFilter(this.appliedImageFilters.length, 0, filter);
        this.reApplyFilters();
        this.fireChangeEvent();
    }

    /**
     * 指定indexの画像処理フィルターを削除する
     * @param index 削除する画像処理フィルターのindex
     */
    removeImageFilter(index: number): void {
        this.spliceImageFilter(index, 1);
        this.reApplyFilters();
        this.fireChangeEvent();
    }

    /**
     * 画像処理フィルターを移動させる
     * @param from 移動前index
     * @param to 移動後のindex
     */
    moveImageFIlter(from: number, to: number): void {
        console.log(from, to);
        var spliced = this.spliceImageFilter(from, 1);
        console.log("spliced", spliced);
        var filter = spliced[0];
        console.log(filter);
        this.spliceImageFilter(to, 0, filter);
        this.reApplyFilters();
        this.fireChangeEvent();
    }

    /**
     * 画像処理フィルターを入れ替える
     * @param index 配列を変化させ始める要素の添字
     * @param howMany 配列から取り除く古い要素の数
     * @param filters 配列に追加する要素
     * @returns {ImageFilter[]}
     */
    private spliceImageFilter(index: number, howMany: number, ...filters: ImageFilter[]): ImageFilter[] {
        if (isNaN(index) || index < 0 || index > this.appliedImageFilters.length) {
            throw new Error('given index is out of range: ' + index);
        }
        return this.appliedImageFilters.splice.apply(this.appliedImageFilters, [].concat(index, howMany, filters));
    }

    /**
     * 画像処理フィルター変更イベントを通知する
     */
    private fireChangeEvent(): void {
        var event = new FilteredImageEvents.FilterChangedEvent(this.appliedImageFilters);
        this.eventListeners.forEach((listener: FilteredImageEvents.FilteredImageEventListener)=> {
            listener.onFilterChanged(event);
        });
    }

    /**
     * フィルターを適用し直す
     * TODO: キャッシュ機構をつける
     */
    private reApplyFilters(reApplayAfter?: number): void {
        var imageData = this.imageDataCopyMaker.copy(this.originalImageData);
        for (var i = 0, _len = this.appliedImageFilters.length; i < _len; i++) {
            imageData = this.appliedImageFilters[i].process(imageData);
        }
        this.resultImageData = imageData;
    }
}

export = FilteredImage
