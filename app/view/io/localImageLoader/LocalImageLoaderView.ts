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
        this.dialog = this.createDialogElement();
        var fileInputContainer = this.dialog.find("#js_file-input-container");

        var loader = new LocalImageLoader(fileInputContainer.get(0));
        var promise = loader.load();

        promise.then((result)=> this.cleanup());
        this.dialog
            .on("hidden.bs.modal", ()=> loader.cancel())
            .appendTo(this.container)
            .modal("show");

        return promise;
    }

    /**
     * ダイアログが閉じるときの操作
     */
    private cleanup() {
        if (!this.dialog) {
            return;
        }
        this.dialog.modal("hide");
        this.dialog.off("hidden.bs.modal");
        //this.dialog.remove();
        this.dialog = null;
    }

}
export = LocalImageLoaderView;
