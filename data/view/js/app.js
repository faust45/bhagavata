$(function() {
  $('#books-menu a').mouseover(function() {
    $(this).find('img').attr('src', "images/button_book10_hover.png");
  });

  $('#books-menu a').mouseout(function() {
    $(this).find('img').attr('src', "images/button_book10.png");
  });
})
