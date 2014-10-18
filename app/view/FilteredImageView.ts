///<reference path="../model/reference.ts"/>

import FilteredImage = require("../model/FilteredImage")
import FilteredImageEvents = require("../model/FilteredImageEvents");

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
     */
    constructor(filteredImage: FilteredImage, container: HTMLElement) {
        this.filteredImage = filteredImage;
        this.container = container;
        this.canvasElement = document.createElement("canvas");
        this.container.appendChild(this.canvasElement);
    }

    /**
     * 画像処理フィルターが追加されたときのコールバック
     * @param event
     */
    onFilterAdded(event: FilteredImageEvents.FilterAddedEvent): void {
        this.repaintCanvas(this.filteredImage.resultImageData);
    }

    private repaintCanvas(imageData: ImageData): void {
        this.canvasElement.width = imageData.width;
        this.canvasElement.height = imageData.height;
        this.canvasElement.getContext("2d").putImageData(imageData, 0, 0);
    }
}
export = FilteredImageView
