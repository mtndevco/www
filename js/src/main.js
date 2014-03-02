"use strict";

// Let's get config'd, yo!
require.config({
	paths: {
		'requirejs': '../libs/require',
		'jquery'   : '../libs/jquery',
		'modernizr': '../libs/modernizr',
		'less'     : '../libs/less'
	},

	include: 'requirejs', // Needed for r.js building

	shim: {

	}
});

require(['jquery', 'modernizr', 'less'], function($, Modernizr, Less){
	// In hoc signo vinces.
	$(document).ready(function(){
		$('#fold').height(
			$(window).height() - $('header').height()
		);
		$('#info').height(
			$(window).height()
		);
	});
});
