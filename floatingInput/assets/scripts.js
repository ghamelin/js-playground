// grab dom
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');
const bodyClass = body.classList;

// event listeners and handlers
input.addEventListener('focus', function()  {
  bodyClass.add('show-floater');
});
input.addEventListener('focusout', function() {
  if (bodyClass.contains('show-floater')) {
      bodyClass.remove('show-floater');
  }
});
overlay.addEventListener('click', function(){
  if (bodyClass.contains('show-Floater')) {
      bodyClass.remove('show-floater');
  }
})

// =============================================

const bookmarkList = document.querySelector('.bookmarks-list');
const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector('input[type=text]');



bookmarkForm.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('submitted');
});

{/*<a href="" class="bookmark">place holder</a>*/}