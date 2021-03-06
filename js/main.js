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

		if ($(window).width() < 1024)
			$('.navbar-toggle').click();
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
		var name = $("input#name").val();
		var email = $("input#email").val();
		var phone = $("input#phone").val();
		var message = $("textarea#message").val();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			type: "POST",
			data: {
				name: name,
				phone: phone,
				email: email,
				message: message
			},
			cache: false,
			beforeSend: function () {
				form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Enviando e-mail...</p>').fadeIn());
			},
			error: function () {
				form_status.html('<p class="text-danger">Erro ao eviar mensagem. Tente novamente mais tarde!</p>').delay(3000).fadeOut();
			}
		}).done(function (data) {
			form_status.html('<p class="text-success">Mensagem enviada com sucesso!</p>').delay(3000).fadeOut();
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
	var apiTop = 0;
	var apiM = null;
	var apiF = null;
	var masculino = ["001-min.jpg", "002-min.jpg", "003-min.jpg", "004-min.jpg", "005-min.jpg", "006-min.jpg", "007-min.jpg", "008-min.jpg", "009-min.jpg",
		"011-min.jpg", "013-min.jpg", "014-min.jpg", "016-min.jpg", "018-min.jpg", "019-min.jpg", "020-min.jpg", "021-min.jpg", "022-min.jpg", "024-min.jpg", "025-min.jpg",
		"026-min.jpg", "027-min.jpg", "028-min.jpg", "029-min.jpg", "030-min.jpg", "031-min.jpg", "032-min.jpg", "033-min.jpg", "035-min.jpg", "036-min.jpg", "037-min.jpg",
		"038-min.jpg", "039-min.jpg", "040-min.jpg", "041-min.jpg"
	];
	var feminino = ["001-min.jpg", "002-min.jpg", "005-min.jpg", "006-min.jpg", "010-min.jpg", "012-min.jpg", "015-min.jpg", "017-min.jpg", "018-min.jpg",
		"023-min.jpg", "028-min.jpg", "031-min.jpg", "032-min.jpg", "034-min.jpg", "036-min.jpg", "038-min.jpg", "040-min.jpg"
	];
	var all = ["001-min.jpg", "002-min.jpg", "003-min.jpg", "004-min.jpg", "005-min.jpg", "006-min.jpg", "007-min.jpg", "008-min.jpg", "009-min.jpg", "010-min.jpg",
		"011-min.jpg", "012-min.jpg", "013-min.jpg", "014-min.jpg", "015-min.jpg", "016-min.jpg", "017-min.jpg", "018-min.jpg", "019-min.jpg", "020-min.jpg", "021-min.jpg", "022-min.jpg", "023-min.jpg", "024-min.jpg", "025-min.jpg",
		"026-min.jpg", "027-min.jpg", "028-min.jpg", "029-min.jpg", "030-min.jpg", "031-min.jpg", "032-min.jpg", "033-min.jpg", "034-min.jpg", "035-min.jpg", "036-min.jpg", "037-min.jpg",
		"038-min.jpg", "039-min.jpg", "040-min.jpg", "041-min.jpg"
	];
	var filter = null;

	$('.controlGa').click(function () {
		var gen = $(this).attr("value");
		var gaState = $('.gallery');

		if (gen == "masculino") {
			var inUse = masculino;
			var otherGen = "feminino";
			$("#galeria").find('.section-title').text("Coleção Masculina")
		} else {
			var inUse = feminino;
			var otherGen = "masculino";
			$("#galeria").find('.section-title').text("Coleção Feminina")
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
			$("#galeria").css('display', 'none')
			filter = null;
		} else {
			gaState.css('display', 'block');
			$("#galeria").css('display', 'block')
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
			$('.col-md-4.' + index).append('<img class="img-gallery fadeInDown animated ' + gen + '" data-src="images/colecao-min/' + inUse[i] + '" value="' + i + '">')
			$('#gallery-slider-' + gen).append('<img alt="Coleção ' + gen[0].toUpperCase() + gen.substring(1, gen.length - 1) + 'a" src="images/colecao-min/' + inUse[i] + '" data-image="images/colecao-min/' + inUse[i] + '" data-description="Coleção ' + gen[0].toUpperCase() + gen.substring(1, gen.length - 1) + 'a">')
			if (index == 2)
				index = 0;
			else
				index++;
		}
		$('.img-gallery').click(function () {
			if ($(window).width() >= 1024) {
				if ($(this).hasClass('masculino'))
					var gen = "masculino";
				else
					var gen = "feminino"

				$('body').css('overflow-y', 'hidden');

				$('.background-gallery').css('display', 'block');
				$('.background-gallery').css('height', $('body').height())
				$('#gallery-slider-' + gen).css('display', 'block');
				$('#colecao .fa.fa-times').css('display', 'block');
				$('#colecao .fa.fa-times').css('top', $(window).scrollTop() + 25);
				if (gen == "masculino") {
					if (apiM == null) {
						apiM = $('#gallery-slider-' + gen).unitegallery({
							slider_zoom_max_ratio: 2,
							slider_scale_mode: "fit",
							slider_zoom_step: 1.2
						});

						apiM.on("enter_fullscreen", function () {
							$('#gallery-slider-' + gen).css({
								'left': 'auto',
								'top': ''
							})
						});

						apiM.on("exit_fullscreen", function () {
							$('#gallery-slider-' + gen).css({
								'left': '10%',
								'top': $(window).scrollTop() + $(window).height() / 2 - $('#gallery-slider-' + gen).height() / 2
							})
						});
					}
					apiM.selectItem(parseInt($(this).attr("value")));

				} else {
					if (apiF == null) {
						apiF = $('#gallery-slider-' + gen).unitegallery({
							slider_zoom_max_ratio: 2,
							slider_scale_mode: "fit",
							slider_zoom_step: 1.2
						});

						apiF.on("enter_fullscreen", function () {
							$('#gallery-slider-' + gen).css({
								'left': 'auto',
								'top': ''
							})
						});

						apiF.on("exit_fullscreen", function () {
							$('#gallery-slider-' + gen).css({
								'left': '10%',
								'top': $(window).scrollTop() + $(window).height() / 2 - $('#gallery-slider-' + gen).height() / 2
							})
						});
					}
					apiF.selectItem(parseInt($(this).attr("value")));
				}
				$('#gallery-slider-' + gen).css('top', $(window).scrollTop() + $(window).height() / 2 - $('#gallery-slider-' + gen).height() / 2)
			}
		});
		$('.img-gallery.' + gen).lazyload();
	}

	$('#google-map').height($('.contact-form').height() + 250);
	if ($(window).width() < 768)
		$('#google-map').css('margin-top', $('.contact-form').height() + 150);

	var videos = ['video-colecao-verao.mp4', 'video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4'];
	var widthVideo = 60;
	var heightVideo = 2;
	var playersVideo = []
	console.log();
	if ($(window).width() < 1024) {
		widthVideo = 100;
		heightVideo = 1.5;
	}

	for (var i = 0; i < videos.length; i++) {
		$('#my-player' + i).width($(window).width() * widthVideo / 100);
		$('#my-player' + i).height($('#my-player' + i).width() / heightVideo);

		var player = videojs('my-player' + i);
		player.downloadButton();

		player.on('fullscreenchange', function () {
			if ($('#gallery-videos').hasClass('animated'))
				$('#gallery-videos').removeClass('animated');
		});
		player.on('play', function () {
			for (var j = 0; j < playersVideo.length; j++)
				if (playersVideo[j] != this)
					playersVideo[j].pause();
		});

		playersVideo.push(player);
		$('#my-player' + i + '_html5_api').width('100%');
		$('#my-player' + i + '_html5_api').height('100%');
	}

	var grid = $('.grid');
	grid.imagesLoaded(function () {
		grid.isotope({
			itemSelector: '.grid-item',
		});
	});

	grid.one('arrangeComplete', function () {
		$('.sk-fading-circle').css('display', 'none');
		grid.css('visibility', 'visible');
	});

	$('.bt-filter').click(function () {
		grid.isotope({
			filter: $(this).attr('data-filter')
		});
		var bts = $('.bt-filter');
		for (var i = 0; i < bts.length; i++)
			$(bts[i]).removeClass('bt-active');
		$(this).addClass('bt-active');
	});

	var valueImage = 0;
	var api = null;
	$('.img-zoom').click(function () {
		if ($(window).width() >= 1024) {
			$('body').css('overflow-y', 'hidden');
			$('.background-gallery').css('display', 'block');
			$('.background-gallery').css('height', $('body').height());
			$('#gallery-slider').css('display', 'block');
			$('#colecao .fa.fa-times').css('display', 'block');
			$('#colecao .fa.fa-times').css('top', $(window).scrollTop() + 25);
			var active = $('.bt-active');
			var inUse = []

			if (active.length == 0 || active.attr('data-filter') == "*") {
				if ($('#gallery-slider').attr('value') != "all") {
					inUse = all;
					$('#gallery-slider').attr('value', "all");
					valueImage = $(this).closest('.grid-item').find('img').attr('value');
				}
			} else if (active.attr('data-filter') == ".masculino") {
				if ($('#gallery-slider').attr('value') != "masculino") {
					inUse = masculino;
					$('#gallery-slider').attr('value', 'masculino');
					valueImage = $(this).closest('.grid-item').find('img').attr('data-masc');
				}
			} else if ($('#gallery-slider').attr('value') != "feminino") {
				inUse = feminino;
				$('#gallery-slider').attr('value', 'feminino');
				valueImage = $(this).closest('.grid-item').find('img').attr('data-fem');
			}
			if (inUse.length != 0) {
				$('#gallery-slider').remove();
				$('#colecao').append('<div class="fadeInDown animated" id="gallery-slider" value=""></div>');

				for (var i = 0; i < inUse.length; i++)
					$('#gallery-slider').append('<img alt="Coleção Verão 2017" src="images/colecao-min/' + inUse[i] + '" data-image="images/colecao-min/' + inUse[i] + '" data-description="Coleção Verão 2017">');


				api = $('#gallery-slider').unitegallery({
					slider_zoom_max_ratio: 2,
					slider_scale_mode: "fit",
					slider_zoom_step: 1.2
				});



				api.on("enter_fullscreen", function () {
					$('#gallery-slider').css({
						'left': 'auto',
						'top': ''
					})
				});

				api.on("exit_fullscreen", function () {
					$('#gallery-slider').css({
						'left': '10%',
						'top': $(window).scrollTop() + $(window).height() / 2 - $('#gallery-slider').height() / 2
					});
				});
				api.resetZoom()

				api.selectItem(parseInt(valueImage));

				$('#gallery-slider').css('top', $(window).scrollTop() + $(window).height() / 2 - $('#gallery-slider').height() / 2);

			}
		}
	});

	$('#colecao .fa.fa-times').click(function () {
		$('#gallery-slider').removeClass('fadeInDown animated');
		$('#gallery-slider').addClass('animated fadeOutUp');
		setTimeout(function () {
			$('body').css('overflow-y', 'auto');

			$('.background-gallery').css('display', 'none');
			api.stop();
			//$('#gallery-slider-masculino').css('display', 'none');
			//$('#gallery-slider-feminino').css('display', 'none');
			$('#gallery-slider').css('display', 'none');
			$('#colecao .fa.fa-times').css('display', 'none');
		}, 500);

	});

	$(document).ready(function () {
		//Init the carousel
		initSlider();

		function initSlider() {
			$('#main-slider').find('.owl-carousel').owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
				nav: true,
				dots: false,
				autoplayTimeout: 7000,
				onInitialized: startProgressBar,
				onTranslate: resetProgressBar,
				onTranslated: startProgressBar
			});
		}

		function startProgressBar() {
			// apply keyframe animation 
			$('.slide-progress').css({
				'width': '100%',
				'transition': 'width 7000ms'
			});
		}

		function resetProgressBar() {
			$('.slide-progress').css({
				'width': 0,
				'transition': 'width 0s'
			});
		}
		$('#gallery-videos').find('.owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			dots: false
		});


	});
	$('.background-modal').click(function (event) {
		if (event.target.className == "background-modal" || event.target.className.indexOf("close-modal") != -1 )
			$('.background-modal').css('display', 'none');
	})
});