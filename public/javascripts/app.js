$(document).ready(function() {
  $(".eight.columns.main-content").hide();
  $("#city-submit").on('click', function() {
      $(".eight.columns.main-content").fadeIn(200);
  });

  //http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=YOUR_APP_ID
  var artistArray = [];
  $('.six.columns.main-content').hide();
  $('#city-submit').click(function(evt) {
    var cityname = $('#city-input').val();
    $('.six.columns.main-content').fadeIn(200);
    var map = new GMaps({
      div: '#map',
      lat: 0,
      lng: 0,
      zoom: 12
    });

    var results;

    $.ajax({
      method: "GET",
      url: "//api.bandsintown.com/events/search?location=" + cityname + "&format=json&app_id=SongCity",
      dataType: "jsonp",
      success: function(data) {
        console.log(data)
        results = data;
        for (var i = 0; i < 40; i++) {

          artistArray[i] = data[i].artists[0].name;
          var lat = data[i].venue.latitude;
          var long = data[i].venue.longitude;

          map.setCenter(lat, long);
          map.addMarker({
            lat: lat,
            lng: long,
            click: function(e) {
              alert('You clicked in this marker');
            }
          });

          LoadArtist(data[i]);

        };
      }


    });


    function LoadArtist(artist) {
      var workingArtist = artist;
      $.ajax({
        method: "GET",
        url: '//api.bandsintown.com/artists/' + workingArtist.artists[0].name + '.json?api_version=2.0&app_id=SongCity',
        dataType: "jsonp",
        success: function(data) {
          // console.log(results)
          workingArtist.artists[0].image = data.image_url;
          $("ul").append("<li>" + workingArtist.artists[0].name + "</li></li> " + workingArtist.venue.name + "</li><li>" + timeConversion(workingArtist.datetime) + "</li><li><img class='artist-image' height='200px' width='200px' src='" + workingArtist.artists[0].image + "'></li><hr>");
          // $("ul").append("<img height='200px' width='200px' src='" + data.image_url + "'>");

        }
      });
    }



  });

});

function timeConversion(time) {
  var convertedTime = "";
  for (var i = 0; i < 10; i++) {
    convertedTime += time.charAt(i);
  };
  return convertedTime;
};
