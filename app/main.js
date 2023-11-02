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