
module.exports = {
    entry: './index.js',
    output: {
        filename: 'canvastrigger.min.js',
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
