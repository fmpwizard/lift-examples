module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      bootstrap: 'bower_components/components-bootstrap',
      fonts: '<%= dirs.bootstrap %>/fonts/',
      webapp: 'src/main/webapp',
      assets: '<%= dirs.webapp %>/assets',
      js: '<%= dirs.assets %>/js/',
      target: '<%= dirs.webapp %>/static',
      dist: '<%= dirs.target %>/dist'
    },
    appFiles : {
      js:  '<%= dirs.webapp %>/assets/js/*.js',
      css: '<%= dirs.webapp %>/assets/css/*.css'
    },
    delta : {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: [ 'jshint:gruntfile' ]
      },
      jssrc: {
        files: ['<%= appFiles.js %>'],
        tasks: [ 'jshint:src', 'requirejs']
      },
      cssmin: {
        files: ['<%= appFiles.css %>'],
        tasks: ['cssmin']
      },
      copyFonts: {
        tasks: 'copy'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        evil: true,
        globals: {
          'jQuery': false,
          '$': false,
          'angular': false,
          '_': false,
          'App': true
        },
        jshintrc: '.jshintrc'
      },
      src: [
        '<%= appFiles.js %>'
      ],
      gruntfile: {
        options: {
          globals: {
            'module': false,
            'require': false
          }
        },
        files: {
          src: ['Gruntfile.js']
        }
      }
    },
    clean: {
      build: ['<%= dirs.dist %>', '<%= dirs.target %>/fonts']
    },
    cssmin: {
      combine: {
        files: {
          '<%= dirs.dist %>/main.min.css': [
            '<%= dirs.bootstrap %>/css/bootstrap.css',
            '<%= dirs.bootstrap %>/css/bootstrap-theme.css',
            '<%= appFiles.css %>'
          ]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          paths: {
            jquery: 'bower_components/jquery/jquery',
            json2: 'bower_components/json2/json',
            bootstrap: '<%= dirs.bootstrap %>/js/bootstrap',
            main: '<%= dirs.js %>/main'
          },
          baseUrl: './',
          removeCombined: true,
          name: 'main',
          out: '<%= dirs.dist %>/main.min.js',
          optimize: 'uglify',
          uglify: {
            toplevel: true,
            'ascii_only': true,
            beautify: false,
            'max_line_length': 1000,
            //How to pass uglifyjs defined symbols for AST symbol replacement,
            //see "defines" options for ast_mangle in the uglifys docs.
            defines: {
              DEBUG: ['name', 'false']
            },

            //Custom value supported by r.js but done differently
            //in uglifyjs directly:
            //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
            'no_mangle': true
          }
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        //See https://github.com/gruntjs/grunt-contrib-copy/issues/58 for why we use cwd
        cwd: '<%= dirs.fonts %>',
        src: '*',
        dest: '<%= dirs.target %>/fonts/',
        filter: 'isFile'
      }
    }
  });

  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['clean', 'jshint', 'delta']);
  

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs', 'cssmin', 'copy']);

};