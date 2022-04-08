const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// SAVE SIGN LINK
const saveLinkInput = $('#save-link');
function changeSaveLink(attrName, attrValue) {
    const currentUrl = new URL(saveLinkInput.value);

    currentUrl.searchParams.set(attrName, attrValue);

    saveLinkInput.value = currentUrl;
}
saveLinkInput.value = window.location.href;


// NAVBAR
const navMenu = $('#nav-menu');
const navToggle = $('#nav-toggle');
const navClose = $('#nav-close');

    // MENU SHOW
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}
    // MENU HIDDEN
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

    // REMOVE LINK ACTION
const navLink = $$('.nav__link');

function linkAction() {
    const navMenu = $('#nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(e => e.addEventListener('click', linkAction));

    // CHANGE BACKGROUND HEADER
function scrollHeader() {
    const header = $('#header');
    if( this.scrollY < 50 ) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
scrollHeader();

// END NAVBAR


// TAB ITEMS
const tabs = $$('.sign__tab-item');
const panes = $$('.sign__content-pane');

const tabActive = $('.sign__tab-item.active');
const line = $('.sign__line');

line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';

tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function() { 
        $('.sign__tab-item.active').classList.remove('active');
        $('.sign__content-pane.active').classList.remove('active');
        
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';

        this.classList.add('active');
        pane.classList.add('active');
    }
})


const textVisualization = $('#sign-box');
const allShadowBtn = $$('.sign__content-lights');
const range = $('.sign__range');

function showIt() {
    const textShow = $('#text-area').value;
    textVisualization.innerText = textShow;

    changeSaveLink('text', textShow);
}

function fontActive(e, ff) {
    const allFont = $$('.sign__content-font');

    for(let font of allFont) { font.classList.remove('active'); }

    e.classList.add('active');
    textVisualization.style.fontFamily = ff;
    changeSaveLink('font', ff);
}

// const allShadowBtn = $$('.sign__content-lights');
for(let i = 0; i < allShadowBtn.length; i++) {
    const dataSet = allShadowBtn[i].dataset.shadow;
    const getShadow = 'shadow-' + dataSet;
    
    allShadowBtn[i].addEventListener('click', function() {
        // const allLight = $$('.sign__content-light');
        for(let t = 0; t < textVisualization.classList.length; t++) {
            if(textVisualization.classList[t].search(getShadow))
            textVisualization.classList.remove(textVisualization.classList);
        }
        textVisualization.classList.add(getShadow);
        changeSaveLink('color', getShadow)
    });
}

range.onchange = function(e) {
    textVisualization.style.fontSize = range.value + 'px';
}



window.onload = function() {
    draggable(textVisualization);
}

function draggable(el) {
    el.addEventListener('mousedown', function(e) {
      let offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
      let offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);
      
      function mouseMoveHandler(e) {
        el.style.top = (e.clientY - offsetY) + 'px';
        el.style.left = (e.clientX - offsetX) + 'px';
      }
  
      function reset() {
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', reset);
      }
  
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', reset);
    });

    el.addEventListener('touchstart', function(e) {
        e.preventDefault();
      let offsetX = e.touches[0].clientX - parseInt(window.getComputedStyle(this).left);
      let offsetY = e.touches[0].clientY - parseInt(window.getComputedStyle(this).top);
      
      function mouseMoveHandler(e) {
        el.style.top = (e.touches[0].clientY - offsetY) + 'px';
        el.style.left = (e.touches[0].clientX - offsetX) + 'px';
      }
  
      function reset() {
        window.removeEventListener('touchmove', mouseMoveHandler);
        window.removeEventListener('touchend', reset);
        window.removeEventListener('touchcancel', reset);
      }
  
      window.addEventListener('touchmove', mouseMoveHandler);
      window.addEventListener('touchcancel', reset);
      window.addEventListener('touchend', reset);
    });
  }


// END TAB ITEMS

// Scroll up
function scrollUp() {
    const scrollUp = $('#scroll-up');

    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

// SWIPER
let swiper = new Swiper(".slideSwipe", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

function loadLink() {
    const currentURL = new URL(window.location.href);

    const text = currentURL.searchParams.get('text');
    if(text) {
        textVisualization.innerHTML = text;
    }

    const font = currentURL.searchParams.get('font');
    if(font) {
        textVisualization.style.fontFamily = font;
    }
}
loadLink();