function placeImages() {

  var pageDefaults = {
    crop: 'fit',
  };

  var $paragraphs = $('.mainText > p');
  var $images = $('#images > img');
  var $containers = $('#images > .image-container');
  var imgSpread = Math.floor($paragraphs.length / $containers.length);

  //format and place images with help of imgix
  $('.mainText p:nth-child('+ imgSpread +'n)').each(function (i) {

    $(this).after($containers.get(i));
    var image = $images.get(i);
    var myImage = new imgix.URL('' + image.src);

    myImage.setParams(pageDefaults);
    myImage.setHeight(500);
    myImage.setWidth($('.mainText').width());
    myImage.attachImageTo($containers.get(i));

  });

  $('#images').empty();
}


$(document).ready(function(){
  imgix.onready(function() {
    placeImages();
  });
});
