function placeImages() {

  var pageDefaults = {

    crop: 'fit',

  };

  var $paragraphs = $('.mainText > p');
  var $images = $('#images > img');
  var $containers = $('#images > .image-container');
  var imgSpread = Math.floor($paragraphs.length / $containers.length);

  $('.mainText p:nth-child('+ imgSpread +'n)').each(function (i) {

    $(this).after($containers.get(i));
    console.log($(this).width());
    var image = $images.get(i);
    var myImage = new imgix.URL('' + image.src);

    console.log(image);
    console.log(myImage);
    myImage.setParams(pageDefaults);
    myImage.setHeight(500);
    myImage.setWidth($('.mainText').width());
    myImage.attachImageTo($containers.get(i));

    // $(this).after($images.get(i));
    $(this).after(myImage);
  });

  $('#images').empty();
}


$(document).ready(function(){
  console.log("The doc is ready!");
  imgix.onready(function() {
    placeImages();
  });
});
