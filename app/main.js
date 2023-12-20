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

window.addEventListener("load", bringmenu);
window.addEventListener("load", set_section);

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
     <div className={pageNumbers.length > 1 ? "pagination-container":"pagination-container pagination-container_hide"}>
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
  const [postsPerPage] = useState(15);
  const [cattree, setCattree] = useState(JSON.stringify({}));
  const [currentcat, setCurrentcat] = useState("");
  const [currentsubcat, setCurrentsubcat] = useState("");
  const [selectedcat, setSelectedcat] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [prevSearchInput, setPrevSearchInput] = useState("");
  const [optionListSize, setoptionListSize] = useState({count: 0, rows: []});
  const [optionListMark, setoptionListMark] = useState({count: 0, rows: []});
  const [optionListSizeSelected, setoptionListSizeSelected] = useState("Все размеры");
  const [optionListMarkSelected, setoptionListMarkSelected] = useState("Все марки");
  const [optionListSizeSelectedSend, setoptionListSizeSelectedSend] = useState("Все размеры");
  const [optionListMarkSelectedSend, setoptionListMarkSelectedSend] = useState("Все марки");
  const [filtBut, setFiltBut] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState({idposition: 0, name: "", size: "", mark: "", coef: "1", units: "", units_1: ""});
  
  const [coef_1, setCoef_1] = useState("");
  const [coef_2, setCoef_2] = useState("");
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 };

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend?' + new URLSearchParams({
      ofs: postsPerPage * (currentPage - 1),
      lim: postsPerPage,
      selcat: selectedcat,
      searchinp: prevSearchInput,
      filt_size: optionListSizeSelectedSend,
      filt_mark: optionListMarkSelectedSend,
  }));
    const body = await response.json();
    setSearchInput("");
    setoptionListMarkSelectedSend("Все марки");
    setoptionListSizeSelectedSend("Все размеры");

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  
  // получение GET маршрута с сервера Express, который соответствует GET из server.js 
  useEffect(() => {
    callBackendAPI()
    .then(res => {setState(JSON.parse(res.express));setoptionListSize(JSON.parse(res.sizes));setoptionListMark(JSON.parse(res.marks));setCattree(JSON.parse(res.catinfo))})
    .catch(err => console.log(err));
  }, [currentPage, selectedcat, filtBut])
  

  let catlist = []
  for (let obj in cattree) {
    catlist.push(<li className='catlist' key={obj} onClick={() => setCurrentcat(obj)}>{obj}</li>);
  }
  if (currentcat != "") {
    catlist = [];
    for (let obj in cattree[currentcat]) {
      catlist.push(<li className='catlist' key={obj} onClick={() => setCurrentsubcat(obj)}>{obj}</li>);
    }
  }
  if (selectedcat != "") {
    catlist = [];
  }
  else
    if (currentsubcat != "") {
      catlist = [];
      if (Object.keys(cattree[currentcat][currentsubcat]).length == 1 && Object.keys(cattree[currentcat][currentsubcat])[0] == currentsubcat)
        setSelectedcat(currentsubcat);
      else
        for (let obj in cattree[currentcat][currentsubcat]) {
          catlist.push(<li className='catlist' key={obj} onClick={() => setSelectedcat(obj)}>{obj}</li>);
      }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const showPosition = (x) => {
    setSelectedPosition(x);
    setCoef_1("");
    setCoef_2("");
  }


  var n = new RegExp('^([0-9][0-9]*\\.?[0-9]?[0-9]?[0-9]?)?$', "gm");
  const handleCoefChange_1 = (e) => {
    if (n.test(e.target.value)){
      setCoef_1(e.target.value);
      if (selectedPosition.units == "тн")
        setCoef_2((parseFloat(e.target.value) * 1000 / selectedPosition.coef).toFixed(3));
      else
        setCoef_2((parseFloat(e.target.value) * selectedPosition.coef / 1000).toFixed(3));
      if (e.target.value == "")
        setCoef_2("");
      }
  }
  const handleCoefChange_2 = (e) => {
    if (n.test(e.target.value)){
      setCoef_2(e.target.value);
      if (selectedPosition.units == "тн") 
        setCoef_1((parseFloat(e.target.value) * selectedPosition.coef / 1000).toFixed(3));
      else
        setCoef_1((parseFloat(e.target.value) * 1000 / selectedPosition.coef).toFixed(3));
      if (e.target.value == "")
        setCoef_1("");
      }
  }
  const unselectCat = () => {
    setCurrentPage(1);
    setoptionListSizeSelected("Все размеры");
    setoptionListMarkSelected("Все марки");
    setSelectedPosition({idposition: 0, name: "", size: "", mark: "", coef: "1", units: "", units_1: ""});
  }

  return (
    <div>
    <div className="app">
    <div className="navigation-row">
      <div className="navigation-row__cats">
        <div className="catalog__home" onClick={() => {setSelectedcat("");setCurrentsubcat("");setCurrentcat("");unselectCat()}}>
          <div className='house-ico'></div>
          <p className="navigation-row_elem">Каталог</p>
        </div>
         {currentcat !="" && <div className='cat-triangle'></div>}<p className="navigation-row_elem" onClick={() => {setSelectedcat("");setCurrentsubcat("");unselectCat()}}>{currentcat}</p> {currentsubcat !="" && <div className='cat-triangle'></div>}<p className="navigation-row_elem" onClick={() => {setSelectedcat("");unselectCat();}}>{currentsubcat}</p> {selectedcat !="search" && selectedcat !="search_" && selectedcat !="" && (selectedcat != currentsubcat || (selectedcat == currentsubcat && Object.keys(cattree[currentcat][currentsubcat]).length > 1)) && <div className='cat-triangle'></div>}{selectedcat !="search" && selectedcat !="search_" && selectedcat !="" && (selectedcat != currentsubcat || (selectedcat == currentsubcat && Object.keys(cattree[currentcat][currentsubcat]).length > 1)) && <p className="navigation-row_elem">{selectedcat}</p>}
      </div>
      <input
        className='navigation-row__searh'
        type="text"
        placeholder="Поиск"
        onChange={handleChange}
        value={searchInput}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            
            if (searchInput != "") {
              setCurrentsubcat("");
              setCurrentcat("");
              setoptionListSizeSelected("Все размеры");
              setoptionListMarkSelected("Все марки");
              setPrevSearchInput(searchInput);
              setCurrentPage(1);
              if (selectedcat != "search")
                setSelectedcat('search');
              else {
                setSelectedcat('search_');
            }}
          }
        }}/>
    </div>
    <div className='filts-row'></div>
  {selectedcat !="" && selectedcat !="search" && selectedcat !="search_" &&<div>
    <select value={optionListSizeSelected} onChange={(e) => setoptionListSizeSelected(e.target.value)}>
    <option key={-1}>Все размеры</option>
    {optionListSize.rows.map((x) => {return(<option key={x.size}>{x.size}</option>)})}
  </select>
  <select value={optionListMarkSelected} onChange={(e) => setoptionListMarkSelected(e.target.value)}>
    <option key={-1}>Все марки</option>
    {optionListMark.rows.map((x) => {return(<option key={x.mark}>{x.mark}</option>)})}
  </select>
  <button onClick={(e) => {setoptionListMarkSelectedSend(optionListMarkSelected);setoptionListSizeSelectedSend(optionListSizeSelected);setCurrentPage(1);setFiltBut(!filtBut)}}>Применить</button>
  <button onClick={(e) => {setoptionListSizeSelected("Все размеры");setoptionListMarkSelected("Все марки");setoptionListMarkSelectedSend("Все марки");setoptionListSizeSelectedSend("Все размеры");setCurrentPage(1);setFiltBut(!filtBut)}}>Сброс</button>
      </div>}
      {(selectedcat == "search" || selectedcat == "search_") ? prevSearchInput == "" ? "Задан пустой поисковой запрос" : "Поиск по запросу: "+prevSearchInput : selectedcat}
      {/*(selectedcat !="" || currentcat != "") && <div className='catlist' onClick={() => {selectedcat != "" ? (function() {setSelectedcat("");setCurrentPage(1);setoptionListSizeSelected("Все размеры");setoptionListMarkSelected("Все марки");setSelectedPosition({idposition: 0, name: "", size: "", mark: "", coef: "1", units: "", units_1: ""})})() : currentsubcat != "" ? setCurrentsubcat("") : setCurrentcat("");setSearchInput("");}}>Назад</div>*/}
      {selectedcat != "" && (state.rows.length > 0 ? state.rows.map((x) => {return(<div className="catlist" onClick={(e) => showPosition(x)} key={x.idposition} style={{display: 'flex', gap: '20px'}}><div>{x.name}</div><div>{x.mark}</div></div>)}) : "По данному запросу ничего не найдено")}
    </div>
    <ul>
      {catlist}
    </ul>
    {selectedcat != "" && <Paginate className="pagination"
    postsPerPage={postsPerPage}
    totalPosts={state.count}
    paginate={paginate}
    selectedPage={currentPage}
    />}
        {selectedPosition.name != "" && <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}><div>{selectedPosition.name}</div><div>{selectedPosition.mark}</div><div><input onChange={(e)=>handleCoefChange_1(e)} value={coef_1}></input>{selectedPosition.units}</div><div><input onChange={(e)=>handleCoefChange_2(e)} value={coef_2}></input>{selectedPosition.unitssecond}</div></div>}
</div>
  );
}
root.render(<App />)