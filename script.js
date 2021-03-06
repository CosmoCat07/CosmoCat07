var homebar = document.getElementById("homeNavbar");
var hidden = true

var buttons = new Object();
buttons.name = [];
buttons.link = [];

function navbar() {
  if (hidden == true) {
    homebar.style.visibility = "visible";
    hidden = false;
  } else {
    homebar.style.visibility = "hidden";
    hidden = true;
  }
};

var navbars = document.getElementsByClassName("navbar");

var nav = {
  icon : function() {
    var menuIcon = document.createElement("div");
    menuIcon.className = "menuicon";
    menuIcon.onclick = navbar;
    for (i = 0; i < 3; i++) {
      var menuBar = document.createElement("div");
      menuBar.className = "menubar";
      menuBar.innerHTML = "1";
      menuIcon.appendChild(menuBar);
    };
    document.body.insertBefore(menuIcon,document.body.childNodes[0]);
  },
  menu : function(id) {
    nav.icon();
    var bar = document.getElementById(id);
    xml.loadButtons(bar);
  },
  addNavLink : function(text, page) {
    var link = document.createElement("a");
    link.className = "navlink";
    link.onclick = () => window.location.assign(page);
    var textNode = document.createTextNode(text);
    link.appendChild(textNode);
    link.fontSize = "medium";
    return link;
  },
  addNavItem : function(text, page) {
    var button = document.createElement("li");
    button.className = "navitem";
    button.appendChild(this.addNavLink(text,page));
    resize.check(button);
    return button;
  },
  addButton: function(bar, text, page) {
    bar.appendChild(this.addNavItem(text,page));
  }
};

var resize = {
  check : function(item) {
    if (window.innerWidth <= 600 && item.className == "navitem") {
      this.smallButton(item);
    } else if (window.innerWidth <= 600 && item == document.getElementById("aboutText")) {
      this.smallAbout();
    } else if (window.innerWidth <= 600) {
      this.small(item);
    }
  },
  smallButton : function(item) {
    item.style.width = "110px";
    var text = item.childNodes[0].style;
    text.fontSize = "small";
    return item;
  },
  small : function(item) {
    var text = item.childNodes[0].style;
    text.fontSize = "small";
    return item;
  },
  smallAbout : function() {
    var about = document.getElementById("aboutText");
    about.style.left = "5%";
    about.style.width = "90%";
    var text = about.childNodes[0];
    text.style.fontSize = "large";
  }
};

var load = {
  about : function() {
    nav.menu("aboutNavbar");
    var about = document.getElementById("aboutText");
    resize.check(about);
  }
};

var xml = {
  loadButtons : function(bar) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        xml.processButtons(this, bar);
        console.log("Done");
      }
    };
      xml.responseType = "document";
      xmlhttp.open("GET","XML/buttons.xml", true);
      xmlhttp.overrideMimeType("text/xml");
      xmlhttp.send();
  },
  processButtons : function(xml, bar) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml.responseText, "application/xml");
    var button = xmlDoc.getElementsByTagName("button");
    for (i = 0; i < button.length; i++) {
    };
    var x = [];
    var y = [];
    for (i = 0; i < button.length; i++) {
      x[i] = button[i].getElementsByTagName("name")[0];
      y[i] = button[i].getElementsByTagName("link")[0];
    }
    var name = new Array();
    var link = new Array();
    for (i = 0; i < x.length; i++) {
      name.push(x[i].childNodes[0].nodeValue);
      console.log(name[i]);
      link.push(y[i].childNodes[0].nodeValue);
      nav.addButton(bar, name[i], link[i])
    };
    buttons.name = name;
    buttons.link = link;
  }
  }