/**
 * HTMLから渡されるアプリケーションの設定
 */
interface CanvasAppConfig {
    filteredImageView: HTMLElement;
    appliedImageFilterView: HTMLElement;
    imageFilterMenuView: HTMLElement;
    tmpContainer: HTMLElement;
}
declare var CanvasAppConfig: CanvasAppConfig;

export = CanvasAppConfig;

