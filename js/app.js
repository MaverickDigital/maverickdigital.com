// GLOBAL
(function(){
  var video = 'http://www.maverickdigital.com' + $('#background-container').attr('vidsrc');
  $('#background-container video').attr('src', video);
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// HOMEPAGE
if ( $('#home').length ) {
  (function(){
    $('#home #menu a').hover(
      (event) => {
        var video = 'http://www.maverickdigital.com' + $(event.target).parent().attr('vidsrc');
        $('#background-container video').attr('src', video);
      },
      (event) => {
        var video = 'http://www.maverickdigital.com' + $('#background-container').attr('vidsrc');
        $('#background-container video').attr('src', video);
      }
    );
  })();

  // splash page
  if ( '' === getCookie('maverickDigital') ) {
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
