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



function click_1() {
  var element = document.createElement("div");
  element.classList.add("cover_menu");
  element.setAttribute("onclick", "this.remove()");
  var cross = document.createElement("div");
  cross.classList.add("cross");
  var photo_1 = document.createElement("img");
  photo_1.setAttribute("src", "images/slider/01/IMG_4318.jpg");
  photo_1.classList.add("cover_menu_photo");
  element.append(cross)
  element.appendChild(photo_1);
  element.appendChild(photo_1.cloneNode());
  element.appendChild(photo_1.cloneNode());
  body.appendChild(element);
  fetch('http://localhost:3000/?q=test')
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    alert(data);
  });
}