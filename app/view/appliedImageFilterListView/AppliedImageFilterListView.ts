///<reference path="../../model/reference.ts"/>
///<reference path="./applied_image_filter_list_view.d.ts"/>
///<reference path="../../lib/jquery/jquery.d.ts"/>
///<reference path="../../lib/jqueryui/jqueryui.d.ts"/>
/// <amd-dependency path="./style.css" />

import ImageFilter = require("../../model/imageFilter/ImageFilter");
import FilteredImage = require("../../model/FilteredImage");
import FilteredImageEvents = require("../../model/FilteredImageEvents");
import template = require("./applied_image_filter_list_view");

/**
 * 適用された画像フィルターの一覧を表示するリスト
 */
class AppliedImageFilterListView implements FilteredImageEvents.FilteredImageEventListener {

    /**
     * @param filteredImage 画像処理フィルターが適用されている画像
     * @param container コンテナHTML要素
     */
    constructor(private filteredImage: FilteredImage, private container: HTMLElement) {
        this.filteredImage.addEventListener(this);
        $(this.container).on("click", ".close", (event: JQueryEventObject)=> {
            this.filteredImage.removeImageFilter(parseInt($(event.currentTarget).data("index"), 10));
        });
    }

    /**
     * 画像処理フィルターが変化したときのコールバック
     * @param event
     */
    onFilterChanged(event: FilteredImageEvents.FilterChangedEvent): void {
        this.render();
    }

    /**
     * HTML要素に描画する
     */
    render(): void {
        this.container.innerHTML = template({filters: this.filteredImage.appliedImageFilters});
        this.whenFilterIsSorted((from: number, to: number)=> {
            this.filteredImage.moveImageFIlter(from, to);
        });
    }

    private whenFilterIsSorted(handler: (from: number, to: number) =>void): void {
        //remove sortable functionality for previous elements completely.
        $(this.container).find(".applied-image-filter-list").sortable().sortable("destroy");

        //make sortable
        var $list = $(this.container).find(".applied-image-filter-list");
        var from: number = null;
        $list.sortable({cursor: "move"})
            .disableSelection()
            .on("sortstart", (event: JQueryEventObject, ui: JQueryUI.SortableUIParams)=> {
                from = $list.find("li").index(ui.item);
            })
            .on("sortupdate", (event: JQueryEventObject, ui: JQueryUI.SortableUIParams)=> {
                var to = $list.find("li").index(ui.item);
                handler(from, to);
            });
    }
}

export = AppliedImageFilterListView;