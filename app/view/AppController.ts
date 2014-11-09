///<reference path="../io/reference"/>
///<reference path="../model/reference"/>
///<reference path="../view/reference"/>

import ImageFilterFactoriesProviderImpl = require("../plugins/ImageFilterFactoriesProviderImpl");

import LocalImageLoaderView = require("../view/io/localImageLoader/LocalImageLoaderView");
import ImgElementToImageDataConverter = require("../io/ImgElementToImageDataConverter");

import FilteredImage = require("../model/FilteredImage");
import FilteredImageView = require("../view/filteredImageView/FilteredImageView");
import ImageFilterMenuView = require("../view/imageFilterMenuView/ImageFilterMenuView");
import AppliedImageFilterListView = require("../view/appliedImageFilterListView/AppliedImageFilterListView");

/**
 * HTMLから渡されるアプリケーションの設定
 */
export interface CanvasAppConfig {
    filteredImageView: HTMLElement;
    appliedImageFilterView: HTMLElement;
    imageFilterMenuView: HTMLElement;
    tmpContainer: HTMLElement;
}

/**
 * アプリ全体のコントローラー
 */
export class AppController {
    /**
     * フィルター処理後の画像
     */
    private filteredImage: FilteredImage;

    /**
     * フィルター処理後の画像ビュー
     */
    private filteredImageView: FilteredImageView;

    /**
     * @param config 設定オブジェクト
     */
    constructor(private config: CanvasAppConfig) {
    }

    /**
     * アプリの起動
     */
    start() {
        new LocalImageLoaderView(this.config.tmpContainer).open().then((imgElem: HTMLImageElement)=> {
            var converter = new ImgElementToImageDataConverter(this.config.tmpContainer);
            return converter.toImageData(imgElem)
        }).then((imageData: ImageData)=> {
            this.filteredImage = new FilteredImage("画像1", imageData);

            //画像処理フィルターが適用されている画像
            this.filteredImageView = new FilteredImageView(this.filteredImage, this.config.filteredImageView);
            this.filteredImageView.render();

            //画像処理フィルターリスト
            var imageFilterMenuView = new ImageFilterMenuView(
                this.config.imageFilterMenuView,
                ImageFilterFactoriesProviderImpl.get(),
                this.filteredImage
            );
            imageFilterMenuView.render();

            //適用されている画像フィルターのリスト
            var appliedImageFilterListView = new AppliedImageFilterListView(this.filteredImage, this.config.appliedImageFilterView);
            appliedImageFilterListView.render();
        });
    }
}
