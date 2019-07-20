

    var pokemons = ["Electabuzz", "Squirtle", "Zapdos", "Golem", "Gengar", "Dratini", "Psyduck","Scyther"]



    function displayPokemon() {
       var pokemon = $(this).attr("data-name")
      
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + pokemon + "&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET",
        })
        // After the data comes back from the API
        .then(function (response) {
          console.log(response)
          // $("#giftcontainer").text(JSON.stringify(response));
        
          
        $("#gifContainer").empty()

         for (var i = 0; i < response.data.length; i++) {

          // Grabbing the div with id gifContainer  and assign it pokeGifDiv variable
        
          var pokeGifDiv = $("<div class='pokemon'>");
        

          // Storing the gif rating data
          var rating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          pokeGifDiv.append(pOne);

          // Retrieving the URL for the image
         var gifURL = response.data[i].images.fixed_height_still.url;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", gifURL,)
          image.attr("class", "gif")
          image.attr("data-still",response.data[i].images.fixed_height_still.url)
          image.attr("data-state", "still")
          image.attr("data-animate", response.data[i].images.fixed_height.url)
          pokeGifDiv.append(image);

          // Putting the  new pokemon  gif above the previous pokemon gif
          $("#gifContainer").prepend(pokeGifDiv);

       }
   });
 }

 $(document.body).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still", );
    }
});
    


 



    function renderButtons() {

      // Deleting the buttons prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#poke-buttons").empty();

      // Loop through the pokemons array
      for (var i = 0; i < pokemons.length; i++) {

        // Generates a button for each item in the pokemon array

        var j = $("<button>");
        // Adding a pokemon class
        j.addClass("pokemonB");
        // Adding a data-attribute
        j.attr("data-name", pokemons[i]);

        j.text(pokemons[i]);
        
        // Adding the buttons to the poke-buttons div
        $("#poke-buttons").append(j);

      }
    };

    // This function handles events where one of th pokemon buttons is clicked
    $("#add-pokemon").on("click", function (event) {
      event.preventDefault();

      // This line grabs the input from the search box
      var pokemon = $("#pokemon-input").val().trim();

      // Adding the pokemon from the textbox to our array
      pokemons.push(pokemon);
      console.log(pokemon);

      // Calling renderButtons which handles the processing of our pokemons array
      renderButtons();
    });

     $(document.body).on("click", ".pokemonB", displayPokemon);
    

    renderButtons();
