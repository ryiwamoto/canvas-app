///<reference path="../model/reference.ts"/>
///<reference path="AutoBinalizeFilter.ts"/>

import ImageFilterFactoriesProvider = require("../model/imageFilter/ImageFilterFactoriesProvider");

import AutoBinalizeFilter = require("./AutoBinalizeFilter");
import DetherBinalizationFilter = require("./DetherBinalizationFilter");

//将来的にビルドプロセスで自動化する
var provider =
    new ImageFilterFactoriesProvider()
        .add(AutoBinalizeFilter)
        .add(DetherBinalizationFilter);

export = provider;
