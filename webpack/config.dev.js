// const { resolve } = require('path')
// const { Rewriter, Analyzer } = require('@css-blocks/jsx')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CssBlocksPlugin } = require('@css-blocks/webpack')
// const cssBlocksRewriter = require('@css-blocks/jsx/dist/src/transformer/babel')

// const paths = {
//   appIndexJs: './src/index.js'
// }

// const jsxCompilationOptions = {
//   compilationOptions: {},
//   optimization: {
//     rewriteIdents: true,
//     mergeDeclarations: true,
//     removeUnusedStyles: true,
//     conflictResolution: true,
//     enabled: false
//   }
// }

// const rewriter = new Rewriter()
// const analyzer = new Analyzer(paths.appIndexJs, jsxCompilationOptions)

// const { optimization, compilationOptions } = jsxCompilationOptions

// module.exports = {
//   mode: 'development',
//   watch: true,
//   entry: {
//     main: paths.appIndexJs
//   },
//   output: {
//     path: resolve('./dist'),
//     filename: 'bundle.[name].[hash].js'
//   },
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [
//           /* All Other Loaders Go Here */
//           {
//             loader: require.resolve('babel-loader'),
//             options: {
//               // presets: ['env', 'react', 'stage-2'],
//               cacheDirectory: true,
//               compact: true
//             }
//           },
//           {
//             loader: require.resolve('babel-loader'),
//             options: {
//               plugins: [cssBlocksRewriter.makePlugin({ rewriter })],
//               cacheDirectory: false,
//               compact: true,
//               parserOpts: {
//                 plugins: ['jsx']
//               }
//             }
//           },
//           {
//             loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
//             options: {
//               analyzer,
//               rewriter
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CssBlocksPlugin({
//       analyzer,
//       outputCssFile: 'blocks.css',
//       name: 'css-blocks',
//       compilationOptions,
//       optimization
//     }),
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     })
//   ],
//   devServer: {
//     contentBase: './dist',
//     host: 'localhost',
//     port: 3000,
//     historyApiFallback: true,
//     open: false
//   }
// }

// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')
// const CssBlocks = require('@css-blocks/jsx')
// const CssBlocksPlugin = require('@css-blocks/webpack').CssBlocksPlugin

// if (typeof process.env.NODE_ENV === 'undefined') {
//   process.env.NODE_ENV = 'development'
// }

// const paths = {
//   appIndexJs: './src/index.js'
// }

// const jsxCompilationOptions = {
//   compilationOptions: {},
//   optimization: {
//     rewriteIdents: true,
//     mergeDeclarations: true,
//     removeUnusedStyles: true,
//     conflictResolution: true,
//     enabled: process.env.NODE_ENV === 'production'
//   },
//   aliases: {}
// }

// const CssBlockRewriter = new CssBlocks.Rewriter(jsxCompilationOptions)
// const CssBlockAnalyzer = new CssBlocks.Analyzer(
//   paths.appIndexJs,
//   jsxCompilationOptions
// )

// const config = {
//   entry: [paths.appIndexJs],
//   mode: 'development',
//   module: {
//     rules: [
//       // {
//       //   test: /\.css$/,
//       //   use: ['style-loader', 'css-loader']
//       // },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: require.resolve('babel-loader'),
//             options: {
//               presets: [
//                 'react',
//                 'es2015',
//                 'stage-1'
//               ],
//               cacheDirectory: true,
//               compact: true
//             }
//           },

//           // Run the css-blocks plugin in its own dedicated loader because the react-app preset
//           // steps on our transforms' feet. This way, we are guaranteed a clean pass before any
//           // other transforms are done.
//           {
//             loader: require.resolve('babel-loader'),
//             options: {
//               plugins: [
//                 require('@css-blocks/jsx/dist/src/transformer/babel').makePlugin(
//                   { rewriter: CssBlockRewriter }
//                 )
//               ],
//               cacheDirectory: false,
//               compact: true,
//               parserOpts: {
//                 plugins: ['jsx']
//               }
//             }
//           },
//           // The JSX Webpack Loader halts loader execution until after all blocks have
//           // been compiled and template analyses has been run. StyleMapping data stored
//           // in shared `rewriter` object.
//           {
//             loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
//             options: {
//               analyzer: CssBlockAnalyzer,
//               rewriter: CssBlockRewriter
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CssBlocksPlugin({
//       analyzer: CssBlockAnalyzer,
//       outputCssFile: 'blocks.css',
//       name: 'css-blocks',
//       compilationOptions: jsxCompilationOptions.compilationOptions,
//       optimization: jsxCompilationOptions.optimization
//     }),
//     new HtmlWebpackPlugin({
//       template: 'src/index.html'
//     })
//   ],
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// }

// module.exports = config

const { Rewriter, Analyzer } = require('@css-blocks/jsx')
const { CssBlocksPlugin } = require('@css-blocks/webpack')

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

const rewriter = new Rewriter()
const analyzer = new Analyzer(
  './src/index.js',
  jsxCompilationOptions
)

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
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
                plugins: ['js']
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
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
}
