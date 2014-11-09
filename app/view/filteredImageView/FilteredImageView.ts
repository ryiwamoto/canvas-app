///<reference path="../../model/reference.ts"/>
/// <amd-dependency path="!style!css!./style.css" />

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
     * 表示用のImage要素
     */
    private imageElement: HTMLImageElement;

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
        this.imageElement = document.createElement("img");
        this.container.appendChild(this.createElement(this.canvasElement));
    }

    /**
     * HTML要素を生成する
     * TODO: テンプレート
     * @param canvas
     * @returns {any}
     */
    private createElement(canvas: HTMLCanvasElement): HTMLElement {
        var wrapper = document.createElement("div");
        this.imageElement.style.width = "100%";
        this.imageElement.style.height = "100%";
        wrapper.classList.add("filtered-image-view");
        wrapper.appendChild(this.imageElement);
        return wrapper;
    }

    /**
     * 画像処理フィルターが変化したときのコールバック
     * @param event
     */
    onFilterChanged(event: FilteredImageEvents.FilterChangedEvent): void {
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
        this.imageElement.src = this.canvasElement.toDataURL();
    }
}

export = FilteredImageView

