module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   options: {
    //     separator: ';',
    //   },
    //   dist: {
    //     src: ['public/lib/handlebars.js', 
    //           'public/lib/underscore.js', 
    //           'public/lib/jquery.js', 
    //           'public/lib/backbone.js',
    //           'public/client/*.js'
    //           ],

    //     dest: '_temp-dist/built.js',
    //   },
    // },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! Bagel - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'public/_dist/output.min.js': ['public/lib/handlebars.js', 
              'public/lib/underscore.js', 
              'public/lib/jquery.js', 
              'public/lib/backbone.js',
              'public/client/*.js'
              ]
        }
      }
    },

    jshint: {
      files: [
        'public/**/*.js',
        '*.js',
        'app/*.js',
        'app/**/*.js',
        'lib/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files: {
          'public/_dist/output.css': ['public/style.css']
        }
      }
    },

    // watch: {
    //   scripts: {
    //     files: [
    //       'public/client/**/*.js',
    //       'public/lib/**/*.js',
    //     ],
    //     tasks: [
    //       'concat',
    //       'uglify'
    //     ]
    //   },
    //   css: {
    //     files: 'public/*.css',
    //     tasks: ['cssmin']
    //   }
    // },

    shell: {
      prodServer: {
      }
    },

    clean: ['public/_dist/*']
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('bagel', ['jshint', 'uglify']);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
      // add your production server task here
  ]);


};
