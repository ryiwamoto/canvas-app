/**
 * ImageDataのコピーを行う
 */
class ImageDataCopyMaker {
    /**
     * キャンバス要素
     */
    private canvas: HTMLCanvasElement;


    constructor() {
        this.canvas = document.createElement("canvas");
    }

    /**
     * ImageDataをコピーする。この機能はIO層に移動するべき
     * @param imageData
     * @returns {imageData}
     */
    copy(imageData: ImageData): ImageData {
        var copy: any = this.canvas.getContext("2d").createImageData(imageData.width, imageData.height);
        (<Uint8Array>copy.data).set(imageData.data);
        return <ImageData>copy;
    }
}

export = ImageDataCopyMaker;
