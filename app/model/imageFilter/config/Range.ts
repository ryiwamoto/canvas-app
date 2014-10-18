///<reference path="ImageFilterConfig.ts"/>

/**
 * 範囲から値を設定する項目
 */
class Range implements ImageFilterConfigItem{
    /**
     * @param min 最小値
     * @param max 最大値
     * @param step 目盛り間の距離
     */
    constructor(public min: number, public max: number, step: number){
    }
}

export = Range;