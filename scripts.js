$(document).ready(function(){

function someFunc() {
  if (!$("input[name='movie']").val()) {
   alert('Empty field, put something!');
   return false;
}
}

var $Form = $('form'), $Container = $('#jsonHolder');
$Container.hide();
$Form.on('submit', function(p_oEvent){
    var sUrl, sMovie, oData;
    p_oEvent.preventDefault();
sMovie = $Form.find('input').val();
var regex = /^tt/i.test(sMovie);
//var found = sMovie.test(regex);
console.log(regex);

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
            $Container.find('.year').text(oData.Year);
            $Container.find('.genre').text(oData.Genre);
            $Container.find('.plot').text(oData.Plot);
            $Container.find('.poster').html('<img src="' + oData.Poster + '"/>');
            $Container.show();
        }
    });    
});
});