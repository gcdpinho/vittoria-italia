jQuery(function ($) {
	'use strict';

	// Navigation Scroll
	$(window).scroll(function (event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function () {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 100
		}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop = [];
		var contentBottom = [];
		var winTop = $(window).scrollTop();
		var rangeTop = 200;
		var rangeBottom = 500;
		$('.navbar-collapse').find('.scroll a').each(function () {
			contentTop.push($($(this).attr('href')).offset().top);
			contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
		})
		$.each(contentTop, function (i) {
			if (winTop > contentTop[i] - rangeTop) {
				$('.navbar-collapse li.scroll')
					.removeClass('active')
					.eq(i).addClass('active');
			}
		})
	};

	$('#tohash').on('click', function () {
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top - 5
		}, 1000);
		return false;
	});

	// accordian
	$('.accordion-toggle').on('click', function () {
		$(this).closest('.panel-group').children().each(function () {
			$(this).find('>.panel-heading').removeClass('active');
		});

		$(this).closest('.panel-heading').toggleClass('active');
	});

	//Slider
	$(document).ready(function () {
		var time = 7; // time in seconds

		var $progressBar,
			$bar,
			$elem,
			isPause,
			tick,
			percentTime;

		//Init the carousel
		$("#main-slider").find('.owl-carousel').owlCarousel({
			slideSpeed: 500,
			paginationSpeed: 500,
			singleItem: true,
			navigation: true,
			navigationText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			],
			afterInit: progressBar,
			afterMove: moved,
			startDragging: pauseOnDragging,
			//autoHeight : true,
			transitionStyle: "fadeUp"
		});

		//Init progressBar where elem is $("#owl-demo")
		function progressBar(elem) {
			$elem = elem;
			//build progress bar elements
			buildProgressBar();
			//start counting
			start();
		}

		//create div#progressBar and div#bar then append to $(".owl-carousel")
		function buildProgressBar() {
			$progressBar = $("<div>", {
				id: "progressBar"
			});
			$bar = $("<div>", {
				id: "bar"
			});
			$progressBar.append($bar).appendTo($elem);
		}

		function start() {
			//reset timer
			percentTime = 0;
			isPause = false;
			//run interval every 0.01 second
			tick = setInterval(interval, 10);
		};

		function interval() {
			if (isPause === false) {
				percentTime += 1 / time;
				$bar.css({
					width: percentTime + "%"
				});
				//if percentTime is equal or greater than 100
				if (percentTime >= 100) {
					//slide to next item 
					$elem.trigger('owl.next')
				}
			}
		}

		//pause while dragging 
		function pauseOnDragging() {
			isPause = true;
		}

		//moved callback
		function moved() {
			//clear interval
			clearTimeout(tick);
			//start again
			start();
		}
	});

	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();

	// portfolio filter
	$(window).load(function () {
		'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector: '.portfolio-item',
			layoutMode: 'fitRows'
		});

		$portfolio_selectors.on('click', function () {
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({
				filter: selector
			});
			return false;
		});
	});

	$(document).ready(function () {
		//Animated Progress
		$('.progress-bar').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).css('width', $(this).data('width') + '%');
				$(this).unbind('inview');
			}
		});

		//Animated Number
		$.fn.animateNumbers = function (stop, commas, duration, ease) {
			return this.each(function () {
				var $this = $(this);
				var start = parseInt($this.text().replace(/,/g, ""));
				commas = (commas === undefined) ? true : commas;
				$({
					value: start
				}).animate({
					value: stop
				}, {
					duration: duration == undefined ? 1000 : duration,
					easing: ease == undefined ? "swing" : ease,
					step: function () {
						$this.text(Math.floor(this.value));
						if (commas) {
							$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
						}
					},
					complete: function () {
						if (parseInt($this.text()) !== stop) {
							$this.text(stop);
							if (commas) {
								$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
							}
						}
					}
				});
			});
		};

		$('.animated-number').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
			var $this = $(this);
			if (visible) {
				$this.animateNumbers($this.data('digit'), false, $this.data('duration'));
				$this.unbind('inview');
			}
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function (event) {
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function () {
				form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
			}
		}).done(function (data) {
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});

	//Google Map
	//var latitude = $('#google-map').data('latitude');
	//var longitude = $('#google-map').data('longitude');

	//Gaspar LatLong
	var latitude = -26.9313639;
	var longitude = -48.9653733;

	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);


	// CUSTOM
	var apiM = null;
	var apiF = null;
	var masculino = ["001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg", "007.jpg", "008.jpg", "009.jpg",
	"011.jpg", "013.jpg", "014.jpg", "016.jpg", "018.jpg", "019.jpg", "020.jpg", "021.jpg", "022.jpg", "024.jpg", "025.jpg",
	"026.jpg", "027.jpg", "028.jpg", "029.jpg", "030.jpg", "031.jpg", "032.jpg", "033.jpg", "035.jpg", "036.jpg", "037.jpg",
	"038.jpg", "039.jpg", "040.jpg", "041.jpg"];
	var feminino = ["001.jpg", "002.jpg", "005.jpg", "006.jpg", "010.jpg", "012.jpg", "015.jpg", "017.jpg", "018.jpg", 
	"023.jpg", "028.jpg", "031.jpg", "032.jpg", "034.jpg", "036.jpg", "038.jpg", "040.jpg"];
	var filter = null;

	$('.controlGa').click(function () {
		var gen = $(this).attr("value");
		var gaState = $('.gallery');

		if (gen == "masculino") {
			var inUse = masculino;
			var otherGen = "feminino";
		} else {
			var inUse = feminino;
			var otherGen = "masculino";
		}

		var vGen = findGen(gen, 'none');
		if (vGen.length == 0)
			addImages(inUse, gen);
		else
			for (var i = 0; i < vGen.length; i++)
				$(vGen[i]).css('display', 'block')

		var ovGen = findGen(otherGen, 'block');
		for (var i = 0; i < ovGen.length; i++)
			$(ovGen[i]).css('display', 'none');

		if (gaState.css('display') == "block" && filter == gen) {
			gaState.css('display', 'none');
			filter = null;
		} else {
			gaState.css('display', 'block');
			filter = gen;
		}

	});

	function findGen(gen, state) {
		var aGen = $('img.' + gen);
		var vGen = [];

		for (var i = 0; i < aGen.length; i++)
			if ($(aGen[i]).css('display') == state)
				vGen.push(aGen[i]);

		if (vGen.length == 0)
			vGen = aGen;
		return vGen;
	}

	function addImages(inUse, gen) {
		var index = 0;

		for (var i = 0; i < inUse.length; i++) {
			$('.col-md-4.' + index).append('<img class="img-gallery fadeInDown animated ' + gen + '" data-src="images/colecao/' + inUse[i] + '" value="' + i + '">')
			$('#gallery-slider-' + gen).append('<img alt="Coleção ' + gen[0].toUpperCase() + gen.substring(1, gen.length - 1) + 'a" src="images/colecao/' + inUse[i] + '" data-image="images/colecao/' + inUse[i] + '" data-description="Coleção ' + gen[0].toUpperCase() + gen.substring(1, gen.length - 1) + 'a">')
			if (index == 2)
				index = 0;
			else
				index++;
		}
		$('.img-gallery').click(function () {
			if ($(this).hasClass('masculino'))
				var gen = "masculino";
			else
				var gen = "feminino"

			$('body').css('overflow', 'hidden');

			$('.background-gallery').css('display', 'block');
			$('.background-gallery').css('height', $('body').height())
			$('#gallery-slider-' + gen).css('display', 'block');
			$('#gallery-slider-' + gen).css('top', 'calc(' + $(window).scrollTop() + 'px + 10%)')
			$('.fa.fa-times').css('display', 'block');
			$('.fa.fa-times').css('top', $(window).scrollTop() + 25);
			if (gen == "masculino") {
				if (apiM == null)
					apiM = $('#gallery-slider-' + gen).unitegallery();
				apiM.selectItem(parseInt($(this).attr("value")));
			} else {
				if (apiF == null)
					apiF = $('#gallery-slider-' + gen).unitegallery();
				apiF.selectItem(parseInt($(this).attr("value")));
			}

		});
		$('.img-gallery.' + gen).lazyload();
	}



	$('.fa.fa-times').click(function () {
		$('body').css('overflow', 'auto');

		$('.background-gallery').css('display', 'none');
		$('#gallery-slider-masculino').css('display', 'none');
		$('#gallery-slider-feminino').css('display', 'none');
		$('.fa.fa-times').css('display', 'none');
	});



});