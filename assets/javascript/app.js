


//Array of search terms
var ipurl = "http://api.ipstack.com/131.212.248.60?access_key=a07cea42b7d1f81063d55e1226fe0e86"
var lati=0
var long=0

var ipadd = "https://ipinfo.io/?token=$TOKEN";
// firebase search terms
var search = ["coffee"]

$.ajax({
    url: ipadd,
    method: "GET",
    async: false
}).done( function(response) {
  console.log(response.ip, response.country);
}, "jsonp")



//ajax call for location
 $.ajax({
     url: ipurl,
     method: "GET",
     async: false
   }).done(function(response){
     console.log("Success got data", response);
     lati = response.latitude;
     long = response.longitude;
    //long = response.longitude;
     //location = response.city;
     console.log(lati)
     console.log(long)
});
  

function SearchWeb(){
  //get value of button clicked
    //var SearchButton = $(this).attr("data-name");
    var SearchButton = "coffee";
  //search location for foursquare and searchbutton value
  //TODO - add limit search to 3? 4?
  var queryURL = "https://api.foursquare.com/v2/venues/search?ll="+lati+","+long+"&query="+SearchButton+"&radius=4000&limit=1&client_id=GMCZAGCA1IOH5QCGZYJGYVD0YJLAAUGUNLWUJGGOC2IIXKUU&client_secret=IJUOBHZNIW3PY124FYWWAVULHIHDSNW2OZ1GPKDW2ARO1R2V&v=20180623";

  //ajax call for search term venue
  $.ajax({
      url: queryURL,
      // params: params,
      method: "GET",
      async: false
    }).then(function(response) {
      console.log("Success got data", response);
      
      var results = response.response.venues;
       console.log(results)
       //loop to display 
       for (var i = 0; i < results.length; i++){
         console.log(results[i].name)
         console.log(results[i].location.address)
         console.log(results[i].location.distance)
         //define the outputvariables
         var BusinessName = results[i].name;
         var BusinessLocation = results[i].location.address;
         var BusinessDistance = results[i].location.distance;
         var MapLocation = response;
         $("#table > tbody").append("<tr> <td>" + BusinessName + "</td> </tr>" 
         + "<tr> <td>" + BusinessLocation+ "</td> </tr>" 
         + "<tr> <td>" + BusinessDistance +" Meters" + "</td> </tr>" 
         + "<tr> <td>" + MapLocation + "</td> </tr>")
       }
  });
}
SearchWeb();

//onclick of button , call the new page and display search

$("#button").on("click", function(event){
  event.preventDefault();

  //grab intput from button clicked
  var ButtonValue = $("button").val().trim();

  // move to second page 

  //call render search data function
  SearchWeb();
})


