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

function setMovieDetails(runtime, genres, release=false){
  if(release){
    return '\
    <div class="movie-details">\
      <p>Release Date: ' + release + '</p>\
      <p>Runtime: ' + runtime + '</p>\
      <p>Genre: ' + genres + '</p>\
    </div>'

  }else{
    return '\
      <div class="movie-details">\
        <p>Runtime: ' + runtime + '</p>\
        <p>Genre: ' + genres + '</p>\
      </div>'

  }
}

function generateRating(score){
  if(score == 'Score not yet available')
    return '<span style="color: white">Score not available</span>'

  for(let i = movieRatings.length; i >= 0; i--){
    if(score >= i * 10){
      return movieRatings[i]
    }
  }
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
    let equation = score ** (3.7 + (score/(-1500)))
    let min = equation * 0.8;
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
