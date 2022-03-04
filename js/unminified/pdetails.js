$(window).on('load', function(){
  setTimeout(removeLoader, 1500);
});

function removeLoader(){
  $(".loader-screen").fadeOut(500, function() {
    $(".loader-screen").remove();
  });
} 

$(document).ready(function() {

  $('.toggle__menu').on("click", function(){
    $('.navbar').toggleClass('navbar__mobile');
  });

  var shrinkHeader = 100;
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if ( scroll >= shrinkHeader ) {
        $('.header').addClass('scrolled');
    }
    else {
      $('.header').removeClass('scrolled');
    }
  });
  
});