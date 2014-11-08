///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");
import ToneCurveFilter = require("./ToneCurveFilter");

/**
 * トーンカーブによる画像フィルター。変化なし。
 */
class MonochromeInversionFilter extends ToneCurveFilter {
    /**
     * @param name 画像フィルター名
     */
    constructor(name: string) {
        super(name);
    }

    /**
     * 明るさを変換して新たな輝度値を返す
     * @param lightness
     * @returns {number}
     */
    calcFilterLuminance(lightness: number): number {
        return 1 - lightness;
    }
}

/**
 * ディザパターンを使ってハーフトーン処理を行う画像処理フィルターのファクトリ
 */
class MonochromeInversionFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "ネガ・ポジ反転";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "メイドを反転させます";

    /**
     * 画像処理フィルターを生成するために必要な設定項目を返す
     */
    getImageFilterConfig(): ImageFilterConfig {
        return null;
    }

    /**
     * 画像処理フィルターを生成する
     * @param config 設定項目
     */
    create(config: ImageFilterConfig): ImageFilter {
        return new MonochromeInversionFilter(this.imageFilterName);
    }
}

var factoryImpl = new MonochromeInversionFilterFactory();
export = factoryImpl;

