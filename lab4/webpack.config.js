module.exports = {
    entry: './public/clientJS/socket.js',
    output: {
        path: __dirname + '/public/productionClientJSWebPack',
        filename: "result.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    loader: "remove-flow-types-loader",
                },
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: {
                    loader: 'style-loader!css-loader!less-loader'
                }
            }
            ],
    },
    watch: true
}