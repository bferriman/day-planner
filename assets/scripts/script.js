$(document).ready(function() {



function initializePage() {
    
    loadTime();
    buildSkeleton();
    loadData();
    colorRows();
}


initializePage();


$(document).on("click", ".buttons-row", function(event){  //listens for clicks in the div holding the buttons

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
