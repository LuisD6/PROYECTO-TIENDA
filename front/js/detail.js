
const detailProduct = document.querySelector('#detailProduct')

const getProduct = async () => {
    const url = new URLSearchParams(window.location.search)
    const id = url.get('idproducto')

    try {
        let response = await fetch(`http://localhost:4000/productos/${id}`)
        let producto = await response.json()
        if(producto) return producto
    } catch (err) {
        alert('No existe el producto' + err)
    }
    
}

const renderDetail = (producto) => {
  const {nombre, descripcion, precio, imagen, categoria} = producto
  detailProduct.innerHTML = `
  <div class="container">
      <div class="product-slides">
          <div class="slider-banner" data-slider>
              <figure class="product-banner">
                  <img src="../${imagen}" width="600" height="600" loading="lazy" alt="${nombre}" class="img-cover">
              </figure>
          </div>
          <button class="slide-btn prev" aria-label="Previous image" data-prev>
              <ion-icon name="chevron-back" aria-hidden="true"></ion-icon>
          </button>
          <button class="slide-btn next" aria-label="Next image" data-next>
              <ion-icon name="chevron-forward" aria-hidden="true"></ion-icon>
          </button>
      </div>

      <div class="product-content">
          <p class="product-subtitle">${categoria}</p>
          <h1 class="h1 product-title">${nombre}</h1>
          <p class="product-text">${descripcion}</p>

          <div class="wrapper">
              <span class="price" data-total-price>$${precio}</span>
              <span class="badge">50%</span>
              <del class="del">$${precio * 2}</del>
          </div>

          <div class="btn-group">
              <div class="counter-wrapper">
                  <button class="counter-btn" data-qty-minus>
                      <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <span class="span" data-qty>1</span>
                  <button class="counter-btn" data-qty-plus>
                      <ion-icon name="add-outline"></ion-icon>
                  </button>
              </div>
              <button class="cart-btn">
                  <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                  <span class="span">Add to cart</span>
              </button>
          </div>
      </div>
  </div>`;


  'use strict';

/**
 * add event on element, Código del script
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


/**
 * navbar toggle
 */

// const navbar = document.querySelector("[data-navbar]");
// const navToggler = document.querySelectorAll("[data-nav-toggler]");
// const overlay = document.querySelector("[data-overlay]");

// const toggleNav = function () {
//   navbar.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// addEventOnElem(navToggler, "click", toggleNav);



/**
 * slider funtionality
 */

const slider = document.querySelector("[data-slider]");
const nextBtn = document.querySelector("[data-next]");
const prevBtn = document.querySelector("[data-prev]");

// set the slider default position
let sliderPos = 0;

// set the number of total slider items
const totalSliderItems = 4;

// make next slide btn workable
const slideToNext = function () {

  sliderPos++;
  slider.style.transform = `translateX(-${sliderPos}00%)`;

  sliderEnd();

}

addEventOnElem(nextBtn, "click", slideToNext);

// make prev slide btn workable
const slideToPrev = function () {

  sliderPos--;
  slider.style.transform = `translateX(-${sliderPos}00%)`;

  sliderEnd();

}

addEventOnElem(prevBtn, "click", slideToPrev);



// check when slider is end then what should slider btn do
function sliderEnd() {
  if (sliderPos >= totalSliderItems - 1) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }

  if (sliderPos <= 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
}

sliderEnd();



/**
 * product quantity functionality
 */

const totalPriceElem = document.querySelector("[data-total-price]");
const qtyElem = document.querySelector("[data-qty]");
const qtyMinusBtn = document.querySelector("[data-qty-minus]");
const qtyPlusBtn = document.querySelector("[data-qty-plus]");

// set the product default quantity
let qty = 1;

// set the product default price
let productPrice = `${precio}`;

// set the initial total price
let totalPrice = `${precio}`;

const increaseProductQty = function () {
  qty++;
  totalPrice = qty * productPrice;

  qtyElem.textContent = qty;
  totalPriceElem.textContent = `$${totalPrice}.00`;
}

addEventOnElem(qtyPlusBtn, "click", increaseProductQty);

const decreaseProductQty = function () {
  if (qty > 1) qty--;
  totalPrice = qty * productPrice;

  qtyElem.textContent = qty;
  totalPriceElem.textContent = `$${totalPrice}.00`;
}

addEventOnElem(qtyMinusBtn, "click", decreaseProductQty);
}


document.addEventListener('DOMContentLoaded', async () => {
    let producto = await getProduct()
    console.log(producto)
    renderDetail(producto)
})

// getProduct()