//webpack.config.js

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [ './src/index'],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'	
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor:{
				warnings: false	
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	],
	module: {
		loaders: [{
			test: /\.less$/, 
			loader: 'style-loader!css-loader!less-loader'
		},{
			test: /\.css$/,
			loaders: ['style','css']
		},{
			//test: /\.(png|jpg)$/,
			test: /\.(png|jpg)$/, 
			loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
			/*loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
            			'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]*/
		},{
			test: /\.js$/,
			loader: "babel",
			query: {presets:['es2015']}
		}]
	}
}
