document.addEventListener('DOMContentLoaded',function(){
/* =======отразить форму поиска по клику на лупу в шапке ==== */
  const headerSearchOpen = document.querySelector('#search-open');
  const headerSearchForm = document.querySelector('#header-search-form');

  headerSearchOpen.addEventListener('click', ()=>{
    headerSearchForm.classList.toggle('search-form--open')

});
/*====== menu burger click ====*/

const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#header-menu');
const bodyEl=document.body;
if(menuToggle){
  menuToggle.addEventListener('click',()=>{

   if(menuToggle.classList.contains('active')){
    
     menuToggle.classList.remove('active');
     mobileMenu.classList.remove('active');
   }else{
     menuToggle.classList.add('active');
     mobileMenu.classList.add('active');
     }
  });
}

/* Header slider*/
var headerSwiper = new Swiper(".header-slider", {
  loop:true,
  speed:1000,
  effect: "fade",
  lazy:true,
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
});

var ctaSwiper = new Swiper(".cta-slider", {
  loop:true,
  speed:1000,
  effect: "fade",
  lazy:true,
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
});
})


