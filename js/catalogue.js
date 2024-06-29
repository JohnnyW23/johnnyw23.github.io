$(() => {
  var catalogue = baseCatalogue;
  shuffleArray(catalogue);

  // I need to make the first object something empty, so the catalogue design follows the chosen pattern
  catalogue.unshift({})

  for(let i = 1; i < catalogue.length; i++){
    let object = catalogue[i];

    let title = object.title;
    let image = object.image;
    let description = object.description;
    let genres = object.genres;
    let release = object.release;
    let runtime = object.runtime;
    let score = object.score;

    let rating = generateRating(score);
    let views = generateViews(score);
    let topTag = generateTopTag(score);

    // For each 27 movies, the 28th becomes the month's feature
    if(i % 28 != 0){
      $('.main').append('\
        <div class="movie-wrapper">\
          <div class="movie trailer-trigger" id="movie-' + i + '" video-frame="' + i + '">\
            <div class="image" title=\'' + 'WATCH "' + title.toUpperCase() + '" ON YOUR FAVORITE STREAMING SERVICE RIGHT NOW!\'>\
              <img src="' + image + '">'
              + topTag +
              '<div class="image-shadow"></div>\
              <div class="play-button">\
                <div class="play-svg"></div>\
              </div>\
            </div>\
            <div class="movie-info">\
              <div class="movie-rating">\
                ' + rating + '\
              </div>\
              <div class="title">\
                <h3>' + title + '</h3>\
              </div>\
            </div>\
          </div>\
        </div>\
      ');

      $('.descriptions').append('\
        <div class="description" id="movie-' + i + '">\
          <div class="description-header">\
            <h3 class="trailer-title">' + title + '</h3>\
            <span class="movie-release">Release Date: ' + release + '</span><span class="description-close-button" id="movie-' + i + '">X</span>\
          </div>\
          <div class="iframe-wrapper"></div>\
          <div class="description-body">'
            + setRatingBox(score, views, false) +
            setMovieDetails(runtime, genres) +
            '<p>' + description + '</p>\
          </div>\
          <div class="description-footer">\
            <a href="" class="watch-stream">\
              <i class="fa-solid fa-circle-play"></i>Watch on streaming\
            </a>\
            <a href="" class="add-library">\
              <i class="fa-regular fa-bookmark"></i>Add to watchlist\
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
            <div class="image trailer-trigger" id="movie-' + i + '" video-frame="' + i + '">\
              <img src="' + image + '">\
              <div class="image-shadow"></div>\
              <div class="play-button">\
                <div class="play-svg"></div>\
              </div>'
              + topTag +
            '</div>\
            <div class="movie-banner-info">\
              <div class="movie-banner-header">\
                <h2><i class="fa-solid fa-arrow-up-right-dots"></i>FEATURING THIS MONTH! <span><i class="fa-solid fa-eye"></i>' + views + '</span><div class="clear"></div></h2>\
              </div>\
              <div class="movie-banner-body">\
                <div class="movie-banner-image">\
                  <img src="' + image + '">\
                  <div class="movie-banner-image-shadow trailer-trigger" id="movie-' + i + '" video-frame="' + i + '">\
                    <div class="play-button">\
                      <div class="play-svg"></div>\
                    </div>\
                  </div>'
                  + topTag +
                '</div>'
                + setRatingBox(score, views, true) +
                '<div class="title">\
                  <h2>' + title + '</h2>\
                </div>'
                + setMovieDetails(runtime, genres, release) +
                '<div class="description">\
                  <p>' + description + '</p>\
                </div>\
              </div>\
              <div class="movie-banner-footer">\
                <h2>\
                  <a href="" class="watch-stream">\
                    <i class="fa-solid fa-circle-play"></i>WATCH ON STREAM\
                  </a>\
                  <a href="" class="add-library">\
                    <i class="fa-regular fa-bookmark"></i>ADD TO WATCHLIST\
                  </a>\
                  <a href="" class="share-movie">\
                    <i class="fa-solid fa-share"></i>SHARE THIS MOVIE\
                  </a>\
                </h2>\
              </div>\
            </div>\
            <div class="clear"></div>\
          </div>\
        </div>\
      ')

      $('.trailer-mask').append('\
        <div class="movie-banner-trailer" id="movie-' + i + '">\
          <div class="trailer-header">\
            <h3 class="trailer-title">' + title + '</h3>\
            <span class="movie-release">Release Date: ' + release + '</span><span class="trailer-close-button" id="movie-' + i + '">X</span>\
          </div>\
          <div class="iframe-wrapper"></div>\
        </div>\
      ')
    }
  }

  function openTrailer(box, trailerBox){
    $(box).click(function(){
      let id = $(this).attr('id');
      let element = $(trailerBox + ' #' + id);
      let index = $(this).attr('video-frame');
      
      $(element).find('.iframe-wrapper').append(catalogue[Number(index)].iframe);
      $(trailerBox).fadeIn(250);
      $(element).fadeIn(250);
      $('body').css('overflow', 'hidden');
    })
  }

  function closeTrailer(closeButton, trailerBox){
    $(closeButton).click(function(){
      let id = $(this).attr('id');
      let element = $(trailerBox + ' #' + id);

      $(trailerBox).fadeOut(250);
      $(element).fadeOut(250);
      $('body').css('overflow', 'auto');
      setTimeout(()=>{$(element).find('.iframe-wrapper').empty()}, 250);
    })
  }

  openTrailer('.movie', '.descriptions');
  openTrailer('.movie-banner .image', '.trailer-mask');
  openTrailer('.movie-banner .movie-banner-image-shadow', '.trailer-mask');

  closeTrailer('.description-close-button', '.descriptions');
  closeTrailer('.trailer-close-button', '.trailer-mask');

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

        $('.menu-mask').fadeIn(250);
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

        $('.menu-mask').fadeOut(250);
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