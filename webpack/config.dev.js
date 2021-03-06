const { Rewriter, Analyzer } = require('@css-blocks/jsx')
const { CssBlocksPlugin } = require('@css-blocks/webpack')
const path = require('path')
const cssBlocksRewriter = require('@css-blocks/jsx/dist/src/transformer/babel')

const jsxCompilationOptions = {
  compilationOptions: {},
  optimization: {
    rewriteIdents: true,
    mergeDeclarations: true,
    removeUnusedStyles: true,
    conflictResolution: true
  }
}
const distFolder = path.resolve(__dirname, '../dist')
const rewriter = new Rewriter()
const analyzer = new Analyzer(
  __dirname + '/src/index.jsx',
  jsxCompilationOptions
)

module.exports = {
  entry: ['./src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['env', 'react', 'stage-2'],
              cacheDirectory: true,
              compact: true
            }
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [cssBlocksRewriter.makePlugin({ rewriter })],
              parserOpts: {
                plugins: ['jsx']
              }
            }
          },
          {
            loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
            options: {
              analyzer,
              rewriter
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CssBlocksPlugin({
      analyzer,
      outputCssFile: 'bundle.css',
      compilationOptions: jsxCompilationOptions.compilationOptions,
      optimization: jsxCompilationOptions.optimization
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: distFolder,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    port: 3000
  }
}
