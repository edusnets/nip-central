// Karma configuration
// Generated on Fri Sep 01 2017 11:00:26 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'assets/bower_components/angular/angular.js',
      'assets/bower_components/angular-animate/angular-animate.js',
      'assets/bower_components/angular-aria/angular-aria.js',
      'assets/bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
      'assets/bower_components/angular-local-storage/dist/angular-local-storage.js',
      'assets/bower_components/angular-messages/angular-messages.js',
      'assets/bower_components/angular-minimal-grid/js/minimal-grid.js',
      'assets/bower_components/angular-mocks/angular-mocks.js',
      'assets/bower_components/angular-sanitize/angular-sanitize.js',
      'assets/bower_components/angular-ui-router/release/angular-ui-router.js',
      'assets/bower_components/jquery/dist/jquery.js',
      'assets/bower_components/bootstrap/dist/js/bootstrap.js',
      'assets/bower_components/bootstrap-daterangepicker/daterangepicker.js',
      'assets/bower_components/moment/moment.js',
      'assets/bower_components/pg.progress-bars/dist/pg.progress-bars.js',
      'src/**/*.js',
      'tests/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
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
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
