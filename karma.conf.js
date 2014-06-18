// Karma configuration
// Generated on Wed Jun 04 2014 19:38:06 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'app/lib/angularjs/angular.min.js',
        'app/lib/angularjs/angular-ui-router.min.js',

        'test/lib/sinon.js',
        'test/lib/angular-mocks.js',

        'app/app.js',

        'app/catalog/**/*.js',
        'app/sorting/**/*.js',
        'app/wizard/**/*.js',

        'test/**/*-specs.js'
    ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/catalog/**/*.js': ['jshint'],
        'app/sorting/**/*.js': ['jshint'],
        'app/wizard/**/*.js': ['jshint'],

        'test/catalog/**/*.js': ['jshint'],
        'test/sorting/**/*.js': ['jshint'],
        'test/wizard/**/*.js': ['jshint']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
