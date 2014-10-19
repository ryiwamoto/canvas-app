///<reference path="./ImageFilterFactory.ts"/>

import ImageFilterFactory = require("./ImageFilterFactory");

/**
 * アプリケーションで使う画像処理フィルターファクトリのリストを提供するプロバイダー
 */
class ImageFilterFactoriesProvider {
    /**
     * 画像処理フィルター
     * @type {Array}
     */
    private factories: ImageFilterFactory[] = [];

    /**
     * 画像処理フィルターを登録する
     * @param imageFilterFactory
     */
    add(imageFilterFactory: ImageFilterFactory): ImageFilterFactoriesProvider {
        this.factories.push(imageFilterFactory);
        return this;
    }

    /**
     * 画像処理フィルターを取得
     */
    get(): ImageFilterFactory[] {
        return this.factories;
    }
}

export = ImageFilterFactoriesProvider;