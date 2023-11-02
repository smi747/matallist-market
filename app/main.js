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

