document.addEventListener('DOMContentLoaded',function(){
/* =======отразить форму поиска по клику на лупу в шапке ==== */
  const headerSearchOpen = document.querySelector('#search-open');
  const headerSearchForm = document.querySelector('#header-search-form');

  headerSearchOpen.addEventListener('click', ()=>{
    headerSearchForm.classList.toggle('search-form--open')

});



})