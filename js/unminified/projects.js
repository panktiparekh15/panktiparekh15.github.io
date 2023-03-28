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

  function filterString(str) {
    return str.replace(/[^a-zA-Z]/g,"").toLowerCase();
  }
 
  $.ajax({
    url: 'scripts/projects.json',
    dataType: 'json',
    success: function (data) {
      let i = 0;
      let $div = ``;
      while(i<data.length) {
        $div += `
          <div class="project__box col-sm-11 col-md-10 col-lg-6 col-xl-4 mb-pr filter_`+ filterString(data[i].project_category) +`">
            <a href="./projects/`+ data[i].project_url +`" class="project__block relative d-block">
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
      $('.projects__grid').append($div);
      $('.projects__grid').isotope({
        itemSelector: '.project__box'
      });
      $('.filter__tab').on( 'click', function() {
        var filterValue = $(this).attr('data-filter');
        $('.projects__grid').isotope({ filter: filterValue });
        $('.filter__tab').removeClass('filter-active');
        $(this).addClass('filter-active');
      });
    }
  });

});
