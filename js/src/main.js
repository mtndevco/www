// Let's get config'd, yo!
require.config({
	paths: {
		'requirejs': '../libs/require',
		'jquery'   : '../libs/jquery',
		'modernizr': '../libs/modernizr'
	},

	include: 'requirejs', // Needed for r.js building

	shim: {

	}
});

require(['jquery', 'modernizr'], function($, Modernizr){
	// In hoc signo vinces.
	$(document).ready(function(){

		var size_areas = function size_areas(){
			$('#fold').height(
				$(window).height() - $('header').height()
			);
			$('#info').height(
				$(window).height()
			);
		};

		$(window).resize(function(){
			size_areas();
		});

		size_areas();

		(function(){

			var words = [
				// &#8209; is a non-breaking hyphen
				'beautiful',
				'pixel&#8209;perfect',
				'mobile',
				'well&#8209;built',
				'responsive'
			], i = 0;

			setInterval(function(){
				$('#rotate-word').fadeOut(function(){
					$(this).html(words[i=(i+1)%words.length]).fadeIn(300);
				});
			}, 5000);

		})();



	});
});
