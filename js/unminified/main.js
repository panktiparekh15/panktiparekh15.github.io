$(window).on('load', function(){
  setTimeout(removeLoader, 1500);
});

function removeLoader(){
  $(".loader-screen").fadeOut(500, function() {
    $(".loader-screen").remove();
  });
} 

$(document).ready(function() {
  $.ajax({
    url: 'scripts/projects.json',
    dataType: 'json',
    success: function (data) {
      let i = 0;
      let $div = `<div class="row justify-content-center">`;
      while(i<6) {
        $div += `
          <div class="col-sm-11 col-md-10 col-lg-6 col-xl-4 mb-pr">
            <a href="projects/`+ data[i].project_url +`" class="project__block relative d-block">
              <div class="project__img--block">
                <img src="projects/`+ data[i].thumbnail_img +`" class="project__img" />
              </div>
              <div class="project__details">
                <h3 class="title--three project__title">`+ data[i].project_name +`</h3>
                <div class="tech__stack text--dark heading">
                  `+ data[i].tech_stack +`
                </div>
              </div>
            </a>
          </div>
        `
        i+=1;
      }
      $div += `</div>`;
      $('.projects__grid').append($div);
    }
  });

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

  $('.accordion__question').on('click', function () {
    var isActive = $(this).hasClass("open");
    $('.accordion__question').removeClass('open');
    if (!isActive) {
      $(this).toggleClass('open', 300);
    }
    $(this).next().slideToggle(300);
    $(".accordion__answer").not($(this).next()).slideUp(300);
  });
  
});