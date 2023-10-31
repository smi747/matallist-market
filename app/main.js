window.addEventListener("scroll", bringmenu);

function bringmenu() {
  if (window.innerWidth > 450) {
    if (document.documentElement.scrollTop >= 1020 && document.documentElement.scrollTop <= 2100) {
      document.getElementById("menu").classList.add("menu_changed");
      
    } else {
        document.getElementById("menu").classList.remove("menu_changed");
    }
  }
  else {
    if (document.documentElement.scrollTop >= 900 && document.documentElement.scrollTop <= 1830) {
      document.getElementById("menu").classList.add("menu_changed");
      
    } else {
        document.getElementById("menu").classList.remove("menu_changed");
    }
  }
  }
  