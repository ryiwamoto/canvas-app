///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");
import ToneCurveFilter = require("./ToneCurveFilter");

/**
 * トーンカーブ自動補正画像フィルター。変化なし。
 */
class AutoToneCurveFilter extends ToneCurveFilter {
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
        if (lightness <= 0.25) {
            return 0.1;
        } else if (lightness >= 0.75) {
            return 1;
        } else {
            return 2 * lightness - 0.5;
        }
    }
}

/**
 * 画像処理フィルターのファクトリ
 */
class AutoToneCurveFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "コントラスト強調";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "コントラストを強調します";

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
        return new AutoToneCurveFilter(this.imageFilterName);
    }
}

var factoryImpl = new AutoToneCurveFilterFactory();
export = factoryImpl;
