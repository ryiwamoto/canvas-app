/// <reference path="../lib/es6-promise/es6-promise.d.ts" />

/**
 * 画像を指定URLから読み込むローダー
 */
class ImageLoader {

    /**
     * 指定URLの画像を非同期に読み込む
     * @param imageURL 画像URL
     * @returns {Promise}
     */
    load(imageURL: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject)=> {
            var img = new Image();
            img.onload = ()=> {
                resolve(img)
            };
            img.onerror = reject;
            img.src = imageURL;
        });
    }
}

var ImageLoaderImpl = new ImageLoader();

export = ImageLoaderImpl;
