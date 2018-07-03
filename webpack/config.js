const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CssBlocks = require('@css-blocks/jsx')
const { CssBlocksPlugin } = require('@css-blocks/webpack')
const cssBlocksRewriter = require('@css-blocks/jsx/dist/src/transformer/babel')

const jsxCompilationOptions = {
  compilationOptions: {},
  types: 'typescript',
  optimization: {
    rewriteIdents: true,
    mergeDeclarations: true,
    removeUnusedStyles: true,
    conflictResolution: true,
    enabled: true
  },
  aliases: {}
}
const paths = {
  appIndexJs: './src/index.js'
}
const CssBlockRewriter = new CssBlocks.Rewriter()
const CssBlockAnalyzer = new CssBlocks.Analyzer(
  paths.appIndexJs,
  jsxCompilationOptions
)
const cssBlockRewriterPlugin = cssBlocksRewriter.makePlugin(
  {
    rewriter: CssBlockRewriter
  }
)
const { optimization, compilationOptions } = jsxCompilationOptions

module.exports = {
  mode: 'production',
  entry: {
    main: paths.appIndexJs
  },
  output: {
    path: resolve('./dist'),
    filename: 'bundle.[name].[hash].js'
  },
  devtool: 'source-map',
  module: {
    /* ... */
    rules: [
      /* ... */
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // {
      //   test: /\.[j|t]s(x?)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     /* All Other Loaders Go Here */

      //     {
      //       loader: require.resolve('babel-loader'),
      //       options: {
      //         plugins: [cssBlockRewriterPlugin],
      //         cacheDirectory: true,
      //         compact: true,
      //         parserOpts: {
      //           plugins: ['jsx']
      //         }
      //       }
      //     },

      //     // The JSX Webpack Loader halts loader execution until after all blocks have
      //     // been compiled and template analyses has been run. StyleMapping data stored
      //     // in shared `rewriter` object.
      //     // {
      //     //   loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
      //     //   options: {
      //     //     analyzer: CssBlockAnalyzer,
      //     //     rewriter: CssBlockRewriter
      //     //   }
      //     // }
      //   ]
      // }
    ]
	},
  plugins: [
    new HtmlWebpackPlugin(),
    // new CssBlocksPlugin({
    //   analyzer: CssBlockAnalyzer,
    //   outputCssFile: 'blocks.css',
    //   name: 'css-blocks',
    //   compilationOptions,
    //   optimization
    // })
  ]
}
