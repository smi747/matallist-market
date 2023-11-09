window.addEventListener("scroll", bringmenu);

function bringmenu() {
let tmp = document.getElementById('catalog').getBoundingClientRect();
  if (document.documentElement.scrollTop >= tmp.top + window.scrollY - 30 && document.documentElement.scrollTop <= tmp.bottom + window.scrollY - 30) {
    document.getElementById("menu").classList.add("menu_changed");
    
  } else {
      document.getElementById("menu").classList.remove("menu_changed");
  }
  
}

window.addEventListener("scrollend", centring);

function centring() {
  let tmp = document.getElementById('catalog').getBoundingClientRect();
  if (Math.abs(tmp.top) <= 90 ) {
    catalog.scrollIntoView();
  }
  tmp = document.getElementById('gallery').getBoundingClientRect();
  if (tmp.top > 0  && tmp.top <= 90) {
    gallery.scrollIntoView();
  }
}
  
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  initialSlide: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function get_photos(x) {
  let tmp;
  if (x == 0)
    tmp = ["images/slider/01/IMG_4318.jpg"];
  if (x == 1)
    tmp = [];
  if (x == 2)
    tmp = ["images/slider/03/IMG_1216.jpg", "images/slider/03/IMG_1217.jpg"];
  if (x == 3)
    tmp = ["images/slider/04/IMG_4316.jpg", "images/slider/04/IMG_4317.jpg", "images/slider/04/IMG_5322.jpg", "images/slider/04/4.jpg"];
  if (x == 4)
    tmp = ["images/slider/05/10.jpg", "images/slider/05/IMG_3837.PNG", "images/slider/05/IMG_3838.PNG", "images/slider/05/IMG_3850.PNG", "images/slider/05/5.JPG", "images/slider/05/6.JPG"];
  if (x == 5)
    tmp = ["images/slider/06/1.jpg"];
  if (x == 6)
    tmp = ["images/slider/07/IMG_3844.PNG"];

  var element = document.createElement("div");
  element.classList.add("cover_menu");
  element.setAttribute("onclick", "this.remove()");
  var cross = document.createElement("div");
  cross.classList.add("cross");

  for (const elem of tmp) {
    var photo = document.createElement("img");
    photo.setAttribute("src", elem);
    photo.classList.add("cover_menu_photo");
    element.appendChild(photo);
  }
  
  element.append(cross)
  body.appendChild(element);
  /*
  fetch('http://localhost:3000/?q=test')
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    alert(data);
  });
  */
}

function set_city(x) {
  if (x == "msc") {
    let elems = document.getElementsByClassName("vlg");
    for (let elem of elems) 
      elem.setAttribute("style", "display: none");
    elems = document.getElementsByClassName("msc");
    for (let elem of elems) 
      elem.setAttribute("style", "display: block");
    document.getElementsByClassName("cbutton_1")[0].classList.add("selected_city");
    document.getElementsByClassName("cbutton_2")[0].classList.remove("selected_city");
  }
  if (x == "vlg") {
    let elems = document.getElementsByClassName("msc");
    for (let elem of elems) 
      elem.setAttribute("style", "display: none");
    elems = document.getElementsByClassName("vlg");
    for (let elem of elems) 
      elem.setAttribute("style", "display: block");
      document.getElementsByClassName("cbutton_1")[0].classList.remove("selected_city");
      document.getElementsByClassName("cbutton_2")[0].classList.add("selected_city");
  }
}

function set_city(x) {
  if (x == "msc") {
    let elems = document.getElementsByClassName("vlg");
    for (let elem of elems) 
      elem.setAttribute("style", "display: none");
    elems = document.getElementsByClassName("msc");
    for (let elem of elems) 
      elem.setAttribute("style", "display: block");
    document.getElementsByClassName("cbutton_1")[0].classList.add("selected_city");
    document.getElementsByClassName("cbutton_2")[0].classList.remove("selected_city");
    msc_map.setAttribute("style", "display: block");
    vlg_map.setAttribute("style", "display: none");
  }
  if (x == "vlg") {
    let elems = document.getElementsByClassName("msc");
    for (let elem of elems) 
      elem.setAttribute("style", "display: none");
    elems = document.getElementsByClassName("vlg");
    for (let elem of elems) 
      elem.setAttribute("style", "display: block");
    document.getElementsByClassName("cbutton_1")[0].classList.remove("selected_city");
    document.getElementsByClassName("cbutton_2")[0].classList.add("selected_city");
    msc_map.setAttribute("style", "display: none");
    vlg_map.setAttribute("style", "display: block");
  }
}

window.addEventListener("scroll", set_section);

function set_section() {
  var tmp = document.getElementById('contacts').getBoundingClientRect();
  if (document.documentElement.scrollTop >= tmp.top + window.scrollY - 1) {
    document.getElementById('catalog_id').classList.remove("selected_link");
    document.getElementById('gallery_id').classList.remove("selected_link");
    document.getElementById('contacts_id').classList.add("selected_link");
    return;}
  tmp = document.getElementById('gallery').getBoundingClientRect();
  if (document.documentElement.scrollTop >= tmp.top + window.scrollY - 1) {
    document.getElementById('catalog_id').classList.remove("selected_link");
    document.getElementById('gallery_id').classList.add("selected_link");
    document.getElementById('contacts_id').classList.remove("selected_link");
    return;
  }
  tmp = document.getElementById('catalog').getBoundingClientRect();
  if (document.documentElement.scrollTop >= tmp.top + window.scrollY - 1) {
    document.getElementById('catalog_id').classList.add("selected_link");
    document.getElementById('gallery_id').classList.remove("selected_link");
    document.getElementById('contacts_id').classList.remove("selected_link");
    return;
  }
    document.getElementById('catalog_id').classList.remove("selected_link");
    document.getElementById('gallery_id').classList.remove("selected_link");
    document.getElementById('contacts_id').classList.remove("selected_link");
}

