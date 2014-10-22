///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");

/**
 * 大津の二値化の画像フィルター
 */
class AutoBinalizationFilter extends ImageFilter {

    constructor(name: string){
        super(name);
    }

    /**
     * 処理関数
     * @param imageData
     * @returns {ImageData|{prototype: ImageData, new(): ImageData}}
     */
    process(imageData: ImageData): ImageData {
        return this.binarizeByBorder(imageData, this.findBorder(this.calcHistogram(imageData)));
    }

    /**
     * しきい値を探す関数
     * @param {number[]} ヒストグラム
     */
    private findBorder(histogram: number[]) {
        var currentMax = 0;
        var border = 1;

        //しきい値は両端のindexを取らない
        for (var i = 1, histogramLength = histogram.length; i < histogramLength - 1; i++) {
            //グループに分けて画素数と平均を計算する
            var blackGroupAverage = 0, blackGroupSum = 0,
                whiteGroupAverage = 0, whiteGroupSum = 0,
                resultNum = 0, avgDiff = 0;
            for (var j = 0; j <= i; j++) {
                blackGroupSum += histogram[j];
            }
            blackGroupAverage = blackGroupSum / i + 1;

            for (var k = i + 1; k <= i; k++) {
                whiteGroupSum += histogram[k];
            }
            whiteGroupAverage = whiteGroupSum / histogramLength - i;

            avgDiff = blackGroupAverage - whiteGroupSum;
            resultNum = (i + 1) * (k - i) * (avgDiff * avgDiff);
            if (resultNum > currentMax) {
                currentMax = resultNum;
                border = i;
            }
        }
        return border;
    }

    /**
     * ヒストグラムを計算する関数
     * @param {ImageData} imageData canvasのimageData
     */
    private calcHistogram(imageData: ImageData) {
        var data = imageData.data;
        var ys = new Array(256);
        for (var i = 0; i < ys.length; i++) {
            ys[i] = 0;
        }

        for (var i = 0, _len = data.length; i < _len; i = i + 4) {
            // 輝度の値ごとのカウント
            ys[this.calcLuminance(data[i], data[i + 1], data[i + 2])]++;
        }
        return ys;
    }

    /**
     * しきい値を元に二値化する
     * @param {ImageData} imageData canvasのimageData
     * @param {number} borderLuminance しきい値(0~255)
     * @return {ImageData} 二値化後のimageData
     */
    private binarizeByBorder(imageData: ImageData, borderLuminance: number) {
        var data = imageData.data;
        for (var i = 0, _len2 = data.length; i < _len2; i = i + 4) {
            var y = ~~(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
            var binalized = y > borderLuminance ? 255 : 0;
            data[i] = binalized;
            data[i + 1] = binalized;
            data[i + 2] = binalized;
        }
        imageData.data = data;
        return imageData;
    }
}

class AutoBinalizationFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "大津の二値化";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "大津の二値化法を使って自動で画像を二値化します";

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
        return new AutoBinalizationFilter(this.imageFilterName);
    }
}

var AutoBinalizationFilterFactoryImpl = new AutoBinalizationFilterFactory();
export = AutoBinalizationFilterFactoryImpl;