var params = new URLSearchParams(window.location.search);
var lng = params.get('lng').substr(0,2);
var from = params.get('from');
var to = params.get('to');
console.log(lng + "|" + from + "|" + to);

console.log(members[to]);

var toMember = members[to];
var fromMember = members[from];
var shortTitle = toMember['shortTitle'];

window.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById('popup');
    console.log(popup);
    popup.innerHTML = popup.innerHTML.replace(/{country}/g, shortTitle);
    popup.innerHTML = popup.innerHTML.replace(/{origin}/g, fromMember['shortTitle']);
});