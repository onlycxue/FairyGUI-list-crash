var fs = require("fs");
var path = require("path");
var TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;
var webpack = require("webpack");

module.exports={
    // target:"node",
    entry:{
        main: [ "./src/Main.ts"]
    },
    output:{
        filename:"main.js",
        path: __dirname + '/dist/js'
    },
    devtool:"inline-source-map",
    resolve:{
        extensions: [".ts",".tsx",".js",".json"],
        plugins:[
            new TsConfigPathsPlugin(fs.readFileSync("./tsconfig.json").toJSON())
        ]
    },
    module:{
        rules:[
            {test:/\.tsx?$/,loader:"awesome-typescript-loader"},
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        // contentBase: path.join(__dirname,"dist"),
        // compress: true,
        hot: true,
        port:9009,
        stats:{
            warnings: false
        }
    },
    externals:{
        // jsonp:"jsonp"
    }
}