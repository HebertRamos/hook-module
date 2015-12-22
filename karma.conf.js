/**
 * Created by hramos on 12/11/2015.
 */

module.exports = function (config) {

  config.set({

      basePath: '',

      frameworks: ['jasmine', 'requirejs'],

      files: [

        {pattern: 'bower_components/jquery/jquery.js', included: false},
        {pattern: 'bower_components/angular/angular.js', included: false},

        {pattern: 'hook-module.js', included: false},
        {pattern: 'test/spec/hookModuleSpec.js', included: false},

        'test/main.js'
      ],
      // list of files to exclude
      exclude: [

      ],

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        //'assets/app/**/*.js': ['coverage']
      },


      // test results reporter to use
      reporters: [],

      junitReporter: {
        outputDir: 'test/reports/junit/',
        outputFile: 'TESTS-xunit.xml',
        useBrowserName: false
        //suite: 'spec'
      },

      coverageReporter: {
        type : 'lcov',
        dir : '.tmp/reports/coverage/',
        subdir: '.'
      },


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
      browsers: ['PhantomJS'],

      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true
    }
  )
  ;
};
