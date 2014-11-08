///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");

/**
 * トーンカーブによる画像フィルター。変化なし。
 */
class ToneCurveFilter extends ImageFilter {
    /**
     * @param name 画像フィルター名
     */
    constructor(name: string) {
        super(name);
    }

    /**
     * 処理関数
     * @param imageData
     */
    process(imageData: ImageData): ImageData {
        var data = imageData.data;
        for (var i = 0, _len = data.length; i < _len; i += 4) {
            var hsl = this.rgbToHsl(data[i], data[i + 1], data[i + 2]);
            var newRgb = this.hslToRgb(hsl[0], hsl[1], this.calcFilterLuminance(hsl[2]));
            data[i] = newRgb[0];
            data[i + 1] = newRgb[1];
            data[i + 2] = newRgb[2];
        }
        console.log(imageData);
        imageData.data = data;
        return imageData;
    }

    /**
     * 明るさを変換して新たな輝度値を返す
     * @param lightness
     * @returns {number}
     */
    calcFilterLuminance(lightness: number): number {
        return lightness;
    }
}

/**
 * ディザパターンを使ってハーフトーン処理を行う画像処理フィルターのファクトリ
 */
class ToneCurveFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "トーンカーブ";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "トーンカーブ";

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
        return new ToneCurveFilter(this.imageFilterName);
    }
}

var ToneCurveFilterFactoryImpl = new ToneCurveFilterFactory();
export = ToneCurveFilterFactoryImpl;
