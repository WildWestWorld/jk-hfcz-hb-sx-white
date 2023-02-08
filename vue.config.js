const { defineConfig } = require('@vue/cli-service')


const isProduction = process.env.NODE_ENV === 'production';

const CompressionPlugin = require("compression-webpack-plugin");


const Timestamp = new Date().getTime();



module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,　　//关闭语法检查

    // /bank/abc/abc_hb_zebz/public/
    publicPath: "/active/library/abc_2nmrjk/",


    // 打包
    configureWebpack: (config) => {
        if (isProduction) {

            config.plugins.push(
                new CompressionPlugin({
                    algorithm: "gzip",
                    threshold: 1024, // 对超过1k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                })
            );

            config.externals = {
                // 'vue': 'Vue',
                // 'vuex': 'Vuex',
                // 'vue-router': 'VueRouter',
            };


            // config.output.filename = 'js/[name].' + Timestamp + '.js' //这种方式适合设备缓存不严重的
            // config.output.chunkFilename = 'js/[name].' + Timestamp + '.js'   //这种是给打包后的chunk文件加版本号。


        }
    },

    // css: {
    //     extract: {
    //         filename: `css/[name].${Timestamp}.css`,
    //         chunkFilename: `css/[name].${Timestamp}.css`
    //     }
    // },





    devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
        port: 8080,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'https://saas.cardwinner.com/',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''                     //选择忽略拦截器里面的内容
                }
            }
        },


        // 开启https
        https: true
    },




})
