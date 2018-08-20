// GLOBAL
(function(){
  var video = 'http://www.maverickdigital.com' + $('#background-container').attr('vidsrc');
  $('#background-container video').attr('src', video);
  // active topnav
  var activeLink = $('#myTopnav a[href="' + document.location.href + '"]'),
      allLinks = $('#myTopnav a');

  activeLink.addClass('isActive');
  allLinks.hover(
    function() {
      allLinks.removeClass('isActive');
    },
    function() {
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
      function(event) {
        var video = 'http://www.maverickdigital.com' + $(event.target).parent().attr('vidsrc');
        $('#background-container video').attr('src', video);
      },
      function(event) {
        var video = 'http://www.maverickdigital.com' + $('#background-container').attr('vidsrc');
        $('#background-container video').attr('src', video);
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

    $($('#intro p')[0]).fadeIn( "slow", function() {
      $($('#intro p')[1]).fadeIn( "slow", function() {
        setTimeout(function() {
          $('#intro p').fadeOut( "slow", function() {
            $('#splash img').fadeIn( "slow", function() {
              setTimeout(function() {
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
    $('#splash').fadeOut( "slow", function() {
      $('header img').fadeIn( "slow", function() {
        $('#menu li').each(function(index, element) {
          setTimeout(function() {
            $(element).animate({
              opacity: 1,
              top: 0
            }, 500);
          }, 250 * index);
        });
      });
      $('footer').fadeIn( "slow", function() {});
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
