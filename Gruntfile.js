/**
 * grunt-pagespeed-ngrok
 * http://www.jamescryer.com/grunt-pagespeed-ngrok
 *
 * Copyright (c) 2014 James Cryer
 * http://www.jamescryer.com
 */
'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
    pagespeed: {
      options: {
        nokey: true,
        locale: "en_GB",
        threshold: 40
      },
      local: {
        options: {
          strategy: "desktop"
        }
      },
      mobile: {
        options: {
          strategy: "mobile"
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'production/css/style.min.css': ['css/style.css'],
          'production/css/print.min.css': ['css/print.css'],
          'views/production//css/style.min.css': ['views/tidy-bootstrap']
        }
      }
    }
    uncss: {
      dist: {
        src: ['views/pizza.html'],
        dest: 'views/tidy-bootstrap.css',
        options: {
          report: 'min' // optional: include to report savings
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'production/img/'
        },
        {
          expand: true,
          cwd: 'views/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'views/production/images/'
        }]
      }
    },
    uglify: {
      js: {
        files: {
          'production/js/all.min.js': ['production/js/all.js'],
          'views/production/js/all.min.js': ['views/production/all.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-grunt-contrib-uglify');

  // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 9292;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

  // Register default tasks
  grunt.registerTask('default', ['newer:uglify:js','newer:imagemin','newer:uncss', 'newer:cssmin', 'psi-ngrok']);
}
