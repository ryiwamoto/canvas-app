///<reference path="../model/reference.ts"/>
///<reference path="AutoBinalizationFilter.ts"/>

import ImageFilterFactoriesProvider = require("../model/imageFilter/ImageFilterFactoriesProvider");

import AutoBinalizationFilter = require("./AutoBinalizationFilter");
import DetherBinalizationFilter = require("./DetherBinalizationFilter");

//将来的にビルドプロセスで自動化する
var provider =
    new ImageFilterFactoriesProvider()
        .add(AutoBinalizationFilter)
        .add(DetherBinalizationFilter);

export = provider;
