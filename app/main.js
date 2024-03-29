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

var clickedOnScrollbar = function(mouseX){
  if( cart.scrollWidth <= mouseX ){
    return true;
  }
}
document.body.addEventListener("mousedown", function(event) {
  var p = event.target;
  var obj = document.getElementById("main__menu");
  if (!obj.contains(event.target)) {
    main__menu.classList.remove("opened");
  }

  obj = document.getElementById("cart_");
  if (!obj.contains(event.target) && !clickedOnScrollbar(event.clientX)) {
    cart.classList.remove("openedcart");
    is_ordered();
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
  initialSlide: 2,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function get_photos(x, tmp) {

  var element = document.createElement("div");
  element.classList.add("cover_menu");
  element.setAttribute("onclick", "this.remove()");
  var cross = document.createElement("div");
  cross.classList.add("cross");

  for (const elem of tmp) {
    var photo = document.createElement("img");
    photo.setAttribute("src", "images/slider/0"+(x+1)+"/"+elem);
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

const orderedHidden = Array.from(document.getElementsByClassName("ordered-hidden"));

function is_ordered() {
  const urlParams = new URLSearchParams(window.location.search);
  const ordered = urlParams.get('ordered')
  if (ordered == "1" || ordered == "2") {
    orderedHidden.forEach(
      function(element, index, array) {
          element.classList.add("hidden-important")
      }
    );
    if (ordered == "2") {
      document.getElementById('orderen-unhidden').innerHTML = "Ошибка при обработке заказа.<br><br>Пожалуйста, повторите попытку или свяжитесь с нами по телефону 8-960-889-76-67.<br><br>WhatsApp, Telegram, Viber: +79272533955";
    }
    document.getElementById('orderen-unhidden').style.display = 'block';
    cart.classList.add('openedcart');
  }
  else {
    orderedHidden.forEach(
      function(element, index, array) {
          element.classList.remove("hidden-important");
      });
      document.getElementById('orderen-unhidden').style.display = 'none';
  }
  const url = new URL(window.location);
  url.searchParams.delete('ordered');
  window.history.pushState(null, '', url.toString());
}
window.addEventListener("load", is_ordered);
window.is_ordered = is_ordered;


import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

import {createStore} from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const cartState = {
  items: [],
  totalweight: 0,
};

const reducer = (state = cartState, action) => {
  let tmp = [];
  switch (action.type) {
    case  "add_cart":
      return {...state, items: [...state.items, action.payload]};
    case "remove_cart":
      tmp = [...state.items];
      tmp.splice(action.payload, 1);
      return {...state, items: tmp};
    case "change_qs":
      tmp = [...state.items];
      if (action.payload.q_1 != null)
        tmp[action.payload.x].q_1 = action.payload.q_1;
      if (action.payload.q_2 != null)
        tmp[action.payload.x].q_2 = action.payload.q_2;
      return {...state, items: tmp};
    case "change_tw":
      return {...state, totalweight: action.payload}
    default:
      return state;
  }
};

const store = createStore(reducer);



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
            className={"pagination__elem"}>...
          </li>
          }
            {pageNumbers.map((number) => (
              <li
                 key={number}
                 onClick={() => paginate(number)}
                 className={number == selectedPage ? "pagination__elem pagination__elem_selected" : "pagination__elem"}
              >
                 {number}
              </li>
           ))}
            {Math.ceil(totalPosts / postsPerPage) - selectedPage - 3 > 0 && <li
              key={-2}
              onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
              className={"pagination__elem"}>...
            </li>
            }
        </ul>
     </div>
  );
};

const CatalogPosition = ({x, onClick, selectedPosition, handleCoefChange_1, handleCoefChange_2, coef_1, coef_2, addToCart}) => {
  return(
    <div onClick={onClick} className={x.idposition == selectedPosition.idposition ? "catalog-position__wrap catalog-position__wrap_active" : "catalog-position__wrap"}>
      {/*x.idposition != selectedPosition.idposition*/ true && <div className={"catalog-position"}><div className='position__name'>{x.name}<pre> </pre><span className='mobile-mark'>{x.mark != "nan" && x.mark}</span></div><div className='position__size'>{x.size}</div><div className='position__size'>{x.mark != "nan" && x.mark}</div><div className='addbutton-calc-wrap'>
        {x.idposition == selectedPosition.idposition && <div className="position__calc">
          <div className='position_quantity position_quantity_catalog'><p className='position__setcount'>УКАЖИТЕ КОЛИЧЕСТВО:</p><pre> </pre>
          <div className='input_wrap'><input className="position_quantity_i position_quantity_i_catalog" onClick={e => e.stopPropagation()} onChange={(e)=>handleCoefChange_1(e)} value={coef_1}></input><div className="ed_izm">{selectedPosition.units}</div></div>=
          <div className='input_wrap'><input className="position_quantity_i position_quantity_i_catalog" onClick={e => e.stopPropagation()} onChange={(e)=>handleCoefChange_2(e)} value={coef_2}></input><div className="ed_izm">{selectedPosition.unitssecond}</div></div></div>
          <div className='position__add-button' onClick={() => {addToCart(Object.assign({}, x), coef_1, coef_2); document.getElementById("position_added_alarm").classList.add('position_added_alarm_visible'); setTimeout(() => {document.getElementById("position_added_alarm").classList.remove('position_added_alarm_visible')}, 4000)}}>ДОБАВИТЬ В КОРЗИНУ</div></div>}</div><div className='add-position-button'><div className='d24'></div></div></div>}
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
  const [selectedPosition, setSelectedPosition] = useState({idposition: -1, name: "", size: "", mark: "", coef: "1", units: "", unitssecond: ""});
  
  const [coef_1, setCoef_1] = useState("");
  const [coef_2, setCoef_2] = useState("");

  const dispatch = useDispatch();

  const addToCart = (x, c1, c2) => {
    x.q_1 = c1;
    x.q_2 = c2;
    dispatch({type: "add_cart", payload: x})
  }
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    catalog.scrollIntoView();
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
    //setSearchInput("");

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
  

  let catlist = [];
  if (typeof cattree[0] === "undefined") {
    for (let obj in cattree) {
      catlist.push(<li className='category' key={obj} onClick={() => setCurrentcat(obj)}>{obj.toUpperCase()}</li>);
    }
    if (currentcat != "") {
      catlist = [];
      for (let obj in cattree[currentcat]) {
        catlist.push(<li className='category' key={obj} onClick={() => setCurrentsubcat(obj)}>{obj.toUpperCase()}</li>);
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
            catlist.push(<li className='category' key={obj} onClick={() => setSelectedcat(obj)}>{obj.toUpperCase()}</li>);
        }
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
    let replaced = e.target.value.replace(',', '.').replace('\'', '.')
    if (n.test(replaced)){
      setCoef_1(replaced);
      if (selectedPosition.units == "тн")
        setCoef_2((parseFloat(replaced) * 1000 / selectedPosition.coef).toFixed(3));
      else
        setCoef_2((parseFloat(replaced) * selectedPosition.coef / 1000).toFixed(3));
      if (replaced == "")
        setCoef_2("");
      }
  }
  const handleCoefChange_2 = (e) => {
    let replaced = e.target.value.replace(',', '.').replace('\'', '.')
    if (n.test(replaced)){
      setCoef_2(replaced);
      if (selectedPosition.units == "тн") 
        setCoef_1((parseFloat(replaced) * selectedPosition.coef / 1000).toFixed(3));
      else
        setCoef_1((parseFloat(replaced) * 1000 / selectedPosition.coef).toFixed(3));
      if (replaced == "")
        setCoef_1("");
      }
  }
  const unselectCat = () => {
    setCurrentPage(1);
    setoptionListSizeSelected("Все размеры");
    setoptionListMarkSelected("Все марки");
    setoptionListMarkSelectedSend("Все марки");
    setoptionListSizeSelectedSend("Все размеры");
    setSelectedPosition({idposition: -1, name: "", size: "", mark: "", coef: "1", units: "", unitssecond: ""});
  }

  return (
    <div className="app">
    <div className="navigation-row">
      <div className="navigation-row__cats">
        <div className="catalog__home" onClick={() => {setSelectedcat("");setCurrentsubcat("");setCurrentcat("");unselectCat();setSearchInput("");}}>
          <div className='house-ico'></div>
          <p className="navigation-row_elem" style={{fontWeight: 700}}>Каталог</p>
        </div>
         <div className='subcats-list'>{currentcat !="" && <div className='cat-triangle'></div>}<p className="navigation-row_elem" onClick={() => {setSelectedcat("");setCurrentsubcat("");unselectCat()}}>{currentcat}</p> {currentsubcat !="" && <div className='cat-triangle'></div>}<p className="navigation-row_elem" onClick={() => {setSelectedcat("");unselectCat();setFiltBut(!filtBut)}}>{currentsubcat}</p> {selectedcat !="search" && selectedcat !="search_" && selectedcat !="" && (selectedcat != currentsubcat || (selectedcat == currentsubcat && Object.keys(cattree[currentcat][currentsubcat]).length > 1)) && <div className='cat-triangle'></div>}{selectedcat !="search" && selectedcat !="search_" && selectedcat !="" && (selectedcat != currentsubcat || (selectedcat == currentsubcat && Object.keys(cattree[currentcat][currentsubcat]).length > 1)) && <p onClick={() => {unselectCat();setFiltBut(!filtBut)}} className="navigation-row_elem">{selectedcat}</p>}</div>
      </div>
      <div className='search-wrapper'>
      <input
        className='navigation-row__searh'
        type="text"
        placeholder="Поиск"
        onChange={handleChange}
        value={searchInput}
        onKeyUp={event => {
          //if (event.key === 'Enter') {
            
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
            else {
              setSelectedcat("");setCurrentsubcat("");setCurrentcat("");unselectCat();setSearchInput("");
            }
          //}
        }}/>{searchInput != "" && <div onClick={() => {setSelectedcat("");setCurrentsubcat("");setCurrentcat("");unselectCat();setSearchInput("")}} className='search-clear'>&#9747;</div>}</div>
    </div>

    <div className='filts-row filts-row-second'>
    {selectedcat !="" && selectedcat !="search" && selectedcat !="search_" && <div className='filts-row__wrap'>
    <div>
    <select className="filt-select" value={optionListSizeSelected} onChange={(e) => setoptionListSizeSelected(e.target.value)}>
    <option key={-1}>Все размеры</option>
    {optionListSize.rows.sort((a, b) => a.size.localeCompare(b.size, undefined, { numeric: true })).map((x) => {return(<option key={x.size}>{x.size}</option>)})}
  </select>&#9662;</div>
  <div>
  <select className="filt-select" value={optionListMarkSelected} onChange={(e) => setoptionListMarkSelected(e.target.value)}>
    <option key={-1}>Все марки</option>
    {optionListMark.rows.map((x) => {return(<option key={x.mark}>{x.mark}</option>)})}
  </select>&#9662;</div>
  <button className="filt-button" onClick={(e) => {setoptionListMarkSelectedSend(optionListMarkSelected);setoptionListSizeSelectedSend(optionListSizeSelected);setCurrentPage(1);setFiltBut(!filtBut)}}>Применить✓</button>
  <button className="filt-button" onClick={(e) => {setoptionListSizeSelected("Все размеры");setoptionListMarkSelected("Все марки");setoptionListMarkSelectedSend("Все марки");setoptionListSizeSelectedSend("Все размеры");setCurrentPage(1);setFiltBut(!filtBut)}}>Сброс&#9747;</button>
      </div>}
    </div>

    <div className='filts-row filts-row-first'>
    {selectedcat !="" && <div className='filts-row__wrap'>
    <div className='columns_list'><p>Наименование</p><p className='position__size'>Размер</p><p className='position__size'>Марка/ГОСТ</p></div>{selectedcat !="search" && selectedcat !="search_" && <div className='filts__wrap'><div>
    <select className="filt-select" value={optionListSizeSelected} onChange={(e) => setoptionListSizeSelected(e.target.value)}>
    <option key={-1}>Все размеры</option>
    {optionListSize.rows.map((x) => {return(<option key={x.size}>{x.size}</option>)})}
  </select>&#9662;</div>
  <div>
  <select className="filt-select" value={optionListMarkSelected} onChange={(e) => setoptionListMarkSelected(e.target.value)}>
    <option key={-1}>Все марки</option>
    {optionListMark.rows.map((x) => {return(<option key={x.mark}>{x.mark}</option>)})}
  </select>&#9662;</div>
  <button className="filt-button" onClick={(e) => {setoptionListMarkSelectedSend(optionListMarkSelected);setoptionListSizeSelectedSend(optionListSizeSelected);setCurrentPage(1);setFiltBut(!filtBut)}}>Применить✓</button>
  <button className="filt-button" onClick={(e) => {setoptionListSizeSelected("Все размеры");setoptionListMarkSelected("Все марки");setoptionListMarkSelectedSend("Все марки");setoptionListSizeSelectedSend("Все размеры");setCurrentPage(1);setFiltBut(!filtBut)}}>Сброс&#9747;</button>
      </div>}</div>}
    </div>
  
      {/*(selectedcat == "search" || selectedcat == "search_") ? prevSearchInput == "" ? "Задан пустой поисковой запрос" : "Поиск по запросу: "+prevSearchInput : selectedcat*/}
      {/*(selectedcat !="" || currentcat != "") && <div className='catlist' onClick={() => {selectedcat != "" ? (function() {setSelectedcat("");setCurrentPage(1);setoptionListSizeSelected("Все размеры");setoptionListMarkSelected("Все марки");setSelectedPosition({idposition: 0, name: "", size: "", mark: "", coef: "1", units: "", units_1: ""})})() : currentsubcat != "" ? setCurrentsubcat("") : setCurrentcat("");setSearchInput("");}}>Назад</div>*/}
      <div className='position-list'>
        {selectedcat != "" && (state.rows.length > 0 ? state.rows.map((x) => {return(<CatalogPosition addToCart={addToCart} key={x.idposition} onClick={(e) => {selectedPosition.idposition == x.idposition ? setSelectedPosition({idposition: -1, name: "", size: "", mark: "", coef: "1", units: "", unitssecond: ""}):showPosition(x);}} x={x} showPosition={showPosition} selectedPosition={selectedPosition} handleCoefChange_1={handleCoefChange_1} handleCoefChange_2={handleCoefChange_2} coef_1={coef_1} coef_2={coef_2}/>)}) : ((selectedcat == "search" || selectedcat == "search_") ? <div className='noresults'>По данному запросу ничего не найдено.<br/>Измените запрос или вернитесь в <div onClick={() => {setSelectedcat("");setCurrentsubcat("");setCurrentcat("");unselectCat();setSearchInput("")}} className='noresults__catalog'>Каталог</div></div> : ""))}
      </div>
      <ul className='categories-list'>
      {catlist}
    </ul>
    {selectedcat != "" && <Paginate className="pagination"
    postsPerPage={postsPerPage}
    totalPosts={state.count}
    paginate={paginate}
    selectedPage={currentPage}
    />}
        {/*selectedPosition.name != "" && <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}><div>{selectedPosition.name}</div><div>{selectedPosition.mark}</div><div><input onChange={(e)=>handleCoefChange_1(e)} value={coef_1}></input>{selectedPosition.units}</div><div><input onChange={(e)=>handleCoefChange_2(e)} value={coef_2}></input>{selectedPosition.unitssecond}</div></div>*/}
    </div>
    
  );
}
root.render(<Provider store={store}><App /></Provider>)

const root_2 = createRoot(document.getElementById('reactnumber'));
const root_2_2 = createRoot(document.getElementById('reactnumber_2'));

function Number() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  return (
    <div>{items.length}</div>
    );
}

root_2.render(<Provider store={store}><Number /></Provider>)
root_2_2.render(<Provider store={store}><Number /></Provider>)

const root_3 = createRoot(document.getElementById('reactcart'));

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const removeFromCart = (x) => {
    dispatch({type: "remove_cart", payload: x})
  }

  const changeQs = (x, y, z) => {
    dispatch({type: "change_qs", payload: {x: x, q_1: y, q_2:z}})
  }

  var n = new RegExp('^([0-9][0-9]*\\.?[0-9]?[0-9]?[0-9]?)?$', "gm");
  const handleCoefChange_1 = (e, item, i) => {
    let replaced = e.target.value.replace(',', '.').replace('\'', '.')
    if (n.test(replaced)){
      changeQs(i, replaced, null);
      if (item.units == "тн")
        changeQs(i, null, (parseFloat(replaced) * 1000 / item.coef).toFixed(3));
      else
        changeQs(i, null, (parseFloat(replaced) * item.coef / 1000).toFixed(3));
      if (replaced == "")
        changeQs(i, null, "");
      }
  }
  const handleCoefChange_2 = (e, item, i) => {
    let replaced = e.target.value.replace(',', '.').replace('\'', '.')
    if (n.test(replaced)){
      changeQs(i, null, replaced);
      if (item.units == "тн") 
        changeQs(i, (parseFloat(replaced) * item.coef / 1000).toFixed(3), null);
      else
        changeQs(i, (parseFloat(replaced) * 1000 / item.coef).toFixed(3), null);
      if (replaced == "")
        changeQs(i, "", null);
      }
  }

  return (
    <div className="positions">
      {items.map((item, i) => {return(
        <div key={i} className="cart_position">
                <div className="position_name">{item.name}</div>
                {<div className="position_quantity"><div className="input_wrap"><input type="text" onChange={(e) => handleCoefChange_1(e, item, i)} className="position_quantity_i" value={item.q_1}></input><div className="ed_izm">{item.units}</div></div><pre> / </pre><div className="input_wrap"><input type="text" onChange={(e) => handleCoefChange_2(e, item, i)} className="position_quantity_i" value={item.q_2}></input><div className="ed_izm">{item.unitssecond}</div></div></div>}
                <div className="position_close"><div className="position_close_img" onClick={() => removeFromCart(i)}></div></div>
              </div>
      )})}
      <a href="#catalog" className="cart_position cart_add" onClick={() => cart.classList.remove('openedcart')}>добавить товар...</a>
    </div>
    );
}

root_3.render(<Provider store={store}><Cart /></Provider>)



const root_4 = createRoot(document.getElementById('form_positions_reactroot'));

function HiddenPositions() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const totalweight = useSelector(state => state.totalweight);

  let tmp_text = "";
  items.forEach((item) => item.units == "тн" ? tmp_text += item.name + " " + item.mark + "|" + item.q_1 + "|" + item.units + "|" + item.q_2 + "|" + item.unitssecond  + "~": tmp_text += item.name + " " + item.mark + "|" + item.q_2 + "|" + item.unitssecond + "|" + item.q_1 + "|" + item.units + "~");
  tmp_text += "`" + totalweight;
  return <input readOnly type="text" name="form_positions" id="form_positions" className="form_input" value={tmp_text} required></input>
}

root_4.render(<Provider store={store}><HiddenPositions /></Provider>)


const root_5 = createRoot(document.getElementById('weight_reactroot'));

function WeightCount() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const totalweight = useSelector(state => state.totalweight);

  const changeTW = (x) => {
    dispatch({type: "change_tw", payload: x})
  }

  useEffect(() => {
    let weight = 0;
    items.forEach((item) => item.units == "тн" ? item.q_1 == "" ? {} : weight += parseFloat(item.q_1) : item.q_1 == "" ? {} : weight += parseFloat(item.q_2));
    changeTW(weight);
  }, [items])
  

  return <span className="total_weight_text"><pre>ОБЩИЙ ВЕС: </pre><pre>{totalweight.toFixed(3)} </pre>тонн</span>
}

root_5.render(<Provider store={store}><WeightCount /></Provider>)


//const about_page = ``

//const req_page = ``

async function open_otherpage(x) {
  const element = document.createElement("div");
  element.classList.add("cover_menu");
  element.classList.add("cover_menu_dark");
  var cross = document.createElement("div");
  
  cross.setAttribute("onclick", "this.parentElement.remove()");
  cross.classList.add("cross");

  let response = await fetch('otherpages/'+x);
  element.innerHTML = await response.text();
  //var text = document.createElement("p");
  //text.innerText = x;
  //text.classList.add("otherpage");
  //element.appendChild(text);
  
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

window.open_otherpage=open_otherpage;

const root_6 = createRoot(document.getElementById('otherpages_reactroot'));

function OtherpagesList() {
  const [state, setState] = useState([]);

  const callBackendAPI = async () => {
    const response = await fetch('/get_otherpages');
    const body = await response.json();
    //setSearchInput("");

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  useEffect(() => {
    callBackendAPI()
    .then(res => setState(JSON.parse(res.express)))
    .catch(err => console.log(err));
  }, [])
  // получение GET маршрута с сервера Express, который соответствует GET из server.js
  return (
    <div className='another_links'>{state.map((item) => {return <p key={item} className="another_link" onClick={() =>{main__menu.classList.remove('opened');open_otherpage(item)}}>{item}</p>})}</div>
    );
}
root_6.render(<OtherpagesList />)



const root_7 = createRoot(document.getElementById('swiper_reactroot'));
function SwiperReact() {
  const [state, setState] = useState(["ГИБКА МЕТАЛЛА", "ДОСТАВКА", "ЛАЗЕРНАЯ РЕЗКА", "ПЛАЗМЕННАЯ РЕЗКА", "РЕЗКА ЛЕНТОЧНОПИЛЬНЫМ СТАНКОМ", "РУБКА ГИЛЬОТИНОЙ", "СВЕРЛЕНИЕ ОТВЕРСТИЙ",]);
  const [photoslist, setPhotoslist] = useState([[],[],[],[],[],[],[]]);

  useEffect(() => {
    swiper = new Swiper(".mySwiper", {
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
      initialSlide: 2,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
    // Your code here
  }, []);
  const callBackendAPI = async () => {
    const response = await fetch('/get_photos');
    const body = await response.json();
    //setSearchInput("");

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  useEffect(() => {
    callBackendAPI()
    .then(res => setPhotoslist(JSON.parse(res.express)))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="swiper mySwiper"><div className="swiper-wrapper">{state.map((x, i) => {return photoslist[i].length == 0 ? '' : <div key={i} className="swiper-slide" onClick={() => get_photos(i, photoslist[i])}><div className="subtext">{x}</div><img src={"images/slider/0"+(i+1)+"/"+photoslist[i][0]} /></div>})}
    </div><div className="swiper-pagination"></div>
    <div className="swiper-button-next"></div>
    <div className="swiper-button-prev"></div></div>
    );
}
root_7.render(<SwiperReact />)