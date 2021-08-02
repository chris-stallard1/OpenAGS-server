carousel = new bootstrap.Carousel(document.getElementById("mainCarousel"),{
    interval : false
});
carousel.pause();
carousel.to(0);

ps = document.getElementById("pageSelector");

/**
 * Adds a border to the HTML Element obj
 * @param {Element} obj 
 */
function addBdr(obj){
    obj.style.border = "3px solid black";
}
/**
 * Removes a border from the HTML Element obj
 * @param {Element} obj 
 */
function remBdr(obj){
    obj.style.border = "";
}

/**
 * Increases the carousel position by 1 (moves right)
 */
function upOne(){
    if(parseInt(ps.value) != numberPages){
        ps.value = (parseInt(ps.value)+1).toString();
        carousel.next()
    }
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
/**
 * Decreases the carousel's value by 1 (moves left)
 */
function downOne(){
    if(parseInt(ps.value) != 1){
        ps.value = (parseInt(ps.value)-1).toString();
        carousel.prev();
    }
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
/**
 * Moves carousel to top (right) end
 */
function toTopEnd(){
    ps.value=numberPages;
    carousel.to(numberPages - 1);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
/**
 * Moves Carousel to bottom (left) end
 */
function toBotEnd(){
    ps.value=1;
    carousel.to(0);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}

/**
 * Updates the page number of the carousel based on the value of the provided object, usually a <select>
 * @param {Element} obj 
 */
function updatePage(obj){
    newPage = parseInt(obj.value);
    carousel.to(newPage - 1);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}

updatePage(ps);

/**
 * Shows a bootstrap modal with a specified ID.
 * @param {String} id 
 */
function showModal(id){
    (new bootstrap.Modal(document.getElementById(id))).show();
}
/**
 * Opens the error modal and updates the text in it to show the message
 * @param {String} msg 
 */
function showErrorMessage(msg){
    document.getElementById("errorText").innerText = msg;
    var theModal = new bootstrap.Modal(document.getElementById("errorModal"));
    theModal.show();
}
/**
 * Opens the warning modal and updates the text in it to show the message
 * @param {String} msg 
 */
function showWarningMessage(msg){
    document.getElementById("warningText").innerText = msg;
    var theModal = new bootstrap.Modal(document.getElementById("warningModal"));
    theModal.show();
}