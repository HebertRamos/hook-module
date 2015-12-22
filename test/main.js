/**
 * Created by hramos on 14/12/2015.
 */

loadUnitTest = function () {
    var allTestFiles = [];
    if (window.__karma__) {
        var TEST_REGEXP = /Spec\.js$/;

        var pathToModule = function (path) {
            return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
        };

        Object.keys(window.__karma__.files).forEach(function (file) {

            if (TEST_REGEXP.test(file)) {
                // Normalize paths to RequireJS module names.
                allTestFiles.push(file);
            }
        });
    }
    return allTestFiles;
};

require.config({

    name: 'main',

    waitSeconds: 20,

    paths: {

        'jquery'        : 'base/bower_components/jquery/jquery'                                 ,
        'angular'       : 'base/bower_components/angular/angular'

    },

    shim: {

        jquery: {
            exports: '$'
        },
         angular: {
            deps: ['jquery'],
            exports: 'angular'
        }
    },

    priority: [
        'jquery',
        'angular'
    ],
    deps: loadUnitTest(),
    callback: window.__karma__.start,
    baseUrl: ''
});


