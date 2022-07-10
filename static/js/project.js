//unintended but smart solution that uses ws:// if we are on http, but wss:// if we are on https
var wsUrl = window.location.href.toString().replace("http","ws").replace(/edit.*/,"ws");
var ws = new WebSocket(wsUrl);
let url = window.location.href.toString().split("/");
var currentBatch = parseInt(url[url.length - 1]);
ws.onmessage = function (event) {
    var data = JSON.parse(event.data);
    switch(data.type){
        case "titleUpdate":
            //just update the title
            document.getElementById("cdTitle").value = data.newTitle;
            break;
        case "entryReprResponse":
            //add an entry to the current fit section
            if(data.batchNumber === currentBatch) {
                if (data.class === "peaks") {
                    let peaksList = document.getElementById("fittedPeaksList-" + data.index.toString());
                    let output = data.output;
                    window.newPeaks[data.index][output] = [data.name].concat(data.params);
                    peaksList.innerHTML = peaksList.innerHTML + "<li class='list-group-item compact' id=\"" + output + "\"><p class = 'peak-label'>" + output + "</p><img class='rmv-btn' src='/icons/file-x.svg' onclick='remove_peak_from_list(\"" + output + "\")'/></li>";
                } else if (data.class === "backgrounds") {
                    let bgList = document.getElementById("fittedBgList-" + data.index.toString());
                    let output = data.output;
                    window.newBackgrounds[data.index] = [data.name].concat(data.params);
                    bgList.innerHTML = DOMPurify.sanitize("<li class='list-group-item compact' id=\"" + output + "\"><p class = 'bg-label'>" + output + "</p>");
                }
            }
            break;
        case "ROIUpdate":
            if(data.batchNumber === currentBatch) {
                //update absolutely everything, new fit
                var i = data.index;

                //reset some stuff
                window.newPeaks[i] = {};
                window.newBackgrounds[i] = null;
                window.originalEnergyBounds[i] = data.ROIRange;
                resetEnergyBounds(i);

                dataTrace = {
                    x: data.xdata,
                    y: data.ydata,
                    mode: "markers",
                    name: "Data"
                }
                //if we have fitted a previously unfitted region, remove it from unfitetd regions list
                if (data.fitted && window.unfittedRegions.indexOf(data.index) !== -1) {
                    window.unfittedRegions.splice(window.unfittedRegions.indexOf(data.index), 1);
                }

                //if we have messed up a previously fitted region, add it to unfitted list and show an error
                if (!data.fitted) {
                    if (window.unfittedRegions.indexOf(data.index) === -1) {
                        window.unfittedRegions.push(data.index);
                    }
                    showErrorMessage("Could not find a fit. Try reducing the number of peaks in the fit. If this doesn't work, you can submit the other ROIs and this one will be ignored.");
                    break;
                }

                //set new background
                let bgList = document.getElementById("fittedBgList-" + data.index.toString());
                bgList.innerHTML = DOMPurify.sanitize("<li class='list-group-item compact' id=\"" + data.bgString + "\"><p class = 'bg-label'>" + data.bgString + "</p>");

                //set new peaks
                let peaksList = document.getElementById("fittedPeaksList-" + data.index.toString());
                peaksList.innerHTML = "";
                for (j = 0; j < data.peakStrings.length; j++) {
                    let output = data.peakStrings[j];
                    peaksList.innerHTML = peaksList.innerHTML + "<li class='list-group-item compact' id=\"" + output + "\"><p class = 'peak-label'>" + output + "</p><img class='rmv-btn' src='/icons/file-x.svg' onclick='remove_peak_from_list(\"" + output + "\")'/></li>";
                }

                //set new matches
                let knownPeaks = document.getElementById("userPeakMatches-" + i.toString()).getElementsByTagName("p");
                let matchSelects = document.getElementById("userPeakMatches-" + i.toString()).getElementsByClassName("peak-match-select");
                for (j = 0; j < matchSelects.length; j++) {
                    let selectHTML = '';
                    let knownCtr = parseFloat(knownPeaks[j].id);
                    let minSep = 99;
                    for (k = 0; k < data.peakX.length; k++) {
                        if (Math.abs(data.peakX[k] - knownCtr) < minSep) {
                            minSep = Math.abs(data.peakX[k] - knownCtr);
                        }
                    }
                    for (k = 0; k < data.peakStrings.length; k++) {
                        if (Math.abs(data.peakX[k] - knownCtr) === minSep) {
                            selectHTML += "<option selected value='" + data.peakX[k].toString() + "'>" + data.peakStrings[k] + "</option>"
                        } else {
                            selectHTML += "<option value='" + data.peakX[k].toString() + "'>" + data.peakStrings[k] + "</option>"
                        }
                    }
                    matchSelects[j].innerHTML = DOMPurify.sanitize(selectHTML);
                }

                let plot = document.getElementById("ROI-" + i.toString());

                //add other traces if the data is fitted, and update the plot
                if (data.fitted) {
                    let fitTrace = {
                        x: data.curveX,
                        y: data.curveY,
                        mode: "lines",
                        name: "Fit"
                    }
                    let peakY = data.peakX.map(x => data.curveY[Math.floor((x - data.curveX[0]) * 100)]);
                    let peakTrace = {
                        x: data.peakX,
                        y: peakY,
                        mode: "markers",
                        name: "Peaks"
                    }
                    let bgTrace = {
                        x: data.curveX,
                        y: data.backgroundY,
                        mode: "lines",
                        name: "Background"
                    }
                    let allTraces = [bgTrace, fitTrace, peakTrace, dataTrace];
                    while (plot.data.length > 0) {
                        Plotly.deleteTraces(plot, 0);
                    }
                    Plotly.addTraces(plot, allTraces);
                } else {
                    let allTraces = [dataTrace];
                    while (plot.data.length > 0) {
                        Plotly.deleteTraces(plot, 0);
                    }
                    Plotly.addTraces(plot, allTraces);
                }
            }
            break;
        case "matchUpdate":
            //update one of the matches
            if(data.batchNumber === currentBatch) {
                document.getElementById("userPeakMatches-" + data.ROIIndex.toString()).getElementsByTagName('select')[data.matchIndex.toString()].value = data.newValue.toString();
            }
            break;
        case "isotopeUpdateResponse":
            //if isotopes are updated, the page must be refreshed
            ws.close();       
            showModal("refreshPageModal");
            break;
        case "resultsGenerated":
            //if all results are generated, you usually want to view them
            if(data.allGenerated) {
                ws.close();
                showModal("fullResultsModal");
            }
            else if(data.batchNumber === currentBatch) {
                ws.close();
                showModal("partialResultsModal");
            }
            break;
        case "error":
            //if there's a backend error, show it in the frontend
            showErrorMessage(data.text);
            break;
    }

};

/**
 * Sets the peak entry options below the "Select Peak" box in the ith ROI window. uses window.entryFields to see field names and count.
 * @param {Number} i 
 */
function updatePeakEntry(i){
    var peakType = document.getElementById("peakSelect-"+i.toString()).value;
    var peaksList = document.getElementById("userPeakEntry-"+i.toString());
    var newInnerHTML = "";
    if(peakType !== "Select Peak Type"){
        window.entryFields["peaks"][peakType].forEach((field) => {newInnerHTML = newInnerHTML + "<li class='list-group-item'><p style='float:left;'>"+field+"</p><input class='form-control w-50 peak-entry' style='float:right;'/></li>"});
    }
    peaksList.innerHTML = DOMPurify.sanitize(newInnerHTML);
}

/**
 * Transmits an added peak through the WebSocket for ROI #i
 * @param {Number} i 
 */
function add_peak_to_list(i){
    let peakType = document.getElementById("peakSelect-"+i.toString()).value;
    let peaksList = document.getElementById("userPeakEntry-"+i.toString());
    let peakProps = peaksList.getElementsByClassName("peak-entry");
    let propValues = [];
    for(j=0;j<peakProps.length;j++){
        propValues[j] = peakProps[j].value;
        peakProps[j].value = "";
    }
    let wsSendObj = {
        "type" : "entryReprRequest",
        "batchNumber" : currentBatch,
        "ROIIndex" : i,
        "class" : "peaks",
        "name" : peakType,
        "entryParams" : propValues
    }
    ws.send(JSON.stringify(wsSendObj));
}

//TODO: Potentially unnecessary, look at removing
function remove_peak_from_list(peakID){
    document.getElementById(peakID).remove();
}

/**
 * Transmits a user-selected background type to the websocket for ROI #i
 * @param {Number} i 
 */
function editBackground(i){
    let bgType = document.getElementById("backgroundSelect-"+i.toString()).value;
    let wsSendObj = {
        "type" : "entryReprRequest",
        "batchNumber" : parseInt(window.location.href.split('/').at(-1)),
        "ROIIndex" : i,
        "class" : "backgrounds",
        "name" : bgType,
        "entryParams" : []
    }
    ws.send(JSON.stringify(wsSendObj));
}

/**
 * Resets the ROI range for ROI #i in case a user has entered an invalid value
 * @param {Number} i 
 */
function resetEnergyBounds(i){
    let entryList = document.getElementById("editRangeList-"+i.toString()).getElementsByTagName("input");
    entryList[0].value = window.originalEnergyBounds[i][0].toString();
    entryList[1].value = window.originalEnergyBounds[i][1].toString();
}
/**
 * Sends the WebSocket request to renaalyze ROI #i
 * @param {Number} i 
 */

function reanalyze(i){
    let peaksList = document.getElementById("fittedPeaksList-"+i.toString());
    let peaks = peaksList.getElementsByClassName("peak-label");
    
    let existingPeaksToKeep = [];
    let newPeaksToAdd = [];
    for(j=0;j<peaks.length;j++){
        peak = peaks[j].innerText;
        if(window.newPeaks[i].hasOwnProperty(peak)){//check if this peak was already added last time
            newPeaksToAdd.push(window.newPeaks[i][peak]);
        }
        else{
            existingPeaksToKeep.push(peak);
        }
    }
    let bgToAdd = window.newBackgrounds[i];
    
    outputObject = {"type":"ROIUpdate", "batchNumber":parseInt(window.location.href.split('/').at(-1)), "index":i};

    //add new range to the object, if applicable 
    let entryList = document.getElementById("editRangeList-"+i.toString()).getElementsByTagName("input");
    if(entryList[0].value != window.originalEnergyBounds[i][0] || entryList[1].value != window.originalEnergyBounds[i][1]){
        let minEnergy = parseFloat(entryList[0].value);
        let maxEnergy = parseFloat(entryList[1].value);
        if(isNaN(minEnergy) || isNaN(maxEnergy)){
            return showErrorMessage("Please enter decimal numbers for the range.")
        }
        outputObject["newRange"] = [minEnergy, maxEnergy];
    }

    //add peaks to keep, add, plus the background to the request
    if(existingPeaksToKeep !== []){
        outputObject["existingPeaks"] = existingPeaksToKeep;
    }
    if(newPeaksToAdd !== []){
        outputObject["newPeaks"] = newPeaksToAdd;
    }
    if(bgToAdd !== null){
        outputObject["background"] = bgToAdd;
    }
    console.log(JSON.stringify(outputObject));
    ws.send(JSON.stringify(outputObject));
}

function updateTitle(){
    let newTitle = document.getElementById("cdTitle").value;
    ws.send('{"type":"titleUpdate","newTitle":"'+newTitle+'"}');
}

/**
 * Submits the user's matches of known peaks and peaks in data, which will then bring up the results screen.
 */
function submitMatches(){
    let peakPairs = [];
    for(let i=0;i<numberPages;i++){
        let numKnownPeaks = document.getElementById("userPeakMatches-"+i.toString()).childElementCount;
        let knownPeakLabels = document.getElementById("userPeakMatches-"+i.toString()).getElementsByTagName("p");
        let peakMatches = document.getElementById("userPeakMatches-"+i.toString()).getElementsByTagName("select");
        let pairsInRegion = []
        for(let j=0;j<numKnownPeaks;j++){
            let pair = [parseFloat(peakMatches[j].value), parseFloat(knownPeakLabels[j].id)];
            pairsInRegion.push(pair);
        }
        peakPairs.push(pairsInRegion);
    }
    let outputObj = {
        "type" : "peakMatchSubmission",
        "batchNumber" : parseInt(window.location.href.split('/').at(-1)),
        "pairs" : peakPairs
    }
    ws.send(JSON.stringify(outputObj));
}

/**
 * Sends a WebSocket request saying that the user has updated the jth match of the ith ROI, and sends the new value.
 * @param {Number} i 
 * @param {Number} j 
 */
function sendMatchUpdate(i,j){
    let newValue = document.getElementById("userPeakMatches-"+i.toString()).getElementsByTagName('select')[j.toString()].value;
    let outputObj = {
        "type" : "matchUpdate",
        "batchNumber" : parseInt(window.location.href.split('/').at(-1)),
        "ROIIndex" : i,
        "matchIndex" : j,
        "newValue" : newValue
    };
    ws.send(JSON.stringify(outputObj));
}

function confirmSubmission(){
    if(window.unfittedRegions.length > 0){
        document.getElementById("confirmWarningText").innerText = "Unfitted Regions: ("+window.unfittedRegions.map(x => x+1).toString()+")";
    }
    else{
        document.getElementById("confirmWarningText").innerText = "";
    }
    showModal('confirmSubmitModal');
}

function changeBatch(){
    let url = window.location.href.split("/");
    let batch = url[url.length - 1];
    let newBatch = document.getElementById("batchSelect").value;
    if(batch !== newBatch) {
        url[url.length - 1] = newBatch;
        window.location.replace(url.join("/"));
    }
}