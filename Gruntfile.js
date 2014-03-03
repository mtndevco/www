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
				'globals': {
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
				files: [{
					expand: true,
					cwd: 'gfx',
					src: ['*.{png,jpg,gif}'],
					dest: 'gfx'
				}]
			}
		},

	});

	// Load the plugins that provide the task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'requirejs', 'less', 'imagemin']);

};
