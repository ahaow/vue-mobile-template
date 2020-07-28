const path = require("path")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const CompressionPlugin = require("compression-webpack-plugin")
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin")

module.exports = {
    publicPath: "/",
    lintOnSave: false, // 关闭eslint
    css: {
        extract: true,
        sourceMap: true,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 100
                    })
                ]
            }
        }
    },
    configureWebpack: (config) => {
        const plugins = [];
        if (process.env.NODE_ENV === "production") {
            plugins.push(
                // 使用 webpack-bundle-analyzer 对打包项目可视化分析
                new BundleAnalyzerPlugin()
            )
            plugins.push(
                // 使用 compression-webpack-plugin 对打包项目Gzip压缩
                new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,  // 匹配文件名
                    threshold: 10240,  // 对超过10kb的数据进行压缩
                    deleteOriginalAssets: false // 是否删除原文件
                })
            )
        }
        plugins.push(
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.join(__dirname, './src/skeleton/entry-skeleton.js')
                    }
                },
                minimize: true,
                quiet: true,
                router: {
                    mode: "hash",
                    routes: [
                        { path: '/home', skeletonId: 'skeleton2' },
                        { path: '/user', skeletonId: 'skeleton1' },
                    ]
                }
            })
        )
        config.plugins = [...config.plugins, ...plugins]

        config.externals = {
            'jquery': 'jquery'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false,
        open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    },
    // proxy: {
    //     '/api': {
    //         target: 'https://www.mock.com',
    //         ws: true, // 代理的WebSockets
    //         changeOrigin: true, // 允许websockets跨域
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // }

}