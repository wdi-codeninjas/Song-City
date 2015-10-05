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



    $.ajax({
      method: "GET",
      url: "https://api.bandsintown.com/events/search?location=" + cityname + "&format=json&app_id=SongCity",
      dataType: "jsonp",
      success: function(data) {
        console.log(data);

        for (var i = 0; i < 40; i++) {
          $("ul").append("<li>" + data[i].artists[0].name + " | " + data[i].venue.name + "</li>");
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
            url: 'https://api.bandsintown.com/artists/' + artists[i] + '.json?api_version=2.0&app_id=SongCity',
            dataType: "jsonp",
            success: function(data) {

              console.log(artists[i]);

            }
          });
        };
      }


    });



  });

});
