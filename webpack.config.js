var path = require("path");
module.exports = {
    entry: './index.js',
    output: {
        filename: 'canvastrigger.min.js',
        path:path.resolve()
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    mode:'development'
}
