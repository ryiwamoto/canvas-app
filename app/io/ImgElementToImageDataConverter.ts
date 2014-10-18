///<reference path="../lib/es6-promise/es6-promise.d.ts"/>

/**
 * 画像要素をImageDataに変換する
 */
class ImgElemntToImageDataConverter {

    constructor(private container: HTMLElement) {
    }

    toImageData(imgElement: HTMLImageElement): Promise<ImageData> {
        var canvas = document.createElement("canvas");
        canvas.style.display = "none";
        this.container.appendChild(canvas);

        return new Promise((resolve, reject)=> {
            var context = canvas.getContext("2d");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            context.drawImage(imgElement, 0, 0);
            resolve(context.getImageData(0, 0, imgElement.width, imgElement.height));
        });
    }
}

export = ImgElemntToImageDataConverter;
