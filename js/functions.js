/*
	Project Name : Alinti
	
	+ Services Section
	+ Discover Section
	+ Google-map-black & white	
	+ Sticky Menu
		
	+ Document On Ready
		- Scrolling Navigation
		- Add Easing Effect
		- Responsive Caret
		- Portfolio Detail
		- Photo Slider
		- Services Section
		- Client Carousel
		- Client Carousel 1
		- Recent Blog Carousel
		- Skill Section
		- Menu PopUp
		- Lightbox for Highlights Video
		- Counter Section
		- Discover Section
		- Contact Map
		- Quick Contact Form

	+ Window On Scroll
		- Set Sticky Menu
	+ Window On Resize		
	+ Window On Load
		- Site Loader
		- Gallery
*/

(function($) {

	"use strict"	
	
	/* - Services Section */
	function srv_img() {
		var width = $(window).width();
		var srv_section_height = $(".service-section .srv-content").height();
		if ( width >= 992 ) {
			$( ".srv-img" ).removeAttr("style");
			$( ".srv-img img" ).remove();
			var srv_img = $(".srv-img").attr("data-srvimg");
			$( ".srv-img" ).css({"background-image":"url('" + srv_img + "')","height": srv_section_height });
		} else {
			$( ".srv-img" ).removeAttr("style");
			$( ".srv-img img" ).remove();
			var srv_img = $(".srv-img").attr("data-srvimg");
			$( ".srv-img" ).append("<img src='"+ srv_img +"' />")
		}
	}
	
	/* - Discover Section */
	function discover_img() {
		var width = $(window).width();
		var discover_section_height = $(".discover-section .discover-box").height();
		if ( width >= 992 ) {
			$( ".img-box" ).removeAttr("style");
			$( ".img-box img" ).remove();
			var img = $(".img-box").attr("data-discoverimg");
			$( ".img-box" ).css({"background-image":"url('" + img + "')","height": discover_section_height });
		} else {
			$( ".img-box" ).removeAttr("style");
			$( ".img-box img" ).remove();
			var img = $(".img-box").attr("data-discoverimg");
			$( ".img-box" ).append("<img src='"+ img +"' />")
		}
	}
	
	/* + Google-map-black & white */
	function initialize(obj) {

		var lat = $('#'+obj).attr("data-lat");
        var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = 'images/marker.png';
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,10);
		var styles = [{"featureType":"landscape","stylers":[{"saturation":-90},{"lightness":50},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-90},{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-90},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-90},{"lightness":50},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});	
	}
	
	/* + Sticky Menu */
	function sticky_menu() {
		var menu_scroll = $("body").offset().top;
		var scroll_top = $(window).scrollTop();
		
		if ( scroll_top > menu_scroll ) {
			$(".header-main").addClass("navbar-fixed-top animated fadeInDown");
		} else {
			$(".header-main").removeClass("navbar-fixed-top animated fadeInDown"); 
		}
	}

	/* + Document On Ready */
	$(document).on("ready", function() {
		
		/* - Scrolling Navigation */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu* */
		if( $(".header-main").length ) {
			sticky_menu();
		}

		/* - Add Easing Effect on Section Scroll */
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});
		
		/* - Responsive Caret */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Portfolio Detail */
		$('.popup-modal').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#username',
			modal: true
		});
		$(document).on('click', '.popup-modal-dismiss', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});
		
		/* - Photo Slider */

		//Function to animate slider captions 
		function doAnimations( elems ) {
			//Cache the animationend event in a variable
			var animEndEv = 'webkitAnimationEnd animationend';
			
			elems.each(function () {
				var $this = $(this),
					$animationType = $this.data('animation');
				$this.addClass($animationType).one(animEndEv, function () {
					$this.removeClass($animationType);
				});
			});
		}

		//Variables on page load 
		var $myCarousel = $('#main-carousel'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
			
		//Initialize carousel 
		$myCarousel.carousel();
		
		//Animate captions in first slide on page load 
		doAnimations($firstAnimatingElems);
		
		//Pause carousel  
		$myCarousel.carousel('pause');
		
		//Other slides to be animated on carousel slide event 
		$myCarousel.on('slide.bs.carousel', function (e) {
			var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
			doAnimations($animatingElems);
		}); 

		/* - Services Section */
		if( $(".service-section").length ) {
			srv_img();
		}
		
		/* - Client Carousel */
		if( $(".clients-carousel").length ) {
			$(".clients-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 6
					}
				}
			});
		}
		
		/* - Client Carousel 1 */
		if( $(".clients-carousel-1").length ) {
			$(".clients-carousel-1").owlCarousel({
				loop: true,
				margin: 10,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					400:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 4
					}
				}
			});
		}
		
		/* - Recent Blog Carousel */
		if( $(".recent-blog-carousel").length ) {
			$(".recent-blog-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					480:{
						items: 2
					},
					992:{
						items: 3
					},
					1200:{
						items: 4
					}
				}
			});
		}
		
		/* - Skill Section */
		$('.skill-section').each(function ()
		{
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{			
				var skill_type1_item_count = 0;
				var skill_type1_count = 0;					
				skill_type1_item_count = $( "[id*='skill_type1_count-']" ).length;
				
				var skill_bar_count = 0;
				var skills_bar_count = 0;
				skill_bar_count = $( "[id*='skill_bar1_count-']" ).length;
				
				for(var i=1; i<=skill_type1_item_count; i++)
				{
					skill_type1_count = $( "[id*='skill_type1_count-"+i+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_type1_count-"+i+"']").animateNumber({ number: skill_type1_count }, 2000);
				}			
				
				for(var j=1; j<=skill_bar_count; j++)
				{
					skills_bar_count = $( "[id*='skill_type1_count-"+j+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_bar1_count-"+j+"']").css({'width': skills_bar_count+'%'});
					$("[id*='skill_type1_count-"+j+"']").css({'width': skills_bar_count+'%'});
				}
			});
		});	
		
		/* - Menu PopUp */	
		$( "#menu-popup" ).on("click", function(event) {
			event.preventDefault();
			$(".portfolio-categories ul").toggle("slide");
		});
		
		/* Lightbox for Highlights Video */
		$('.video-section a').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
		
		/* - Counter Section */
		if( $(".counter-block").length ) {
			$('.counter-block').each(function () {
				var $this = $(this);
				var myVal = $(this).data("value");
				$this.appear(function() {
					var statistics_item_count = 0;
					var statistics_count = 0;					
					statistics_item_count = $( "[id*='statistics_count-']" ).length;
					for(var i=1; i<=statistics_item_count; i++) {
						statistics_count = $( "[id*='statistics_count-"+i+"']" ).attr( "data-statistics_percent" );
						$("[id*='statistics_count-"+i+"']").animateNumber({ number: statistics_count }, 2000);
					}
				});
			});
		}
		
		/* - Discover Section */
		if( $(".counter-block").length ) {
			discover_img();
		}
		
		/* - Contact Map */
		if($('#map-canvas-contact').length==1){
			initialize('map-canvas-contact');
		}
		
		if($('#map-canvas-contact-1').length==1){
			initialize('map-canvas-contact-1');			
		}
		
		if($(".contact-section").length) {
			var width = $(window).width();
			var cnt_height = $(".contact-section").height();
			if( width >= 992 ) {
				$(".contact-section .map-canvas").css("height", cnt_height);
			} else {
				$(".contact-section .map-canvas").css("height", "550px");
			}
		}
		
		/* - Quick Contact Form */
		$( "#btn_submit" ).on( "click", function(event) {
		  event.preventDefault();
		  var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_name").val("");						
						$("#input_email").val("");						
						$("#input_subject").val("");						
						$("#textarea_message").val("");
						$("#alert-msg").show();				
					}			
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
			return false;
			$("#contact-form").attr("action", "saveQuery").submit();
		});
		
	});	/* + Document Ready /- */
	
	/* + Window On Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu* */
		if( $(".header-main").length ) {
			sticky_menu();
		}
	});
	

	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width = $(window).width();
		var height	= $(window).height();
		srv_img();
		discover_img();
		if($(".contact-section").length) {
			var width	=	$(window).width();
			var cnt_height = $(".contact-section").height();
			if( width >= 992 ) {
				$(".contact-section .map-canvas").css("height", cnt_height);
			} else {
				$(".contact-section .map-canvas").css("height", "550px");
			}
		}
	});
	
	/* + Window On Load */
	$(window).on("load",function() {
		/* -- Site Loader */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		
		/* - Gallery */
		var $container = $('.portfolio-list');
		$container.isotope({
		  itemSelector: '.portfolio-list > li',
		  gutter: 0,
		  transitionDuration: "0.5s"
		});

		$('#filters a').on('click',function(){
			$('#filters a').removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });		
			return false;
		});
	});

})(jQuery);