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