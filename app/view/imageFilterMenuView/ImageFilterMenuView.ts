///<reference path="../../model/reference.ts"/>
///<reference path="./image_filter_menu_view.d.ts"/>
///<reference path="../../lib/jquery/jquery.d.ts"/>

import template = require("./image_filter_menu_view");
import ImageFilterFactory = require("../../model/imageFilter/ImageFilterFactory");
import FilteredImage = require("../../model/FilteredImage");

/**
 * 画像処理フィルターの一覧を表示するビュー
 */
class ImageFilterMenuView {
    static menuItemClassName: string = ".js_image-filter-menu-item";
    /**
     * コンテナHTML要素
     */
    private  container: JQuery;

    /**
     * @param container コンテナHTML要素
     * @param factories メニューに表示する画像処理フィルターのファクトリの配列
     * @param filteredImage 処理後の画像
     */
    constructor(container: HTMLElement, private factories: ImageFilterFactory[], private filteredImage: FilteredImage) {
        this.container = $(container);
        this.container.on("click", ImageFilterMenuView.menuItemClassName, this.onItemClicked.bind(this));
    }

    render(): void {
        this.container.html(template({
            items: this.factories
        }));
    }

    onItemClicked(event: JQueryEventObject): void {
        event.preventDefault();
        var factory = this.factories[this.container.find(ImageFilterMenuView.menuItemClassName).index(<Element>event.currentTarget)];
        //TODO: 設定ビューを表示して、決定したときに生成するようにする
        this.filteredImage.addImageFilter(factory.create(null));
    }
}
export = ImageFilterMenuView
