const webpack = require('webpack');
const path = require('path');

// PostCSS plugins
const atImport = require('postcss-import');
const postCSSVariables = require('./src/postcss-variables.js');

module.exports = {
	entry: [path.resolve(__dirname, 'src/index.js')],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
	},
  devServer: {
		contentBase: 'public'
	},

	module: {
		loaders: [
			{
				test: /\.(es6|js)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
      {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader']
      },
			{
				test: /\.(png|jpg|svg|ico)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000'
			}
		]
	},
  plugins: [
   new webpack.LoaderOptionsPlugin({
      loader: 'postcss-loader',
      options: {
        postcss: function() {
          return [
            atImport({
              from: ''
            }),
            postCSSVariables({
              cssModules: true
            }),
          ]
        },
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: false,
      comments: true,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
     'react': 'react',
     'react-dom': 'react-dom',
     '@watson-iot/ui-components-react': '@watson-iot/ui-components-react',
     '@watson-iot/ui-primitives-react': '@watson-iot/ui-primitives-react'
    })
  ],
	resolve: {
		extensions: ['.js', '.es6']
	}
}
