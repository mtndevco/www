// Let's get config'd, yo!
require.config({
	paths: {
		'requirejs': '../libs/require',
		'jquery'   : '../libs/jquery',
		'fittext'  : '../libs/jquery.fittext'
	},

	include: 'requirejs', // Needed for r.js building

	shim: {

	}
});

require(['jquery', 'fittext'], function($){
	// In hoc signo vinces.
	$(document).ready(function(){

		// Resize the content areas
		var size_areas = function size_areas(){
			$('#fold').height(
				$(window).height() - $('header').height()
			);
			//	$('#info').height(
			//		$(window).height()
			//	);

			//	var container_width = $('#info > ul').width(),
			//		li_width = $('#info > ul > li').width(),
			//		gutter = Math.floor((container_width - (li_width * 4)) / 4);

			//	if (gutter > 0) {
			//		$('#info > ul > li').css('margin-right', gutter);
			//		$('#info > ul > li:first-child').css('margin-left', gutter / 2);
			//		$('#info > ul > li:last-child').css('margin-right', gutter / 2);
			// }
		};

		$(window).resize(function(){
			size_areas();
		});

		size_areas();

		// Fit text
		$('#info > p').fitText(4);

		// Swap words
		(function(){

			var words = [
				// &#8209; is a non-breaking hyphen
				'responsive&nbsp;',
				'beautiful&nbsp;',
				'mobile&nbsp;',
				'reliable&nbsp;',
				'pixel&#8209;perfect&nbsp;',
			], i = 0;

			var swap_word = function swap_word(){

				// 1) Fade out
				// 2) Resize
				// 3) Fade in next word
				// 4) END (and wait the setInterval duration)

				var $word_span      = $('#rotate-word'),
					next_word       = words[i=(i+1)%words.length],
					$next_word      = $('<strong/>').html(next_word),
					current_width   = $word_span.outerWidth(),
					next_width      = 0,
					is_mobile_width = $(window).width() < 768 ? true : false,
					in_action       = is_mobile_width ? 'fadeInLeft' : 'fadeInDown',
					out_action      = is_mobile_width ? 'fadeOutRight' : 'fadeOutDown';

				// Append the next word in a hidden area
				// just to measure the width we'll animate to.
				$next_word.css({
					position: 'absolute',
					right: '100%'
				}).appendTo($word_span.parent());
				next_width = $next_word.outerWidth();
				$next_word.remove();

				// Explicitly set the current width so that it registers for the
				// CSS transition.  Then, remove the old fadeInDown animate class
				// (if it's there), and add the fadeOutDown class.
				$word_span.width(current_width).removeClass('fadeInLeft').removeClass('fadeInDown').addClass(out_action);

				// Once that animation is done, set the new target width, add the new
				// word, remove the old animate class, and finally add the new fadeInDown class.
				// Note: Delays and durations for the fadeInDown and fadeOutDown are set in CSS.
				$word_span.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$word_span.width(is_mobile_width ? 'auto' : next_width).html(next_word).removeClass('fadeOutRight').removeClass('fadeOutDown').addClass(in_action);
				});

				// Start the timer again.
				setTimeout(swap_word, 6000);
			};

			// Init word swap
			setTimeout(swap_word, 2000);

		})();



	});
});
