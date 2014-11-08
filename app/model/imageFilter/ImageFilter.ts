/**
 * 画像フィルター
 */
class ImageFilter {

    /**
     * 画像処理フィルターの名前
     */
    public name: string;

    /**
     * @param name 画像処理フィルターの名前
     */
    constructor(name: string) {
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

    /**
     * RGB色空間をHSL空間に変換する
     * @param r 0~255
     * @param g 0~255
     * @param b 0~255
     * @returns {number[]} [h, s, l]
     */
    rgbToHsl(r: number, g: number, b: number): number[] {
        r /= 255;
        g /= 255;
        b /= 255;
        var max: number = Math.max(r, g, b), min = Math.min(r, g, b);
        var h: number, s: number, l: number = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    /**
     * HSL空間をRGB色空間に変換する
     * CSS3で定められている双６角錐モデルに基づいて変換する
     * @param h 色相
     * @param s 彩度
     * @param l 明度
     */
    hslToRgb(h: number, s: number, l: number): number[] {
        /**
         * http://www.w3.org/TR/css3-color/#hsl-color
         * HOW TO RETURN hsl.to.rgb(h, s, l):
         * SELECT:
         * l<=0.5: PUT l*(s+1) IN m2
         * ELSE: PUT l+s-l*s IN m2
         * PUT l*2-m2 IN m1
         * PUT hue.to.rgb(m1, m2, h+1/3) IN r
         * PUT hue.to.rgb(m1, m2, h    ) IN g
         * PUT hue.to.rgb(m1, m2, h-1/3) IN b
         * RETURN (r, g, b)
         */
        var m2: number, m1: number, r: number, g: number, b: number;
        if (l <= 0.5) {
            m2 = l * (s + 1);
        } else {
            m2 = l + s - l * s;
        }
        m1 = l * 2 - m2;
        r = this.hueToRGB(m1, m2, h + 1 / 3);
        g = this.hueToRGB(m1, m2, h);
        b = this.hueToRGB(m1, m2, h - 1 / 3);
        return [r * 255 , g * 255, b * 255];
    }

    /**
     * 色相を各RGB値に変換する
     */
    private hueToRGB(m1: number, m2: number, h: number): number {
        /**
         * HOW TO RETURN hue.to.rgb(m1, m2, h):
         * IF h<0: PUT h+1 IN h
         * IF h>1: PUT h-1 IN h
         * IF h*6<1: RETURN m1+(m2-m1)*h*6
         * IF h*2<1: RETURN m2
         * IF h*3<2: RETURN m1+(m2-m1)*(2/3-h)*6
         * RETURN m1
         */
        if (h < 0) {
            h = h + 1;
        }
        if (h > 1) {
            h = h - 1;
        }
        if (h * 6 < 1) {
            return m1 + (m2 - m1) * h * 6;
        }
        if (h * 2 < 1) {
            return m2;
        }
        if (h * 3 < 2) {
            return m1 + (m2 - m1) * (2 / 3 - h) * 6;
        }
        return m1;
    }
}

export = ImageFilter
