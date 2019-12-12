function handleAddButton(buttonRow) {
    //grab text div
    var textDiv = buttonRow.parent().prev();
    //delete its child div
    textDiv.empty();
    //add an empty textarea element
    var textArea = $("<textarea>");
    textArea.attr("class", "w-100 h-100 px-2 py-0 border-0 no-resize");
    textDiv.append(textArea);
    //delete button div's child elements
    buttonRow.empty();
    //build save and cancel buttons
    makeButton("save", buttonRow);
    makeButton("cancel", buttonRow);
}  //end add button

function handleEditButton(buttonRow) {
    //delete text display element
    var textDiv = buttonRow.parent().prev();
    textDiv.empty();
    //build text area element
    var textArea = $("<textarea>");
    textArea.attr("class", "w-100 h-100 px-2 py-0 border-0 no-resize");
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
