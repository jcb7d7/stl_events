//import OverlappingMarkerSpiderfier from 'overlapping-marker-spiderfier';


(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);


    // Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    //google map

    // Asynchronously Load the map API
//    var script = document.createElement('script');
 //   script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPSMCQrPxgYwII9s-dWl9eN71K4HtKYZc&callback=initialize";
  //  document.body.appendChild(script);


jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyBPSMCQrPxgYwII9s-dWl9eN71K4HtKYZc&sensor=false&callback=initialize";
    document.body.appendChild(script);
});

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict

    var map;
    var markers = [
        ['UMSL', 38.7092400,-90.3082810], //51.503454,-0.119562],
        ['Pageant', 38.6556060,-90.2978790]
        //['Palace of Westminster, London', 51.499633,-0.124755]
    ];
    var infoWindowContent = [
	['<div class="iw-container">' +
        '<div class="iw-title">UMSL</div>' +
        '<div class="iw-subTitle">Infomation</div>' +
	'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UMSL_MSC.png/300px-UMSL_MSC.png" alt="umsl university" height="115" width="83">' +
	'<p>The University of Missouri-St. Louis is committed to an inclusive campus community that values and respects all its members and achieves educational excellence through diversity.</p>' +
        '<div class="iw-subTitle">Contacts</div>' +
        '<p>1st university BLVD, MO<br> 63131 The US<br>' +
        '<br>Phone. 314-556-5155<br>e-mail:umsl@umsl.edu<br>www:umsl.edu</p>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
         '</div>'],
        ['<div class="iw-container">' +
        '<div class="iw-title">Pageant Theatre</div>' +
	'<div class="iw-subTitle">Infomation</div>' +
	'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/The-pageant-joe-edwards.jpg/220px-The-pageant-joe-edwards.jpg" alt="pageant theatre" height="115" width="83">' +
        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
         '<div class="iw-subTitle">Contacts</div>' +
          '<p>6161 Delmar Blvd, St. Louis<br> MO 63112 <br>' +
        '<br>Phone. (314)-726-6161<br>e-mail:thepageant.com</p>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
 
	 '</div>']
    ];
function initialize() {
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
       closeBoxMargin:"0px 0px 0px 0px"
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
   
//    const oms = new OverlappingMarkerSpiderfier(map, options);

/*oms.addListener('click', function(marker, event) {
  iw.setContent(marker.desc);
  iw.open(map, marker);
}); */
    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1] + Math.random() / 10000 , markers[i][2] + Math.random() / 10000);
        console.log("Console printing: "+  i + " lat" + markers[i][1] + " lon: " + markers[i][2])
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
	
//	oms.addMarker(marker);
	// console.log(marker);

        //oms.addMarker(marker);

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
	   infoWindow.close();
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
  
        google.maps.event.addListener(infoWindow,'domready',function(){
         var iwOuter = $('.gm-style-iw');
	 var iwBackground = iwOuter.prev();
	 iwBackground.children(':nth-child(2)').css({'display' : 'none'});
	 iwBackground.children(':nth-child(4)').css({'display' : 'none'});
	});
	

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

/*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map); */

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });

}

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '379199679133076',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

