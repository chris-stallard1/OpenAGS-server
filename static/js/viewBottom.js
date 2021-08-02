/**
 * Opens the compare regions window for file #i from minEnergy to maxEnergy
 * @param {Number} i 
 * @param {Number} minEnergy 
 * @param {Number} maxEnergy 
 */
function showCompareModal(i, minEnergy, maxEnergy){
    document.getElementById("file1Select").value = filesList[i];

    var minEnergy = document.getElementById("minEnergyInput-"+i.toString()).value;
    var maxEnergy = document.getElementById("maxEnergyInput-"+i.toString()).value;

    if(minEnergy !== "" && maxEnergy !== ""){//if entry bounds are entered, use a custom range
        document.getElementById("compRangeSelect").value = "custom";
        document.getElementById("lowerBoundInput").value = minEnergy;
        document.getElementById("upperBoundInput").value = maxEnergy;
    }
    else{
        var collapseObj = new bootstrap.Collapse(document.getElementById("customRangeForm"));
        collapseObj.hide();
    }
    var theModal = new bootstrap.Modal(document.getElementById("compareSpectraModal"));
    theModal.show();
}

/**
 * If the user selects a custom range, show the entry fields, otherwise hide them
 */
function updateRangeForm(){
    var rangeSelect = document.getElementById("compRangeSelect");
    var collapseObj = new bootstrap.Collapse(document.getElementById("customRangeForm"));
    if(rangeSelect.value === "custom"){
        collapseObj.show();
    }
    else{
        collapseObj.hide();
    }
}
updateShownTimes();