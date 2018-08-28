// GLOBAL
(function(){
  var video = $('#background-container').attr('vidsrc');
  $('#background-container video').attr('src', video);

  //playVideo(video);

  // active topnav
  var activeLink = $('#myTopnav a[href="' + document.location.href + '"]'),
      allLinks = $('#myTopnav a');

  activeLink.addClass('isActive');
  allLinks.hover(
    () => {
      allLinks.removeClass('isActive');
    },
    () => {
      activeLink.addClass('isActive');
    }
  );
})();

function toggleMenu() {
    var myTopnav = document.getElementById("myTopnav"),
        myTopnav2 = document.getElementById("myTopnav2");
    if (myTopnav.className === "topnav") {
      myTopnav.className += " responsive";
      myTopnav2.className += " responsive";
    } else {
      myTopnav.className = "topnav";
      myTopnav2.className = "topnav";
    }
}

// HOMEPAGE
if ( $('#home').length ) {
  (function(){
    $('#home #menu a').hover(
      (event) => {
        var video = $(event.target).parent().attr('vidsrc');
        $('#background-container video').attr('src', video);
        //playVideo(video);
      },
      (event) => {
        var video = $('#background-container').attr('vidsrc');
        $('#background-container video').attr('src', video);
        //playVideo(video);
      }
    );
  })();

  // splash page
  if ( !sessionStorage.getItem('seenSplash') ) {
    sessionStorage.setItem('seenSplash', true);
    showSplash();
  } else {
    showHomepage();
  }
  // splash pahe
  function showSplash() {
    $('#loader').animate({
      width: '100vw'
    }, 5000);

    $($('#intro p')[0]).fadeIn( "slow", () => {
      $($('#intro p')[1]).fadeIn( "slow", () => {
        setTimeout(() => {
          $('#intro p').fadeOut( "slow", () => {
            $('#splash img').fadeIn( "slow", () => {
              setTimeout(() => {
                showHomepage();
              }, 1000);
            });
          });
        }, 1000);
      });
    });
  }
  // homepage
  function showHomepage() {
    $('#splash').fadeOut( "slow", () => {
      $('header img').fadeIn( "slow", () => {
        $('#menu li').each((index, element) => {
          setTimeout(() => {
            $(element).animate({
              opacity: 1,
              top: 0
            }, 500);
          }, 250 * index);
        });
      });
      $('footer').fadeIn( "slow", () => {});
    });
  }
}


function playVideo(source) {

  // Video
    var video = document.getElementById('video');
    if(Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
   }
   // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
   // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
   // This is using the built-in support of the plain video element, without using hls.js.
   // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
   // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = '/assets/video/home/home.m3u8';
      video.addEventListener('loadedmetadata',function() {
        video.play();
      });
    }
}


// about
if ( $('#about').length ) {
  (function(){
    new Foundation.Accordion($('.accordion'), {});
    $('[data-tooltip]').each(function(i, v){
      new Foundation.Tooltip($(v), {});
    });
  })();
}

// Services
if ( $('#services').length ) {
  (function(){
    new Foundation.Accordion($('.accordion'), {});
  })();
}



