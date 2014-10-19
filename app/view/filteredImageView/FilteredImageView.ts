///<reference path="../../model/reference.ts"/>
/// <amd-dependency path="./style.css" />

import FilteredImage = require("../../model/FilteredImage")
import FilteredImageEvents = require("../../model/FilteredImageEvents");

/**
 * フィルター処理された画像のビュー
 */
class FilteredImageView implements FilteredImageEvents.FilteredImageEventListener {
    /**
     * フィルター処理された画像
     */
    private filteredImage: FilteredImage;

    /**
     * canvas要素
     */
    private canvasElement: HTMLCanvasElement;

    /**
     * ViewのコンテナHTML要素
     */
    private container: HTMLElement;

    /**
     * @param filteredImage フィルター処理された画像
     * @param container コンテナHTML要素
     */
    constructor(filteredImage: FilteredImage, container: HTMLElement) {
        this.filteredImage = filteredImage;
        this.filteredImage.addEventListener(this);
        this.container = container;
        this.canvasElement = document.createElement("canvas");
        this.container.appendChild(this.createElement(this.canvasElement));
    }

    /**
     * HTML要素を生成する
     * TODO: テンプレート
     * @param canvas
     * @returns {any}
     */
    private createElement(canvas: HTMLCanvasElement): HTMLElement{
        var wrapper = document.createElement("div");
        wrapper.classList.add("filtered-image-view");
        wrapper.appendChild(canvas);
        return wrapper;
    }

    /**
     * 画像処理フィルターが追加されたときのコールバック
     * @param event
     */
    onFilterAdded(event: FilteredImageEvents.FilterAddedEvent): void {
        this.render();
    }

    /**
     * Canvas要素を再描画する
     * @param imageData
     */
    render(): void {
        var imageData = this.filteredImage.resultImageData;
        this.canvasElement.width = imageData.width;
        this.canvasElement.height = imageData.height;
        this.canvasElement.getContext("2d").putImageData(imageData, 0, 0);
    }
}

export = FilteredImageView

