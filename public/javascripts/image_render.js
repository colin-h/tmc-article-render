function placeImages() {

  var $paragraphs = $('.mainText > p');
  var $images = $('#images > img');
  var imgSpread = Math.floor($paragraphs.length / $images.length);

  $('.mainText p:nth-child('+ imgSpread +'n)').each(function (i) {
      $(this).after($images.get(i));
  });
}


$(document).ready(function(){
  console.log("The doc is ready!");

  placeImages();

});
