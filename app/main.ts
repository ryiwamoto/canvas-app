///<reference path="./io/reference"/>
///<reference path="./model/reference"/>
///<reference path="./view/reference"/>

import appConfig = require("./view/AppConfigLoader");
import ImageFilterFactoriesProviderImpl = require("./plugins/ImageFilterFactoriesProviderImpl");

import LocalImageLoaderView = require("./view/io/localImageLoader/LocalImageLoaderView");
import ImgElementToImageDataConverter = require("./io/ImgElementToImageDataConverter");

import FilteredImage = require("./model/FilteredImage");
import FilteredImageView = require("./view/filteredImageView/FilteredImageView");
import ImageFilterMenuView = require("./view/imageFilterMenuView/ImageFilterMenuView");
import AppliedImageFilterListView = require("./view/appliedImageFilterListView/AppliedImageFilterListView");

window.addEventListener("load", ()=> {
    new LocalImageLoaderView(appConfig.tmpContainer).open().then((imgElem: HTMLImageElement)=> {
        var converter = new ImgElementToImageDataConverter(appConfig.tmpContainer);
        return converter.toImageData(imgElem)
    }).then((imageData: ImageData)=> {
        var filteredImage = new FilteredImage("画像1", imageData);

        //画像処理フィルターが適用されている画像
        var filteredImageView = new FilteredImageView(filteredImage, appConfig.filteredImageView);
        filteredImageView.render();

        //画像処理フィルターリスト
        var imageFilterMenuView = new ImageFilterMenuView(
            appConfig.imageFilterMenuView,
            ImageFilterFactoriesProviderImpl.get(),
            filteredImage
        );
        imageFilterMenuView.render();

        //適用されている画像フィルターのリスト
        var appliedImageFilterListView = new AppliedImageFilterListView(filteredImage, appConfig.appliedImageFilterView);
        appliedImageFilterListView.render();
    });
});
