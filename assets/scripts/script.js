$(document).ready(function() {

var timeEl = $("#time");
var dateEl = $("#date");
var containerDiv = $("#main");
var timeRowArr = [];

var hourStrings = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];



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

    var timeRefresh = setInterval(function() {  //start timer
        displayTime(x);
    }, 1000);
}

function buildSkeleton() {

    for(var i = 0; i < hourStrings.length; i++) {

        var timeRow = $("<div>");
        timeRow.attr("class", "row time-row my-2");

        var hourDiv = $("<div>");
        hourDiv.attr("class", "col-2 text-center time-label bg-primary round-left px-0");
        hourDiv.text(hourStrings[i]);
        timeRow.append(hourDiv);

        var textDiv = $("<div>");
        textDiv.attr("class", "col-8 text-entry p-0 m-0");
        textDiv.attr("id", "rowNum" + i);
        textDiv.attr("data-index", i);
        var textDisplayDiv = $("<div>");
        textDisplayDiv.attr("class", "px-2");
        textDiv.append(textDisplayDiv);
        timeRow.append(textDiv);

        var buttonsColDiv = $("<div>");
        buttonsColDiv.attr("class", "col-2 bg-info round-right")
        var buttonsRowDiv = $("<div>");
        buttonsRowDiv.attr("class", "row buttons-row");

        makeButton("add", buttonsRowDiv);

        buttonsColDiv.append(buttonsRowDiv);
        timeRow.append(buttonsColDiv);

        timeRowArr.push(timeRow);

        containerDiv.append(timeRow);
    }
}

function makeButton(buttonType, parentDiv) {
   
    var buttonDiv = $("<div>");
    if(buttonType === "add"){
        buttonDiv.attr("class", "col px-0");
    }
    else {
        buttonDiv.attr("class", "col-lg-6 px-0");
    }
    var button = $("<button>");
    button.attr("class", "btn bg-white d-block mx-auto p-0 action-button");
    button.attr("data-buttonType", buttonType);
    
    switch(buttonType) {
        
        case "add":
            button.html("<i class='fas fa-plus'></i>");
            break;

        case "edit":
            button.html("<i class='fas fa-edit'></i>");
            break;

        case "delete":
            button.html("<i class='fas fa-trash'></i>");
            break;

        case "save":
            button.html("<i class='fas fa-save'></i>");
            break;

        case "cancel":
            button.html("<i class='fas fa-ban'></i>");
            break;

        default:
            console.log("ERROR: Unexpected button type");

    }  //end switch

    buttonDiv.append(button);
   
    parentDiv.append(buttonDiv);
}  //end makeButton function

function loadData() {  //fetch data from local storage and display in appropriate elements
    console.log("loadData function called");
    var data;

    for(var i = 0; i < hourStrings.length; i++){
        data = localStorage.getItem(i);
        if (data !== null && data !== ""){
            //load the data into the text display element   
            var textDiv = $("#rowNum" + i);
            $(textDiv.children()[0]).text(data);
            //replace add button with edit & delete buttons
            var buttonRow = $(textDiv.next().children()[0]);
            buttonRow.empty();
            makeButton("edit", buttonRow);
            makeButton("delete", buttonRow);
        }
    }
}

function initializePage() {
    
    loadTime();
    buildSkeleton();
    loadData();
}

function handleAddButton(buttonRow) {
    console.log("add button clicked");
    //grab text div
    var textDiv = buttonRow.parent().prev();
    //delete its child div
    textDiv.empty();
    //add an empty textarea element
    var textArea = $("<textarea>");
    textArea.attr("class", "w-100 h-100 px-2 no-resize");
    textDiv.append(textArea);
    //delete button div's child elements
    buttonRow.empty();
    //build save and cancel buttons
    makeButton("save", buttonRow);
    makeButton("cancel", buttonRow);
}  //end add button

function handleEditButton(buttonRow) {
    console.log("edit button clicked");
    //delete text display element
    var textDiv = buttonRow.parent().prev();
    textDiv.empty();
    //build text area element
    var textArea = $("<textarea>");
    textArea.attr("class", "w-100 h-100 px-2 no-resize");
    //populate it with data in localStorage
    var elIndex = textDiv.attr("data-index");
    var savedText = localStorage.getItem(elIndex);
    textArea.text(savedText);

    textDiv.append(textArea);
    //delete buttons
    buttonRow.empty();
    //build buttons
    makeButton("save", buttonRow);
    makeButton("cancel", buttonRow);
}  //end edit button

function handleDeleteButton(buttonRow) {
    console.log("delete button clicked");
    //empty text content of text display div
    var textDiv = buttonRow.parent().prev();
    var textDisplayDiv = $(textDiv.children()[0]);
    textDisplayDiv.empty();
    //replace localStorage data with empty string
    var elIndex = textDiv.attr("data-index");
    localStorage.setItem(elIndex, "");
    //delete buttons
    buttonRow.empty();
    //build add button
    makeButton("add", buttonRow);
}  //end delete button

function handleSaveButton(buttonRow) {
    console.log("save button clicked");
    //grab user's input text
    var textDiv = buttonRow.parent().prev();
    textAreaEl = $(textDiv.children()[0]);
    var inputStr = textAreaEl.val();
    //save it to localStorage
    var elIndex = textDiv.attr("data-index");
    localStorage.setItem(elIndex, inputStr);
    //delete textarea element
    textDiv.empty();
    //add text div element
    var textDisplay = $("<div>");
    textDisplay.attr("class", "px-2");
    //populate it with saved text
    var savedText = localStorage.getItem(elIndex);
    textDisplay.text(savedText);

    textDiv.append(textDisplay);

    //delete buttons
    buttonRow.empty();

    //build buttons
    if (savedText === "" || savedText === null){
        makeButton("add", buttonRow);
    }
    else {
        makeButton("edit", buttonRow);
        makeButton("delete", buttonRow);
    }
}  //end save button

function handleCancelButton(buttonRow) {
    console.log("cancel button clicked");
    //empty the main div
    var textDiv = buttonRow.parent().prev();
    textDiv.empty();
    //build a text display div
    var textDisplay = $("<div>");
    textDisplay.attr("class", "px-2");
    //populate it with saved text
    var elIndex = textDiv.attr("data-index");
    var savedText = localStorage.getItem(elIndex);
    textDisplay.text(savedText);

    textDiv.append(textDisplay);

    //delete buttons
    buttonRow.empty();

    //build buttons
    if (savedText === "" || savedText === null){
        makeButton("add", buttonRow);
    }
    else {
        makeButton("edit", buttonRow);
        makeButton("delete", buttonRow);
    }
}  //end cancel button



initializePage();


//add event listeners for all buttons
$(document).on("click", ".buttons-row", function(event){

    //grab the clicked button or return if a button wasn't clicked
    var clickTargetName = event.target.nodeName;
    var targetButton;

    if(clickTargetName === "BUTTON"){  //click was on button element
        targetButton = $(event.target);
    }
    else if (clickTargetName === "I"){  //click was on icon inside button
        targetButton = $(event.target).parent();
    }
    else{  //click was not on a button
        return;
    }

    //get button type
    var buttonType = targetButton.attr("data-buttonType");

    //switch - call functions to handle button types, passing clicked buttons-row element
    switch(buttonType){

        case "add":
            handleAddButton($(this));
            break;

        case "edit":
            handleEditButton($(this));
            break;

        case "delete":
            handleDeleteButton($(this));
            break;

        case "save":
            handleSaveButton($(this));
            break;

        case "cancel":
            handleCancelButton($(this));
            break;

        default:
            console.log("ERROR: Unexpected button type");
    }
});

});
