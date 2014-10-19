///<reference path="../model/reference.ts"/>
///<reference path="AutoBinalizeFilter.ts"/>

import ImageFilterFactoriesProvider = require("../model/imageFilter/ImageFilterFactoriesProvider");

import AutoBinalizeFilter = require("./AutoBinalizeFilter");

//将来的にビルドプロセスで自動化する
var provider =
    new ImageFilterFactoriesProvider()
        .add(AutoBinalizeFilter);

export = provider;
