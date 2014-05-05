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

        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint'],

            }

        }


  });


  require('load-grunt-tasks')(grunt);


  grunt.registerTask('default', [
        'connect',
        'watch',
        'jshint',
        'htmlhint'
    ]);


};
