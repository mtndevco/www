module.exports = function(grunt) {
	var requirejs_files = grunt.file.expand('js/src/*.js');
	var requirejs_options = {};

	requirejs_files.forEach(function(file) {
		var filename = file.split('/').pop(),
			filename_without_extension = filename.split('.').shift();

		requirejs_options[filename] = {
			options: {
				baseUrl: 'js/src',
				mainConfigFile: 'js/src/'+filename,
				name: filename_without_extension,
				out: 'js/'+filename_without_extension+'.min.js'
			}
		};
	});

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					'require': true,
					'document': true,
					'window': true
				}
			},
			all: ['Gruntfile.js', 'js/src/*.js']
		},

		requirejs: requirejs_options,

		less: {
			development: {
				options: {
					paths: ['css'],
					compress: true,
					cleancss: true,
					report: 'gzip'
				},
				files: [{
					expand: true,
					cwd: 'css/src',
					src: ['*.less'],
					dest: 'css',
					ext: '.min.css',
				}],
			}
		},

		imagemin: {
			dynamic: {
				options: {
					cache: false
				},
				files: [{
					expand: true,
					cwd: 'gfx/src',
					src: ['*.{png,jpg,gif}'],
					dest: 'gfx'
				}]
			}
		},

		githooks: {
			all: {
				// Will run the jshint and test:unit tasks at every commit
				'pre-commit': 'default',
			}
		},

		watch: {
			js: {
				files: [
					'js/src/*.js',
					'js/libs/*.js',
					'js/libs/**/*.js',
					'js/libs/**/**/*.js'
				],
				tasks: ['js'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: [
					'css/src/*.less',
					'css/libs/*.less',
					'css/libs/**/*.less',
					'css/libs/**/**/*.less'
				],
				tasks: ['css'],
				options: {
					spawn: false,
				},
			},
		},

	});

	// Load the plugins that provide the task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-githooks');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'requirejs', 'less', 'imagemin']);
	grunt.registerTask('js', ['jshint', 'requirejs']);
	grunt.registerTask('css', 'less');
	grunt.registerTask('gfx', 'imagemin');
	grunt.registerTask('hooks', 'githooks');

};
