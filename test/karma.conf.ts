const path = require('path');
import {
  Config as KarmaConfig,
  ConfigOptions as KarmaConfigOptions,
} from 'karma';
import {
  Configuration as WebpackConfig,
} from 'webpack';
import {
  // Options,
} from 'webpack-dev-middleware';

type ConfigOptions = KarmaConfigOptions & {
  webpack: WebpackConfig,
  // webpackMiddleware: Options,
}
type ConfigType = KarmaConfig & {
  set: (config: ConfigOptions) => void;
}


type TestType = {
  a: number,
} & {
  b: number,
};
export const a: TestType = {
  a: 1, b: 2
};
module.exports = function(config: ConfigType) {
  config.set({
    captureTimeout: 2000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 10000,
    mime: {
      'application/javascript': ['ts','tsx']
    },
    frameworks: [
      'jasmine',
      // 'karma-typescript',
    ],
    files: [
      // all files ending in "_test"
      // 'test/*_test.ts',
      'babel-polyfill',
      'test/**/*_test.ts',
      'test/*.ts',
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*.ts': ['webpack'],
      'test/**/*_test.ts': ['webpack'],
      'src/*.ts': ['webpack'],
    },
    webpack: {
      // you don't need to specify the entry option because
      // karma watches the test entry points
      // webpack watches dependencies

      // ... remainder of webpack configuration (or import)
      entry: {
        worker: path.join(
          __dirname, 'test/worker.ts'
        ),
      },
      resolve: {
        extensions: [
          '.js', '.es6', '.jsx',
          '.ts', '.tsx',
        ],
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: 'babel-loader!ts-loader',
            include: [
              path.join(__dirname, 'src'),
              path.join(__dirname, 'test'),
            ],
            exclude: /node_modules/,
          }, {
            test: /\.tsx$/,
            loader: 'babel-loader!ts-loader',
            exclude: /node_modules/,
          }
        ]
      }
    },

    // webpackMiddleware: {
    //   // noInfo: true,
    //   // stats: {
    //   //   chunks: false
    //   // }
    // },

    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      // require('karma-typescript'),
    ],

  });
};
