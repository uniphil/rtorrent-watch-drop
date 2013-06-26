var restore = function() {
  var url = localStorage['url'];
  if (url) document.getElementById("url").value = localStorage['url'];
  var dest = localStorage['dest'];
  if (dest) document.getElementById("destination").value = localStorage['dest'];
}

var save = function() {
  localStorage['url'] = document.getElementById("url").value;
  localStorage['dest'] = document.getElementById("destination").value;
  var status = document.getElementById("status");
  status.innerHTML = "saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 666);
}

document.addEventListener('DOMContentLoaded', restore);
document.querySelector('#save').addEventListener('click', save);
