/**
 * Created by Hramos on 22/12/2015.
 */
/**
 * Created by hramos on 24/08/2015.
 */

var _ = require('underscore');


module.exports = function (grunt) {

    grunt.initConfig({
            karma: {
                unit: {
                    configFile: 'karma.conf.js'
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-karma');

};

