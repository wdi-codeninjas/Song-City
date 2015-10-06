$(document).ready(function() {
  //http://api.bandsintown.com/artists/Skrillex.json?api_version=2.0&app_id=YOUR_APP_ID
  var artists = [];
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

        results = data;
        for (var i = 0; i < 40; i++) {

          artists[i] = data[i].artists[0].name;
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
          $.ajax({
            method: "GET",
            url: '//api.bandsintown.com/artists/' + artists[i] + '.json?api_version=2.0&app_id=SongCity',
            dataType: "jsonp",
            success: function(data) {
              results[i].artists[0].image = data.image_url;
              console.log(results);
              console.log(data);
              // console.log(data);
              $("ul").append("<li>" + results[i].artists[0].name + " | " + results[i].venue.name + "<img height='200px' width='200px' src='" + results[i].artists[0].image + "'></li>");
              // $("ul").append("<img height='200px' width='200px' src='" + data.image_url + "'>");

            }
          });
        };
      }


    });



  });

});
