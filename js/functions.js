$(()=>{

  var menuOpen = false;
  var menuAnimation = false;
  var scrollingUp = false;

  movieRatings = ['\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star-half-stroke"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star-half-stroke"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star-half-stroke"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star-half-stroke"></i>','\
    \
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>\
    <i class="fa-solid fa-star"></i>'
  ]

  function generateViews(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos arr[i] e arr[j]
    }
  }
  var catalogue = baseCatalogue;
  shuffleArray(catalogue);
  catalogue.unshift({})

  for(let i = 1; i < catalogue.length; i++){
    let rating = movieRatings[Math.floor(Math.random() * movieRatings.length)];
    let views = generateViews(10000, 800000);

    if(i % 28 != 0){
      $('.main').append('\
      <div class="movie-wrapper">\
        <div class="movie" id="movie-' + i + '">\
          <div class="image" title=\'' + 'WATCH "' + catalogue[i].title.toUpperCase() + '" ON YOUR FAVORITE STREAMING SERVICE RIGHT NOW!\'>\
            <img src="' + catalogue[i].image + '">\
            <div class="image-shadow"></div>\
          </div>\
          <div class="movie-info">\
            <div class="movie-rating">\
              ' + rating + '\
            </div>\
            <div class="title">\
              <h3>' + catalogue[i].title + '</h3>\
            </div>\
          </div>\
        </div>\
      </div>');

      $('.descriptions').append('\
          <div class="description" id="movie-' + i + '">\
            <div class="description-header">\
              <h3>' + catalogue[i].title + ' <span id="movie-' + i + '">X</span><div class="clear"></div></h3>\
            </div>\
            <div class="description-body">\
              <div class="description-rating">\
                ' + rating + '<span><i class="fa-solid fa-eye"></i>' + views + '</span>\
              </div>\
              <p>' + catalogue[i].description + '</p>\
            </div>\
            <div class="description-footer">\
              <a href="" class="watch-stream">\
                <i class="fa-solid fa-circle-play"></i>Watch on streaming\
              </a>\
              <a href="" class="add-library">\
                <i class="fa-regular fa-bookmark"></i>Add to my list\
              </a>\
              <a href="" class="share-movie">\
                <i class="fa-solid fa-share"></i>Share this movie\
              </a>\
            </div>\
          </div>\
        ')

    }else{
      $('.main').append('\
      <div class="movie-banner-wrapper">\
        <div class="movie-banner">\
          <div class="image">\
            <img src="' + catalogue[i].image + '">\
            <div class="image-shadow"></div>\
          </div>\
          <div class="movie-banner-info">\
            <div class="movie-banner-header">\
              <h2><i class="fa-solid fa-arrow-up-right-dots"></i>FEATURING THIS MONTH! <span><i class="fa-solid fa-eye"></i>' + views + '</span><div class="clear"></div></h2>\
            </div>\
            <div class="movie-banner-body">\
              <div class="movie-banner-image">\
                <img src="' + catalogue[i].image + '">\
                <div class="movie-banner-image-shadow"></div>\
              </div>\
              <div class="movie-rating">\
              ' + rating + '\
              </div>\
              <div class="title">\
                <h2>' + catalogue[i].title + '</h2>\
              </div>\
              <div class="description">\
                <p>' + catalogue[i].description + '</p>\
              </div>\
            </div>\
            <div class="movie-banner-footer">\
              <h2>\
                <a href="" class="watch-stream">\
                  <i class="fa-solid fa-circle-play"></i>WATCH ON STREAM\
                </a>\
                <a href="" class="add-library">\
                  <i class="fa-regular fa-bookmark"></i>ADD TO MY LIST\
                </a>\
                <a href="" class="share-movie">\
                  <i class="fa-solid fa-share"></i>SHARE THIS MOVIE\
                </a>\
              </h2>\
            </div>\
          </div>\
          <div class="clear"></div>\
        </div>\
      </div>')
    }
  }

  $('.movie').click(function(){
    let id = $(this).attr('id');
    let element = $('.descriptions #' + id);

    $('.descriptions').fadeIn(250);
    $(element).fadeIn(250);
    $('body').css('overflow', 'hidden');
  })

  $('.description-header span').click(function(){
    let id = $(this).attr('id');
    let element = $('.descriptions #' + id);

    $('.descriptions').fadeOut(250);
    $(element).fadeOut(250);
    $('body').css('overflow', 'auto')
  })

  $('.menu-bar').click(function(){
    if(!menuAnimation){
      menuAnimation = true;
      setTimeout(()=>{menuAnimation = false}, 500);

      if(!menuOpen){
        menuOpen = true;
    
        $('.bar-1').css('rotate', '135deg')
        .css('top', '10px');
        $('.bar-2').css('rotate', '-135deg')
        .css('opacity', '0');
        $('.bar-3').css('rotate', '-135deg')
        .css('bottom', '10px');
    
        $('.main-ul').css('left', '0')

        $('.page-mask').fadeIn(250);
        $('body').css('overflow', 'hidden');
    
      }else{
        menuOpen = false;
    
        $('.bar-1').css('rotate', '0deg')
        .css('top', '0');
        $('.bar-2').css('rotate', '0deg')
        .css('opacity', '1');
        $('.bar-3').css('rotate', '0deg')
        .css('bottom', '0');
    
        $('.main-ul').css('left', '-250px')

        $('.page-mask').fadeOut(250);
        $('body').css('overflow', 'auto');
      }
    }
  })

  $('.scroll-up-button').click(function(){
    if(!scrollingUp){
      scrollingUp = true;
      setTimeout(() => {
        scrollingUp = false;
      }, 1000);

      $('html, body').animate({
        scrollTop: 0
      }, 'slow');

    }
  })

})