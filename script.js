var homebar = document.getElementById("home-navbar");
var hidden = true

function navbar() {
  if (hidden == true) {
    homebar.style.visibility = "visible";
    hidden = false;
  } else {
    homebar.style.visibility = "hidden";
    hidden = true;
  }
};