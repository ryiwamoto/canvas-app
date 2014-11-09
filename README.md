# 画像処理Webアプリ
画像処理の勉強に作っていたアプリ。

- webpack + typescript
- TypeScriptでJavaっぽいクラス構成
- プラグインアーキテクチャ

などの練習・調査にも使った。

## インストール
```bash
npm install -g gulp bower tsd simple-server
npm install
bower install
tsd install
gulp full-build
simple-server 3000
open localhost:3000/index.html
```

## 開発中
```bash
gulp watch
```

## TODO
- プラグインの種類を増やす(変形・リサイズ・輪郭抽出などなど)
- 画像処理フィルターを設定ダイアログでパラメーターを変更できるようにする
- プラグインの自動読込
