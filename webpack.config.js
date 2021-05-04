const path = require('path');

module.exports = {
   entry: './src/preloadar.ts',
   module: {
     rules: [
       {
         test: /\.tsx?$/,
         use: 'ts-loader',
         exclude: /node_modules/,
       },
     ],
   },
   resolve: {
     extensions: ['.tsx', '.ts', '.js'],
   },
   output: {
     filename: 'preloadar.js',
     path: path.resolve(__dirname, 'dist'),
     library: 'preloadar',
     libraryTarget: 'umd',
     libraryExport: 'default',
   },
 };