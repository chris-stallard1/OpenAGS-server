//New Buttons for plotly plots
var linearScaleIcon = {
    'name' : "linear-scale",
    'svg' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_PryGnnTZIQ4lIJ2Dby2iX67e7hrcObL8"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_PryGnnTZIQ4lIJ2Dby2iX67e7hrcObL8)"><line x1="9" y1="8" x2="8" y2="92" vector-effect="non-scaling-stroke" stroke-width="3" stroke="rgb(0,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="8" y1="92" x2="92" y2="92" vector-effect="non-scaling-stroke" stroke-width="3" stroke="rgb(0,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="11" y1="89" x2="92" y2="7" vector-effect="non-scaling-stroke" stroke-width="2" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/></g></svg>'
};
var logScaleIcon = {
    'name' : 'log-scale',
    'svg' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_yr8WnDDLyZc7YlyCSm2ThMbIIFAQCXIn"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_yr8WnDDLyZc7YlyCSm2ThMbIIFAQCXIn)"><line x1="9" y1="8" x2="8" y2="92" vector-effect="non-scaling-stroke" stroke-width="3" stroke="rgb(0,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="8" y1="92" x2="92" y2="92" vector-effect="non-scaling-stroke" stroke-width="3" stroke="rgb(0,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><path d=" M 10 90 L 13.644 80.862 L 20.933 67.662 L 32.778 53.446 L 48.267 39.231 L 64.667 30.092 L 80.156 25.015 L 92 24" fill="none" vector-effect="non-scaling-stroke" stroke-width="2" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/></g></svg>'
};
var PIRIcon = {
    'name' : 'peaks-in-region',
    'svg' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 100 100" width="100pt" height="100pt"><defs><clipPath id="_clipPath_kReHyCC0NX5wrRytD0ofjjw4WyG0gtOx"><rect width="100" height="100"/></clipPath></defs><g clip-path="url(#_clipPath_kReHyCC0NX5wrRytD0ofjjw4WyG0gtOx)"><path d=" M 2 98 L 12 95 L 18 90 L 22 83 L 25 73 L 28 62 L 32 55 L 37 49 L 42 46 L 45 46 L 50 49 L 54 55 L 56 62 L 58 73 L 61 83 L 67 90 L 74 95 L 82 98 L 97 98" fill="none" vector-effect="non-scaling-stroke" stroke-width="2" stroke="rgb(0,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="13" y1="5" x2="13" y2="98" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="45" y1="5" x2="46" y2="98" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><line x1="94" y1="5" x2="95" y2="98" vector-effect="non-scaling-stroke" stroke-width="1" stroke="rgb(255,0,0)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/></g></svg>'
}

//button implementations
var universalModeButtons = [
    {
        "name" : "Linear Scale",
        "icon" : linearScaleIcon,
        click : function(gd){//set scale to linear, keep all other properties
            if(gd.data.length === 2){
                var newLayout = {
                    yaxis: {
                        type: 'linear',
                        title: "Counts Per Second",
                        autorange: true
                    },
                    yaxis2: {
                        type: 'linear',
                        autorange: true,
                        domain: [0, 1],
                        anchor: "x2"
                    }
                }
            }
            else{
                var newLayout = {
                    yaxis: {
                        type: 'linear',
                        title: "Counts Per Second",
                        autorange: true
                    }
                }
            }
            Plotly.relayout(gd,newLayout)
        }
    },
    {
        "name" : "Log Scale",
        "icon" : logScaleIcon,
        click : function(gd){//set scale to log, keep other properies
            if(gd.data.length === 2){
                var newLayout = {
                    yaxis: {
                        type: 'log',
                        title: "Counts Per Second",
                        autorange: true
                    },
                    yaxis2: {
                        type: 'log',
                        autorange: true,
                        domain: [0, 1],
                        anchor: "x2"
                    }
                }
            }
            else{
                var newLayout = {
                    yaxis: {
                        type: 'log',
                        title: "Counts Per Second",
                        autorange: true
                    }
                }
            }
            Plotly.relayout(gd,newLayout)
        }
    }]
var editModeButton = {
    "name" : "Show Peaks In Region",
    "icon" : PIRIcon,
    click: function(gd){
        var index = parseInt(gd.id.split('-')[1]);
        var newLayout = gd.layout;
        if(newLayout.hasOwnProperty('shapes') && newLayout.shapes.length > 0){
            newLayout["shapes"] = [];
            Plotly.deleteTraces(gd, gd.data.length - 1);
        }
        else{
            newLayout["shapes"] = [];
            var traceX = [];
            var traceText = [];
            for(var i=0;i<window.knownAnnots[index].length;i++){
                newLayout["shapes"].push(
                    {
                        type: 'line',
                        yref: 'paper',
                        x0: window.knownAnnots[index][i][0],
                        y0: 0,
                        x1: window.knownAnnots[index][i][0],
                        y1: 1,
                        line: {
                          color: 'rgb(55, 128, 191)',
                          width: 3
                        }
                    }
                );
                traceX.push(window.knownAnnots[index][i][0] + .1);
                traceText.push(window.knownAnnots[index][i][1]);
            }
            var trace = {
                x : traceX,
                yref: "paper",
                y : Array(traceX.length).fill(Math.max(...gd.data[1].y)),
                text : traceText,
                mode : "text",
                name : "Peaks In Region" 
            }
            Plotly.addTraces(gd,trace,gd.data.length);
        }
        Plotly.relayout(gd, newLayout);

    }
}

//Show Peaks In Region should only appear when viewing ROIs
var addr = window.location.href.split("/")
if(addr[addr.length - 1] == "edit"){
    universalModeButtons.push(editModeButton);
}

var universalPlotConfig = {
    responsive : true,
    modeBarButtonsToAdd : universalModeButtons,
    modeBarButtonsToRemove : ['select2d','lasso2d','zoomIn2d', 'zoomOut2d'] //these don't do much for our application. Select and Lasso don't matter at all, and zoom in/out usually goes too far
};

/**
 * Find the index of the element in arr which is closest to target
 * @param {Array} arr 
 * @param {Number} target 
 */
function findClosest(arr, target)
{
    let n = arr.length;
 
    // Corner cases
    if (target <= arr[0])
        return arr[0];
    if (target >= arr[n - 1])
        return arr[n - 1];
    let l = 0;
    let u = n;
    let i = Math.floor((l+u)/2);
    while(target < arr[i-1] || target > arr[i+1]){
        if(target > arr[i]){
            l = i + 1;
        }
        else if(target < arr[i]){
            u = i - 1;
        }
        else{
            return i;
        }
        i = Math.floor((l+u)/2);
        if(i <= 2 || i >= n - 2){
            break;
        }
    }
    return i;
}