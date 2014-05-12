'using strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


        connect: {
            server: {
                options: {
                    port: 3000,
                    //base: '',
                    livereload: true,
                    open: true,
                    hostname: '*' // this enables device testing within the local area network eg: 192.168.0.xxx
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                  jQuery: true
                },
            },
            beforeconcat: [
                'js/custom.js'
            ]

        },

        htmlhint: {
          html: {
            options: {
              'tag-pair': true
            },
            src: ['*.html']
          }
        },

        less: {
            dev: {
                files: {
                    'src/css/style.css': [
                        'src/less/style.less'
                    ]
                },
                options: {
                    compress: false,
                    sourceMap: true,
                    sourceMapFilename: 'src/css/style.css.map',
                    sourceMapURL: 'style.css.map'

                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint'],

            },
            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:dev'],
            },
            js: {
              files: ['js/*.js'],
              tasks: ['jshint'],
            }

        }


  });


  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', [
        'connect',
        'less',
        'watch',
        'jshint',
        'htmlhint'
    ]);


};
