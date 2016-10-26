function sportRadar()
{
 $.ajax({
                  url:"https://SportRadar:5nxa2xdmrcqaewbz4pxc4g3k",
                  // Handle as Text
                  dataType: "text",
                  success: function(data) {
                      // Parse JSON file
                      var json = $.parseJSON(data);
                      //Store data into a variable
                      // Display Players
                      $('#players').html('Currently there are: ' + json.players.now ' users');
		      $('#PlayerInformation').html('Get all Player information for ')

                  }


}
