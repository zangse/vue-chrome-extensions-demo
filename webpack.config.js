var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var copyWebpackPlugin = require('copy-webpack-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ZipPlugin = require('zip-webpack-plugin');
var projectName = getProjectName();
process.traceDeprecation = true;
var uglifyJsConfig = {
    sourceMap: true,
    compress: {
        warnings: false,
        drop_console: false
    }
}
// 配置插件
var webpackPlugin = [
    new cleanWebpackPlugin(
        ['dist/*', __dirname + '/' + projectName + '.zip'], 　 //匹配删除的文件
        {
            root: __dirname,
            verbose: true,
            dry: false
        }
    ),
    new htmlWebpackPlugin({
        filename: 'option.html',
        template: 'src/option/option.html',
        inject: 'body',
        chunks: ["option"],
        minify: { //压缩
            removeComments: true,
            collapseWhitespace: true,
        }
    }),
    new htmlWebpackPlugin({
        filename: 'popup.html',
        template: 'src/popup/popup.html',
        inject: 'body',
        chunks: ["popup"],
        minify: { //压缩
            removeComments: true,
            collapseWhitespace: true,
        }
    }),
    // copy custom static assets
    new copyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/static/'),
        to: 'static',
        ignore: ['.*']
    }, {
        from: path.resolve(__dirname, 'src/manifest.json'),
        to: path.resolve(__dirname, 'dist/')
    }, {
        from: path.resolve(__dirname, 'src/_locales/'),
        to: path.resolve(__dirname, 'dist/_locales')
    }]),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin(uglifyJsConfig),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin('css/[name].css')
];
if (process.env.NODE_ENV === 'production') {
    // 清除console信息
    uglifyJsConfig.compress.drop_console = true;
    // 将文件打包压缩
    var packageZip = new ZipPlugin({
        path: path.resolve(__dirname, ''),
        filename: projectName + '.zip'
    })
    // 将dist文件打包成zip
    webpackPlugin.push(packageZip);
}
module.exports = {
    entry: {
        option: './src/option/main.js',
        popup: './src/popup/main.js',
        background: './src/background/background.js',
        content: './src/content/content.js'
    }, //入口文件
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: '[name].main.js'
    },
    plugins: webpackPlugin,
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': resolve('src'),
            'assets': resolve('assets')
        }
    },
    performance: {
        hints: false
    },
    devtool: '#source-map'
}

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getProjectName() {
    return __dirname.split('/').pop()
}