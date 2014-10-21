///<reference path="../model/reference.ts"/>
///<reference path="../model/imageFilter/ImageFilterFactory.ts"/>

import ImageFilter = require("../model/imageFilter/ImageFilter");
import ImageFilterFactory = require("../model/imageFilter/ImageFilterFactory");

/**
 * ディザパターンを使ってハーフトーン処理を行う画像処理フィルター
 */
class DetherBinalizationFilter extends ImageFilter {

    /**
     * Bayerのディザパターン
     */
    static BAYER_DETHER_PATTERN = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5]
    ];

    /**
     * Bayerのディザパターンの各値nを n * 16 + 8したもの
     */
    static CALCURATED_BAYER_DETHER_PATTERN = [
        [8, 136, 40, 168],
        [200, 72, 232, 104],
        [56, 184, 24, 152],
        [248, 120, 216, 88]
    ];

    /**
     * @param name 画像フィルター名
     */
    constructor(name: string) {
        super(name);
    }

    /**
     * ディザパターンを使ってハーフトーン処理を行う
     * @param imageData
     * @returns {ImageData|{prototype: ImageData, new(): ImageData}}
     */
    process(imageData: ImageData): ImageData {
        //輝度の配列に変換
        var luminanceLines = this.getLuminances(imageData);

        //ディザパターンに置き換え
        return this.createDetherPattern(luminanceLines, imageData);
    }

    /**
     * 輝度値情報の配列を返す
     * @param imageData
     * @returns {Array}
     */
    getLuminances(imageData:ImageData): number[] {
        var data = imageData.data;
        var pixels: number[] = [];
        for (var i = 0, _len = data.length; i < _len; i = i + 4) {
            pixels.push(this.calcLuminance(data[i], data[i + 1], data[i+2]));
        }
        return pixels;
    }

    /**
     * 輝度値の情報に基づいてディザパターンで処理した画像データを返す
     * @param pixels
     * @param imageData
     * @returns {ImageData}
     */
    createDetherPattern(pixels: number[], imageData: ImageData) :ImageData{
        var width = imageData.width;
        var height = imageData.height;
        var data = imageData.data;
        for (var i = 0, _len = pixels.length; i < _len; i++) {
            var pixel = pixels[i];
            //画像の左上ピクセルを0,0としたx,y座標を求める
            var x = i % width;
            var y = ~~(i / width);
            //4x4のブロックのどこに入るかを計算
            var xInBlock = x % 4;
            var yInBlock = y % 4;

            //ディザパターンと照合する
            var binalized = (pixel < DetherBinalizationFilter.CALCURATED_BAYER_DETHER_PATTERN[xInBlock][yInBlock]) ? 0 : 255;

            var dataIndex = i * 4;
            data[dataIndex] = binalized;//R
            data[dataIndex + 1] = binalized;//G
            data[dataIndex + 2] = binalized;//B
            data[dataIndex + 3] = 255;//A
        }
        return imageData;
    }
}

/**
 * ディザパターンを使ってハーフトーン処理を行う画像処理フィルターのファクトリ
 */
class DetherBinalizationFilterFactory implements ImageFilterFactory {
    /**
     * 生成する画像処理フィルターの名前
     */
    imageFilterName: string = "二値化（ディザ）";

    /**
     * 生成する画像処理フィルターの説明文
     */
    imageFilterDescription: string = "ディザパターンを使ってハーフトーン処理を行う";

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
        return new DetherBinalizationFilter(this.imageFilterName);
    }
}

var DetherBinalizationFilterFactoryImpl = new DetherBinalizationFilterFactory();
export = DetherBinalizationFilterFactoryImpl;
