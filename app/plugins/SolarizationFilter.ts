///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");
import ToneCurveFilter = require("./ToneCurveFilter");

/**
 * トーンカーブによる画像フィルター。変化なし。
 */
class SolarizationFilter extends ToneCurveFilter {
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
        if(lightness >= 0.5){
            return lightness;
        }else{
            return 1 - lightness;
        }
    }
}

/**
 * 画像処理フィルターのファクトリ
 */
class SolarizationFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "ソラリゼーション";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "画像の濃淡の一部分を反転させることにより、ネガ画像とポジ画像が混ざり合ったような特殊な効果を出します。";

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
        return new SolarizationFilter(this.imageFilterName);
    }
}

var factoryImpl = new SolarizationFilterFactory();
export = factoryImpl;

