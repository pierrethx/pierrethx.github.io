/*
	Verti by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	var rotatables = document.getElementsByClassName("rotatable");
	var leng=[0,0];
	var swap = 0;
	for (var i = 0; i < rotatables.length; i++) {
	var ramping = 2/(1+Math.exp(10*(Math.random()-0.5)))-1;
	if (leng[0]==leng[1] && Math.sign(leng[0])==Math.sign(ramping)) {ramping=-ramping;}
	leng[swap]=Math.sign(ramping);
	swap = 1-swap;
	rotatables[i].style.webkitTransform = "rotate(" + (4*ramping).toString() + "deg)";
	}

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header sticker tabs: each gets a random tilt between -10 and 10 degrees.
		$('#nav > ul > li > a').each(function() {
			this.style.setProperty('--rot', (Math.random() * 20 - 10).toFixed(2) + 'deg');
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo('#header');

			// Sticker button sits in the header and is tilted a random -10 to 10 degrees.
			$('#navToggle .toggle')[0].style.setProperty('--ham-rot', (Math.random() * 20 - 10).toFixed(2) + 'deg');

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.each(function() {
					// Menu stickers copy the header's: same tilt, and the current page's is upright and bigger.
					var panelLinks = $(this).find('a.link');
					$('#nav > ul > li').each(function(i) {
						var l = panelLinks[i], a = $(this).children('a')[0];
						if (!l) return;
						l.style.setProperty('--rot', a.style.getPropertyValue('--rot') || '0deg');
						if ($(this).hasClass('current')) l.classList.add('current');
					});
				})
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'navPanel-visible'
				});


	// Business card: scale the name so it spans the card exactly, whatever font the browser picks.
		(function() {
			var card = document.getElementById('contact-card');
			if (!card) return;
			var name = card.querySelector('.card-name'), span = name.firstElementChild;
			function fit() {
				var cs = getComputedStyle(card),
					avail = card.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
					size = parseFloat(getComputedStyle(name).fontSize);
				name.style.fontSize = (size * avail / span.offsetWidth * 0.99) + 'px';
			}
			fit();
			$(window).on('load resize', fit);
			if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
		})();

})(jQuery);
