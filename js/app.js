(function(){
  $('#home #menu a').hover(
    (event) => {
      console.log( $(event.target).attr('video-class') )
    },
    (event) => {
      console.log( 'default' )
    }
  );
})();
