$(()=>{
  var menuOpen = false;
  var menuAnimation = false;
  var scrollingUp = false;

  movieRatings = ['\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
    <i class="fa-solid fa-star-half-stroke"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>\
    <i class="fa-regular fa-star"></i>','\
    \
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

  function generateRating(score){
    if(score == 'Score not yet available')
      return '<span style="color: white">Score not available</span>'

    for(let i = 1; i < movieRatings.length + 1; i++){
      if(score <= i * 10 && score != 100){
        return movieRatings[i - 1]
      }
    }

    return movieRatings[10]
  }

  function setColor(score) {
    let value = Math.min(Math.max(score, 0), 100);
    let greenAmount = Math.round((value / 100) * 255);
    let redAmount = 255 - greenAmount;
    let color = `rgb(${redAmount}, ${greenAmount}, 0)`;

    return color
  }

  function setRatingBox(score, views, target){
    if(score != 'Score not yet available'){
      score = Number(score)

      if(target){
        return '\
        <div class="movie-rating">\
          ' + '<span class="movie-score" style="background-color: ' + setColor(score) + '">' + score + '</span>' + generateRating(score) + '\
        </div>'

      }else{
        return '\
        <div class="description-rating">\
          ' + '<span class="movie-score" style="background-color: ' + setColor(score) + '; color: black">' + score + '</span>' + generateRating(score) + '<span><i class="fa-solid fa-eye"></i>' + views + '</span>\
        </div>'
      }

    }else{
      if(target){
        return '\
        <div class="movie-rating">\
          <span>Score not available</span>\
        </div>'

      }else{
        return '\
        <div class="description-rating">\
          <span>Score not available</span>' + '<span><i class="fa-solid fa-eye"></i>' + views + '</span>\
        </div>'
      }
    }
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function numberConvert(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function generateViews(score){
    let number;

    if(score != 'Score not yet available'){
      score = Number(score)
      let equation = score ** (3.4 + (score/(-1500)))
      let min = equation;
      let max = equation * 1.3;

      if(score == 0)
        score = 1

      number = randomNumber(min, max)

    }else{
      number = randomNumber(1000, 10000)
    }

    let views = Math.floor(number);
    return numberConvert(views);
  }

  function generateTopTag(score){
    if(Number(score) >= 90)
      return '<div class="top-tag"><p>TOP MOVIE ✨</p></div>'
    else
      return ''
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
    let rating = generateRating(catalogue[i].score);
    let views = generateViews(catalogue[i].score);
    let topTag = generateTopTag(catalogue[i].score);

    if(i % 28 != 0){
      $('.main').append('\
        <div class="movie-wrapper">\
          <div class="movie" id="movie-' + i + '" video-frame="' + i + '">\
            <div class="image" title=\'' + 'WATCH "' + catalogue[i].title.toUpperCase() + '" ON YOUR FAVORITE STREAMING SERVICE RIGHT NOW!\'>\
              <img src="' + catalogue[i].image + '">'
              + topTag +
              '<div class="image-shadow"></div>\
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
        </div>\
      ');

      $('.descriptions').append('\
        <div class="description" id="movie-' + i + '">\
          <div class="description-header">\
            <h3>' + catalogue[i].title + '</h3><span class="movie-release">Release Date: ' + catalogue[i].release + '</span><span class="description-close-button" id="movie-' + i + '">X</span>\
          </div>\
          <div class="iframe-wrapper"></div>\
          <div class="description-body">'
            + setRatingBox(catalogue[i].score, views, false) +
            '<div class="movie-details">\
              <p>Runtime: ' + catalogue[i].runtime + '</p>\
              <p>Genre: ' + catalogue[i].genres + '</p>\
            </div>\
            <p>' + catalogue[i].description + '</p>\
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
            <div class="image" id="movie-' + i + '">\
              <img src="' + catalogue[i].image + '">\
              <div class="image-shadow"></div>'
              + topTag +
            '</div>\
            <div class="movie-banner-info">\
              <div class="movie-banner-header">\
                <h2><i class="fa-solid fa-arrow-up-right-dots"></i>FEATURING THIS MONTH! <span><i class="fa-solid fa-eye"></i>' + views + '</span><div class="clear"></div></h2>\
              </div>\
              <div class="movie-banner-body">\
                <div class="movie-banner-image">\
                  <img src="' + catalogue[i].image + '">\
                  <div class="movie-banner-image-shadow"></div>'
                  + topTag +
                '</div>'
                + setRatingBox(catalogue[i].score, views, true) +
                '<div class="title">\
                  <h2>' + catalogue[i].title + '</h2>\
                </div>\
                <div class="movie-details">\
                  <p>Release Date: ' + catalogue[i].release + '</p>\
                  <p>Runtime: ' + catalogue[i].runtime + '</p>\
                  <p>Genre: ' + catalogue[i].genres + '</p>\
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
    }
  }

  $('.movie').click(function(){
    let id = $(this).attr('id');
    let element = $('.descriptions #' + id);
    let index = $(this).attr('video-frame')

    $(element).find('.iframe-wrapper').append(catalogue[Number(index)].iframe);
    $('.descriptions').fadeIn(250);
    $(element).fadeIn(250);
    $('body').css('overflow', 'hidden');
  })

  $('.description-header span').click(function(){
    let id = $(this).attr('id');
    let element = $('.descriptions #' + id);

    $('.descriptions').fadeOut(250);
    $(element).fadeOut(250);
    $('body').css('overflow', 'auto');
    setTimeout(()=>{$(element).find('.iframe-wrapper').empty()}, 250);
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