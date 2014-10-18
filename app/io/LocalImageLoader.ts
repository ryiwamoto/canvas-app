///<reference path="../lib/es6-promise/es6-promise.d.ts"/>
/// <reference path="./ImageLoader.ts" />

import ImageLoader = require("./ImageLoader");

/**
 * ローカルにある画像を読み込むローダー
 */
class LocalImageLoader {
    /**
     * child id
     */
    static cid: number = 0;

    /**
     * idPrefix for element
     */
    static idPrefix: string = "UI-LocalImageFiler_";

    /**
     * input element to handle file
     */
    private fileInput: HTMLInputElement;

    /**
     * 進行中のローダープロミス
     */
    private promise: Promise<HTMLImageElement>;

    /**
     * プロミスをリジェクトするコールバック
     */
    private rejectCallback: Function;

    /**
     * @param container コンテナ要素
     */
    constructor(private container: HTMLElement) {
    }

    /**
     * ユニークIDを生成する
     */
    private static generateUniqueId() {
        return LocalImageLoader.idPrefix + (LocalImageLoader.cid++);
    }

    private createHiddenFileInputElement() {
        //<input type="file" accept="image/*" style="display:none">
        var input = document.createElement("input");
        var id = LocalImageLoader.generateUniqueId();
        input.id = id;
        input.name = id;
        input.type = "file";
        input.accept = "image/*";
        return input;
    }

    load(): Promise<HTMLImageElement> {
        if (this.promise) {
            throw new Error("すでにローダーが起動しています");
        }
        this.promise = new Promise((resolve, reject) => {
            this.rejectCallback = reject;
            this.fileInput = this.createHiddenFileInputElement();
            this.fileInput.onchange = () => {
                var file = this.fileInput.files[0];
                if (!file.type.match(/image.*/)) {
                    reject(new Error("file is not image file."));
                }
                var objectURL = URL.createObjectURL(file);
                this.cleanup();
                ImageLoader.load(objectURL).then(resolve, reject);
            };
            this.container.appendChild(this.fileInput);
        });
        return this.promise;
    }

    cancel(): void {
        if(this.rejectCallback){
            this.rejectCallback(new Error("canceled"));
        }
        this.cleanup();
    }

    private cleanup(): void {
        this.promise = null;
        this.rejectCallback = null;
        if (this.fileInput && this.fileInput.parentNode) {
            this.fileInput.parentNode.removeChild(this.fileInput);
        }
        this.fileInput = null;
    }
}

export = LocalImageLoader;
