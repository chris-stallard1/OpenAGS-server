carousel = new bootstrap.Carousel(document.getElementById("mainCarousel"),{
    interval : false
});
carousel.pause();
carousel.to(0);
ps = document.getElementById("pageSelector");
function addBdr(obj){
    obj.style.border = "3px solid black";
}
function remBdr(obj){
    obj.style.border = "";
}
function upOne(){
    if(parseInt(ps.value) != numberPages){
        ps.value = (parseInt(ps.value)+1).toString();
        carousel.next()
    }
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
function downOne(){
    if(parseInt(ps.value) != 1){
        ps.value = (parseInt(ps.value)-1).toString();
        carousel.prev();
    }
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
function toTopEnd(){
    ps.value=numberPages;
    carousel.to(numberPages - 1);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
function toBotEnd(){
    ps.value=1;
    carousel.to(0);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}
function updatePage(obj){
    newPage = parseInt(obj.value);
    carousel.to(newPage - 1);
    setTimeout(function(){window.dispatchEvent(new Event('resize'))}, 500);
}

updatePage(ps);

function showModal(id){
    (new bootstrap.Modal(document.getElementById(id))).show();
}

function showErrorMessage(msg){
    document.getElementById("errorText").innerText = msg;
    var theModal = new bootstrap.Modal(document.getElementById("errorModal"));
    theModal.show();
}

function showWarningMessage(msg){
    document.getElementById("warningText").innerText = msg;
    var theModal = new bootstrap.Modal(document.getElementById("warningModal"));
    theModal.show();
}