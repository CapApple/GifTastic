var animals = [];
// function for adding buttons
function renderButtons(){
    for(var i=0; i<animals.length; i++){
        var newButton = $("<button>");
        newButton.text(animals[i]);
        newButton.attr("data-name", animals[i]);
        newButton.addClass("animal-buttons");
        newButton.attr("data-count", 0);
        $(".buttons").prepend(newButton);
    }
}

// function for display gifs
function displayGif(){
    var name = $(that).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=VPWNJ9bWtdDuxswvF8UW3Umnkzlwnb2b"
    console.log(name);
    var clickCount = parseInt($(that).attr("data-count"));
    console.log("clickCount"+clickCount);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $(".picture-area").prepend("<br><p>line</p>");
        // display 10 pics at a time
        for(var i=clickCount; i<clickCount+3; i++){
            var stillURL = response.data[i].images.fixed_height_still.url;
            var animateURL = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;
            console.log(rating);
            console.log(stillURL);
            // create new image and set its src, data-still, data-animate and data-state attribute
            var newImage = $("<img>");
            newImage.attr("src", stillURL);
            newImage.attr("data-still", stillURL);
            newImage.attr("data-animate", animateURL);
            newImage.attr("data-state", "still");

            // create a div for rating
            var ratings = $("<div>").text("rating: " + rating);
            ratings.addClass("rating");
            // create fav and download buttons
            // using font-awesome to generate icons for buttons
            var dlIcon = $("<i>");
            dlIcon.addClass("fas fa-arrow-down");
            var dl = $("<button>").append(dlIcon);
            var dlLink = $("<a>");
            dlLink.attr("href", animateURL);
            dlLink.attr("target", "_blank");
            dlLink.append(dl);
            var favIcon = $("<i>");
            favIcon.addClass("fas fa-star");
            var fav = $("<button>").append(favIcon);
            dl.addClass("image-button download");
            fav.addClass("image-button favorite");
            // put the image, rating and buttons into a new div and output the new div to html
            var cell = $("<div>");
            cell.addClass("cells");
            cell.append(newImage);
            cell.append("<br>");
            cell.append(ratings);
            // cell.append("<br>");
            cell.append(fav);
            cell.append(dlLink);
            // cell.append(newImage + "<br>" + rating + "<br>" + fav + dl);
            $(".picture-area").prepend(cell);
        }
    })
}

// adding animals when submit button is clicked
$("#submit").on("click", function(){
    event.preventDefault();
    var newAnimal = $("#animal-input").val();
    if(newAnimal != ""){
        animals.push(newAnimal);
    }
    $(".buttons").empty();
    renderButtons();
    $("#animal-input").val("");
})

// display gifs when animal butotn is clicked
// $(document).on("click", ".animal-buttons", function(){
//     that = this;
//     displayGif();
// })


// advanced version

$(document).on("click", ".animal-buttons", function(){
    that = this;
    console.log($(that).attr('data-count'));
    displayGif();
    var newCount = parseInt($(this).attr("data-count")) + 3;
    $(that).attr("data-count", newCount);
});
  

// toggle the gif state between still and animate when the image is clicked
$(document).on("click", "img", function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

