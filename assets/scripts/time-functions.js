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

function loadTime() {
    var x = window.matchMedia("(max-width: 767px)");
    displayTime(x); // display time at run time
    x.addListener(displayTime); // Attach listener function on state changes

    var timeRefresh = setInterval(function() {
        displayTime(x);
        colorRows();
    }, 1000);
}