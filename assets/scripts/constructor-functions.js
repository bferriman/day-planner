const hourStrings = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

function buildSkeleton() {

    var containerDiv = $("#main");

    for(var i = 0; i < hourStrings.length; i++) {

        var timeRow = $("<div>");
        timeRow.attr("class", "row time-row my-2");

        var hourDiv = $("<div>");
        hourDiv.attr("class", "col-2 text-center time-label text-white bg-smoke round-left px-0");
        hourDiv.text(((hourStrings[i] - 1) % 12 + 1)+ ":00");
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
        buttonsColDiv.attr("class", "col-2 bg-smoke round-right")
        var buttonsRowDiv = $("<div>");
        buttonsRowDiv.attr("class", "row buttons-row");

        makeButton("add", buttonsRowDiv);

        buttonsColDiv.append(buttonsRowDiv);
        timeRow.append(buttonsColDiv);

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
    button.attr("class", "btn bg-cardinal text-white d-block mx-auto p-0 action-button");
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

function loadData() {  //fetch data from localStorage and display

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

function colorRows() {
    var currentHour = parseInt(moment().format("H"));  //should be 0-23
    var rowHour;
    for(var i = 0; i < hourStrings.length; i++){
        var textDiv = $("#rowNum" + i);
        rowHour = parseInt(hourStrings[i]);
        if(rowHour < currentHour){  //past
            textDiv.attr("class", "col-8 text-entry bg-past p-0 m-0");
        }
        else if (rowHour === currentHour){  //present
            textDiv.attr("class", "col-8 text-entry text-white bg-present p-0 m-0");
        }
        else {  //future
            textDiv.attr("class", "col-8 text-entry bg-future p-0 m-0");
        }
    }
}
