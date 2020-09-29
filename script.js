var homebar = document.getElementById("homeNavbar");
var hidden = true

var getUrl = window.location;
let baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

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
    var buttons;
    var bar = document.getElementById(id);
    buttons[1] = this.addButton(bar,"Home", "index.html");
    buttons[2] = this.addButton(bar,"About","about.html");
    buttons[3] = this.addButton(bar,"My Streams","twitch.html");
    buttons[4] = this.addButton(bar,"My Setup","setup.html");
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
    item.style.width = "92px";
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
  loadButtons : function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        xml.processButtons(this);
      };
      xmlhttp.open("GET","XML/buttons.xml", true);
      xmlhttp.send();
    }
  },
  processButtons : function(xml) {
    var x, y, i, xmlDoc, txt, links, buttons;
    xmlDoc = xml.responseXML;
    txt = [];
    links = [];
    x = xmlDoc.getElementsByTagName("name");
    y = xmlDoc.getElementsByTagName("link");
    for (i = 0; i < x.length; i++) {
      txt[i] = x[i].childNodes[0].nodeValue;
      links[i] = y[i].childNodes[0].nodeValue;
    }
  }
}