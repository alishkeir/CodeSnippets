const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

let mode = 'development';
// let target = 'web';

let id = 0;

const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default'],
    }),
    new SpriteLoaderPlugin(),
];

mode = 'production';
// Temporary workaround for 'browserslist' bug that is being patched in the near future
// target = 'browserslist';

if (process.env.SERVE) {
    // We only want React Hot Reloading in serve mode
    plugins.push(
        new HtmlWebpackPlugin({
            title: 'Production',
        })
    );
}

module.exports = {
    // mode defaults to 'production' if not set
    mode: mode,

    // This is unnecessary in Webpack 5, because it's the default.
    // However, react-refresh-webpack-plugin can't find the entry without it.
    entry: {
        index: './src/index.js',
        style: './src/assets/scss/bundle.scss',
    },
    output: {
        filename: (pathData) => {
            console.log(pathData.chunk.name);
            let bundleName = '';
            // return pathData.chunk.name === "main" ? "[name].js" : "[name]/[name].js";
            if (pathData.chunk.name) {
                bundleName = '[name].bundle.js';
            } else {
                id = id + 1;
                bundleName = `${id}.bundle.js`;
            }

            return bundleName;
        },
        // output path is required for `clean-webpack-plugin`
        path: path.resolve(__dirname, 'dist'),
        // this places all images processed in an image folder
        assetModuleFilename: 'images/[hash][ext][query]',
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },

        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({})],
        minimize: true,
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "css-loader",
                    // "postcss-loader",
                    // according to the docs, sass-loader should be at the bottom, which
                    // loads it first to avoid prefixes in your sourcemaps and other issues.
                    // "sass-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            url: false,
                        },
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                /**
                 * The `type` setting replaces the need for "url-loader"
                 * and "file-loader" in Webpack 5.
                 *
                 * setting `type` to "asset" will automatically pick between
                 * outputing images to a file, or inlining them in the bundle as base64
                 * with a default max inline size of 8kb
                 */
                type: 'asset',

                /**
                 * If you want to inline larger images, you can set
                 * a custom `maxSize` for inline like so:
                 */
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 30 * 1024,
                //   },
                // },
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: (filePath) =>
                        path.basename(filePath).slice(0, -4),
                    extract: true,
                },
            },
        ],
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        jquery: 'jQuery',
        $: 'jquery',
        jQuery: 'jquery',
    },
    plugins: plugins,

    // target: target,

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // required if using webpack-dev-server
    devServer: {
        contentBase: './dist',
        hot: true,
    },
};
