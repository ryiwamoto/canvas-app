///<reference path="./ImageFilter.ts"/>
///<reference path="./config/ImageFilterConfig"/>

import ImageFilter = require("ImageFilter");

/**
 * 画像処理フィルターのファクトリーインターフェース
 */
interface ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string;

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string;

    /**
     * 画像処理フィルターを生成するために必要な設定項目を返す
     */
    getImageFilterConfig(): ImageFilterConfig;

    /**
     * 画像処理フィルターを生成する
     * @param config 設定項目
     */
    create(config: ImageFilterConfig): ImageFilter;
}

export = ImageFilterFactory;
