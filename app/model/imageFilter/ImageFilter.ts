/**
 * 画像フィルター
 */
class ImageFilter {

    /**
     * 画像処理フィルターの名前
     */
    public name:string;

    /**
     * @param name 画像処理フィルターの名前
     */
    constructor(name: string){
        this.name = name;
    }

    /**
     * 適用する関数
     * @param imageData 画像データ
     * @returns {ImageData} 画像データ
     */
    process(imageData: ImageData): ImageData {
        return imageData;
    }

    /**
     * 画素の輝度値を計算する
     * @param r R
     * @param g G
     * @param b B
     * @returns {number} 輝度値
     */
    calcLuminance(r: number, g: number, b: number): number {
        return ~~(0.299 * r + 0.587 * g + 0.114 * b);
    }
}

export = ImageFilter
