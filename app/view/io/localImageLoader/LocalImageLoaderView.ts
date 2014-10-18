///<reference path="../../../lib/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../io/reference.ts"/>
///<reference path="./local_image_loader.d.ts"/>

import LocalImageLoader = require("../../../io/LocalImageLoader");
import template = require("./local_image_loader");

/**
 * ローカルの画像を読み込むビュー要素
 */
class LocalImageLoaderView {
    /**
     * イメージローダー
     */
    private loader: LocalImageLoader;

    /**
     * コンテナHTML要素
     */
    private container: JQuery;

    /**
     * ダイアログのHTML要素
     */
    private dialog: JQuery;

    /**
     * @param container コンテナHTML要素
     */
    constructor(container: HTMLElement) {
        this.container = $(container);
        this.dialog = this.createDialogElement();
        this.container.append(this.dialog);
    }

    /**
     * ダイアログ要素を生成する
     * @returns {JQuery}
     */
    private createDialogElement(): JQuery {
        var dialog = $(document.createElement("div"))
        dialog.addClass("modal");
        dialog.addClass("fade");
        dialog.html(template());
        return dialog;
    }

    /**
     * ロカール画像読み込みダイアログを開く
     */
    open(): Promise<HTMLElement> {
        var fileInputContainer = this.dialog.find("#js_file-input-container");
        this.loader = new LocalImageLoader(fileInputContainer.get(0));
        var promise = this.loader.load();
        $(this.dialog).on("hidden.bs.modal", ()=> {
            this.loader.cancel()
        });
        promise.then((result)=> {
            this.dialog.modal("hide");
            return result;
        });
        console.log(this.dialog.html());
        this.dialog.modal("show");
        return promise;
    }

}
export = LocalImageLoaderView;
