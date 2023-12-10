window.addEventListener("scroll", bringmenu);



function bringmenu() {
let tmp = document.getElementById('catalog').getBoundingClientRect();
  if (document.documentElement.scrollTop >= tmp.top + window.scrollY - 30 && document.documentElement.scrollTop <= tmp.bottom + window.scrollY - 30) {
    document.getElementById("menu").classList.add("menu_changed");
    
  } else {
      document.getElementById("menu").classList.remove("menu_changed");
  }
  
}

window.onresize = bringmenu;

document.addEventListener("mouseup", function(event) {
  var obj = document.getElementById("main__menu");
  if (!obj.contains(event.target)) {
    main__menu.classList.remove("opened");
  }
  obj = document.getElementById("cart_");
  if (!obj.contains(event.target)) {
    cart.classList.remove("openedcart");
  }
});

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
    tmp = ["images/slider/05/10.jpg", "images/slider/05/IMG_3837.jpg", "images/slider/05/IMG_3838.jpg", "images/slider/05/IMG_3850.jpg", "images/slider/05/5.jpg", "images/slider/05/6.JPG"];
  if (x == 5)
    tmp = ["images/slider/06/1.jpg"];
  if (x == 6)
    tmp = ["images/slider/07/IMG_3844.jpg"];

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

window.get_photos=get_photos;



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

window.set_city=set_city;

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

var inputs = document.querySelectorAll( '.form_inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = e.target.value.split( '\\' ).pop();
		label.innerHTML = fileName;
	});
});

import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

const root = createRoot(document.getElementById('reactcatalog'));

const Paginate = ({ postsPerPage, totalPosts, paginate, selectedPage }) => {
  const pageNumbers = [];
  if (Math.ceil(totalPosts / postsPerPage) < 10)
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  else {
    let leftBorder = selectedPage - 3 <= 0 ? 1 : selectedPage - 3 - (Math.ceil(totalPosts / postsPerPage) - selectedPage - 3 <= 0 ? Math.abs(Math.ceil(totalPosts / postsPerPage) - selectedPage - 3) : 0);
    let rightBorder = Math.ceil(totalPosts / postsPerPage) - selectedPage - 3 <= 0 ? Math.ceil(totalPosts / postsPerPage) : selectedPage + 3 + (selectedPage - 3 <= 0 ? Math.abs(selectedPage - 3 - 1) : 0);
    for (let i = leftBorder; i <= rightBorder; i++) {
      pageNumbers.push(i);
   }
  }

  return (
     <div className="pagination-container">
        <ul className="pagination">
          {selectedPage - 5 >= 0 && <li
            key={-1}
            onClick={() => paginate(1)}
            className={"pagination"}>...
          </li>
          }
            {pageNumbers.map((number) => (
              <li
                 key={number}
                 onClick={() => paginate(number)}
                 className={number == selectedPage ? "pagination pagination_selected" : "pagination"}
              >
                 {number}
              </li>
           ))}
            {Math.ceil(totalPosts / postsPerPage) - selectedPage - 3 > 0 && <li
              key={-2}
              onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
              className={"pagination"}>...
            </li>
            }
        </ul>
     </div>
  );
};


function App() {
  
  const [state, setState] = useState({count: 0, rows: []});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 };

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend?' + new URLSearchParams({
      ofs: postsPerPage * (currentPage - 1),
      lim: postsPerPage,
  }));
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return JSON.parse(body.express);
  };
  
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
    .then(res => setState(res))
    .catch(err => console.log(err));
  }, [currentPage])
  


  return (
    <div>
    <div className="App">
      {state.rows.map((x) => {return(<div key={x.idposition} style={{display: 'flex', gap: '20px'}}><div>{x.name}</div><div>{x.mark}</div><div>{x.units}</div></div>)})}
    </div>
    <Paginate className="pagination"
    postsPerPage={postsPerPage}
    totalPosts={state.count}
    paginate={paginate}
    selectedPage={currentPage}
    /></div>
  );
}
root.render(<App />)