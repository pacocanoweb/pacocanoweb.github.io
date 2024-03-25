var forcingScroll = false;
var toggleableMenu = false;

$(document).ready(function(){
	$('header').height(Math.round($(window).height()* 1));

	var slidesDesktop = 3;
	if ($(".navbar-extra").css("display") == "none")
		slidesDesktop = 1;

	$('.slick').slick({
		infinite: true,
		slidesToShow: slidesDesktop,
		dots: true,
		slidesToScroll: slidesDesktop
	});

	$("nav a").click(function(){
		if (toggleableMenu) {
			$('section').toggleClass('displayHide');
			$('footer').toggleClass('displayHide');
			$('#navbarToggleLinks').toggleClass('displayBlock');
			$('#navbar-logo-img').toggleClass('scrolled');
			$('nav').toggleClass('fullHeight');
			$('.navbar-logo').toggleClass('addMargin');
		}

		$("body,html").animate({
			scrollTop:$("#" + $(this).data('value')).offset().top
		},1000)
	});

	$(".navbar-toggler").click(function(){
		toggleableMenu = true;
		forcingScroll = true;
		$(window).scrollTop(0);
		$('section').toggleClass('displayHide');
		$('footer').toggleClass('displayHide');
		$('#navbarToggleLinks').toggleClass('displayBlock');

		if ($('footer').hasClass('displayHide'))
			$('#navbar-logo-img').removeClass('scrolled').toggleClass('scrolled');
		else
			$('#navbar-logo-img').toggleClass('scrolled');

		$('nav').toggleClass('fullHeight');
		$('.navbar-logo').toggleClass('addMargin');
	});

	$("#send_button").click(function(){
		$(this).css("cursor", "auto");
		$(this).prop('disabled', true);
		sendForm($("#name").val(), $("#email").val(), $("#ucaptcha").val(), $("#msg").val());
		return false;
	});
});

$(window).on("scroll", function() {
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);

	if(!forcingScroll)
		$('.navbar-logo-link').toggleClass('scrolled', $(this).scrollTop() > 50);
	else 
		if (!$('footer').hasClass('displayHide'))
			forcingScroll = false;

	$('.navbar-link').toggleClass('scrolled', $(this).scrollTop() > 50);

	var width = 140;
	var height = 70;

	var minWidth = 100;
	var minHeight = 50;
	var w = width - Math.min(width - minWidth, $(document).scrollTop());
	var h = Math.round(w/2);
	var final_w = Math.min(w, width);
	var final_h = Math.min(h, height);

	$("#navbar-logo-img").width(final_w).height(final_h);
	$(".navbar-logo-link").css('width', final_w);
	$(".navbar-logo-link").css('height', final_h);

	if ($(window).scrollTop() >= $('header').offset().top) 
		$('nav a').removeClass('select');

	$('section').each(function() {
		if($(window).scrollTop() >= $(this).offset().top) {
			var id = $(this).attr('id');

			$('nav a').removeClass('select');
			$('nav a[data-value="'+ id +'"]').addClass('select');
		}
	});

});