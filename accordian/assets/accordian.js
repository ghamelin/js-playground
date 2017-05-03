  // snag dom elements
  const accordian = document.querySelector('.accordian');
  const items      = accordian.querySelectorAll('li');
  const questions  = accordian.querySelectorAll('.question');


  // build functions
  function toggleDisplay(){
    const thisItem = this.parentNode;
    
    items.forEach(function(item) {
      if (thisItem == item){
      thisItem.classList.toggle('open');
      }
      else {
        item.classList.remove('open');
      }
    });
    console.log(thisItem);
    
  }

  // add event listeners
  questions.forEach(function(question) {
    question.addEventListener('click', toggleDisplay);
  });
