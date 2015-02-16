/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configuration for the application
    var appConfig = require('./bower.json').gruntConfig;

    grunt.initConfig({
        config: appConfig,

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.temp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.temp %>/styles/'
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.temp %>',
                        '<%= config.dist %>/{,*/}*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '<%= config.temp %>'
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= config.app %>/styles',
                cssDir: '<%= config.temp %>/styles',
                generatedImagesDir: '<%= config.temp %>/images/generated',
                imagesDir: '<%= config.app %>/images',
                javascriptsDir: '<%= config.app %>/scripts',
                fontsDir: '<%= config.app %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= config.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Compile satellite and it's components for use in the demo and build
        concat: {
            options: {
                separator: "\n"
            },
            server: {
                src: ['<%= config.src %>/*.js', '<%= config.src %>/**/*.js'],
                dest: '<%= config.temp %>/scripts/<%= config.packageName %>.js'
            },
            dist: {
                src: ['<%= config.src %>/**/*.js'],
                dest: '<%= config.dist %>/<%= config.packageName %>.js'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server',
                'concat:server'
            ],
            dist: [
                'compass:dist',
                'concat:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static(appConfig.temp),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        jshint: {
            options: {
                //jshintrc:       '.jshintrc',
                reporter:       require('jshint-stylish'),
                globalstrict:   true,
                node:           true,
                loopfunc:       true,
                browser:        true,
                devel:          true,

                globals: {
                    angular:    false,
                    $:          false,
                    moment:     false,
                    Pikaday:    false,
                    module:     false,
                    forge:      false
                }
            },

            server: {
                src: [
                    'Gruntfile.js',
                    '<%= config.src %>/{,*/}*.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ]
            },

            dist: {
                files: [
                    'Gruntfile.js',
                    '<%= config.src %>/{,*/}*.js',
                    '<%= config.app %>/scripts/{,*/}*.js'
                ]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            build: {
                files:  {},
                src:    '<%= config.src %>/**/*.js',
                dest:   '<%= config.packageName %>.min.js'
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            js: {
                files: [
                    '<%= config.app %>/scripts/{,*/}*.js',
                    '<%= config.src %>/{,*/}*.js'
                ],
                tasks: ['newer:jshint:server','concat:server'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.temp %>/styles/{,*/}*.css',
                    '<%= config.temp %>/scripts/{,*/}*.js',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }

        },

        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.scss'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    // Default task(s).
    //grunt.registerTask('default', ['jshint:beforeconcatQ', 'uglify:build']);


    grunt.registerTask('live-reload', ['serve']);

};