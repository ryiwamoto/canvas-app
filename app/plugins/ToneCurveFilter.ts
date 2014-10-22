///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");

/**
 * トーンカーブによる画像フィルター。変化なし。
 */
class ToneCurveFilter extends ImageFilter{
    /**
     * @param name 画像フィルター名
     */
    constructor(name: string){
        super(name);
    }

    /**
     * 処理関数
     * @param imageData
     */
    process(imageData: ImageData): ImageData {
        var data = imageData.data;
        for(var i= 0, _len = data.length; i < _len; i += 4){
            var hsl = this.rgbTohsl(data[i], data[i+1], data[i+2]);
            var newRgb = this.hslToRgb(hsl[0], hsl[1], this.calcFilterLuminance(hsl[2]));
            data[i] = newRgb[0];
            data[i + 1] = newRgb[1];
            data[i + 2] = newRgb[2];
        }
    }

    /**
     * 明るさを変換して新たな輝度値を返す
     * @param lightness
     * @returns {number}
     */
    calcFilterLuminance(lightness: number): number{
        return lightness;
    }
}

export = ToneCurveFilter;