$(document).ready(function(){

var $Form = $('form'), $Container = $('#jsonHolder');
$Container.hide();
$Form.on('submit', function(p_oEvent){

var sUrl, sMovie, oData;
p_oEvent.preventDefault();

sMovie = $Form.find('input').val();
if (sMovie == "") {
  alert('Empty field, put something!');
  return false;
};
var regex = /^tt/i.test(sMovie);
//var found = sMovie.test(regex);
//console.log(regex);
//console.log(sMovie);

  if (regex == true) {
    sUrl = 'http://www.omdbapi.com/?i=' + sMovie + '&type=movie&tomatoes=true';
  }
  else {
    sUrl = 'http://www.omdbapi.com/?t=' + sMovie + '&type=movie&tomatoes=true';
  }

    $.ajax(sUrl, {
        complete: function(p_oXHR, p_sStatus){
            oData = $.parseJSON(p_oXHR.responseText);
            console.log(oData);
            $Container.find('.title').text(oData.Title);
            $Container.find('.release').text(oData.Released);
            $Container.find('.genre').text(oData.Genre);
            $Container.find('.rated').text(oData.Rated);
            $Container.find('.plot').text(oData.Plot);
            $Container.find('.website').html('<a href="' + oData.Website + '">' + oData.Website + '</a>');
            $Container.find('.poster').html('<img src="' + oData.Poster + '"/>');
            $Container.show();
        }
    });    
});
});