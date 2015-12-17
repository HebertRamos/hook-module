/**
 * Created by hramos on 14/12/2015.
 */
require.config({

    name: 'main',

    waitSeconds: 20,

    paths: {
        'jasmine'       : './../bower_components/jasmine-core/lib/jasmine-core/jasmine'         ,
        'jasmine-html'  : './../bower_components/jasmine-core/lib/jasmine-core/jasmine-html'    ,
        'jasmine-boot'  : './../bower_components/jasmine-core/lib/jasmine-core/boot'            ,

        'jquery'        : './../bower_components/jquery/jquery'                                 ,
        'angular'       : './../bower_components/angular/angular'
    },

    shim: {
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        },
        jquery: {
            exports: '$'
        },
         angular: {
            deps: ['jquery'],
            exports: 'angular'
        }
    }
});

define([
    'jasmine-boot'
], function(){
   
    var specsToRun = ['./spec/hookModuleSpec'];

    require(specsToRun, function () {
        window.onload();
    })
});
