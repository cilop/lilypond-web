module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: [ 'lib/{,*/}*.js']
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/client/.jshintrc'
        },
        src: ['test/client/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
          'app/scripts/concat.js'
          ]
        }]
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          // cwd: '.tmp/concat/scripts',
          cwd: 'app/scripts',
          src: 'concat.js',
          dest: 'app/scripts'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'app/scripts/scripts.js': [
            'app/scripts/concat.js'
          ]
        }
      }
    },

    concat: {
      dist: {
        files: {
          'app/scripts/concat.js' : [
            'app/scripts/helper.js',
            'app/scripts/svg/musicSVG.js',
            'app/scripts/svg/paths.js',
            'app/scripts/leftBar.js',
            'app/scripts/documentView.js',
            'app/scripts/app.js',
            'app/scripts/lyGenerator.js',
            'app/scripts/data.js',
            'app/scripts/actions.js',
            'app/scripts/main.js'
          ]
        }
      }
    }

  });


  grunt.registerTask('build', [
    'concat',
    'ngmin',
    'uglify',
    'clean:dist'
    ]);

};
