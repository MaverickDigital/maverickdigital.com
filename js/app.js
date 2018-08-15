// GLOBAL
(function(){
  var video = 'http://www.maverickdigital.com' + $('#background-container').attr('vidsrc');
  $('#background-container video').attr('src', video);
})();

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
}

function toggleMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
