$(document).ready(function() {

var timeEl = $("#time");
var dateEl = $("#date");

function displayTime(x) {
    if (x.matches) { // screen is xs or sm
        timeEl.text(moment().format("h:mm a"));
        dateEl.text(moment().format("ddd, MMM Do"));
    }
    else {  //screen is md or larger
        timeEl.text(moment().format("h:mm:ss a"));
        dateEl.text(moment().format("dddd, MMMM Do"));
    }
}
  
var x = window.matchMedia("(max-width: 767px)");
displayTime(x); // display time at run time
x.addListener(displayTime); // Attach listener function on state changes

var timeRefresh = setInterval(function() {  //start timer
    displayTime(x);
}, 1000);

var hourStrings = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];
var containerDiv = $("#main");

for(var i = 0; i < hourStrings.length; i++) {

    var timeRow = $("<div>");
    timeRow.attr("class", "row time-row my-2");

    var hourDiv = $("<div>");
    hourDiv.attr("class", "col-2 text-center time-label bg-primary px-0");
    hourDiv.text(hourStrings[i]);
    timeRow.append(hourDiv);

    var textAreaDiv = $("<div>");
    textAreaDiv.attr("class", "col-8 text-entry p-0 m-0");
    var textArea = $("<textarea>");
    textArea.attr("class", "w-100 h-100 px-2 no-resize d-none");
    textAreaDiv.append(textArea);
    var textDisplay = $("<div>");
    textDisplay.attr("class", "px-2");
    textAreaDiv.append(textDisplay);
    timeRow.append(textAreaDiv);

    var buttonsColDiv = $("<div>");
    buttonsColDiv.attr("class", "col-2 bg-info")
    var buttonsRowDiv = $("<div>");
    buttonsRowDiv.attr("class", "row");
    var buttonDiv1 = $("<div>");
    buttonDiv1.attr("class", "col-lg-6 px-0");
    var button1 = $("<button>");
    button1.attr("class", "btn bg-white d-block mx-auto p-0 action-button add-button");
    button1.html("<i class='fas fa-save'></i>");
    buttonDiv1.append(button1);
    var buttonDiv2 = $("<div>");
    buttonDiv2.attr("class", "col-lg-6 px-0");
    var button2 = $("<button>");
    button2.attr("class", "btn bg-white d-block mx-auto p-0 action-button add-button");
    button2.html("<i class='fas fa-ban'></i>");
    buttonDiv2.append(button2);
    buttonsRowDiv.append(buttonDiv1, buttonDiv2);
    buttonsColDiv.append(buttonsRowDiv);
    timeRow.append(buttonsColDiv);

    containerDiv.append(timeRow);
}

});
