module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true,
        compress: true,
        report: true,
        screw_ie8: true,
        stats: true,
        preserveComments: false
      },
      build: {
        files: {
          '<%= pkg.name %>/static/js/bakery.min.js': ['<%= pkg.name %>/static/js/bakery.js']
        }
      }
    },
    jshint: {
      options: {
        ignores: ['<%= pkg.name %>/static/js/*.min.js']
      },
      files: ['<%= pkg.name %>/static/js/*.js'],
    },
    recess: {
      dist: {
        options: {
          compile: true,
        },
        files: {
          '<%= pkg.name %>/static/css/vendor/bootstrap.css': [
            '<%= pkg.name %>/static/less/vendor/bootstrap.less'
          ],
          '<%= pkg.name %>/static/css/<%= pkg.name %>.css': [
            '<%= pkg.name %>/static/less/<%= pkg.name %>.less'
          ],
        }
      },
      min: {
        options: {
          compile: true,
          compress: true,
        },
        files: {
          '<%= pkg.name %>/static/css/vendor/bootstrap.min.css': [
            '<%= pkg.name %>/static/less/vendor/bootstrap.less'
          ],
          '<%= pkg.name %>/static/css/<%= pkg.name %>.min.css': [
            '<%= pkg.name %>/static/less/<%= pkg.name %>.less'
          ],
        }
      }
    },
    watch: {
      less: {
        files: [
          '<%= pkg.name %>/static/less/*.less',
          '<%= pkg.name %>/static/less/vendor/*.less'
        ],
        tasks: ['recess']
      },
      // js: {
      //   files: [
      //     '<%= jshint.all %>'
      //   ],
      //   tasks: ['jshint', 'uglify']
      // }
    },
    clean: {
      dist: [
        'static/css/*.css',
        'static/css/vendor/*.css',
      ]
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'recess',
    'uglify',
  ]);

  // Default task(s).
  grunt.registerTask('dev', [
    'watch',
  ]);

  // Alias jshint to lint
  grunt.registerTask('lint', ['jshint']);

};
