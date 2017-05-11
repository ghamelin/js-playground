// grab dom
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');
const bodyClass = body.classList;

  // event listeners and handlers
input.addEventListener('focus', function () {
  bodyClass.add('show-floater');
});
// input.addEventListener('focusout', function () {
//   bodyClass.remove('show-floater')
// });
overlay.addEventListener('click', function () {
  bodyClass.remove('show-floater');
});
// ===== bookmark section =====
const bookmarkList  = document.querySelector('.bookmarks-list');
const bookmarkForm  = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector('input[type=text]');
const bookmarks     = JSON.parse(localStorage.getItem('bookmarks')) || [];
const API_KEY       = '58858c7bcf07b61e64257391';
const API_URL       = 'https://opengraph.io/api/1.0/site';


// reads local storage and fills the list items in the dom with what is listed
fillBookmarksList(bookmarks);

// create bookmark object 
function createBookmark(e) {
  e.preventDefault();

  if(!bookmarkInput.value){
    alert('I need a URL!');
    return;
  }
  const url = encodeURIComponent(bookmarkInput.value);
  //api call
  /**
   * api call
   */
  fetch(`${API_URL}/${url}?app_id=${API_KEY}`)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      console.log(data);

      const bookmark = {
        title: data.hybridGraph.title,
        image: data.hybridGraph.image,
        link:  data.hybridGraph.url
      };

      console.log(bookmark);

      bookmarks.push(bookmark);
      fillBookmarksList(bookmarks);
      storeBookmarks(bookmarks);
      bookmarkForm.reset();
    })
    .catch(error => {
      alert('There was a problem retrieving info!');
    });

    /* console.table(bookmarks);
    const bookmark     = document.createElement('a');
    bookmark.className = 'bookmark';
    bookmark.innerText = title;
    bookmark.href      = '#';
    bookmark.target    = '_blank';
    bookmarkList.appendChild(bookmark);
    bookmarkForm.reset(); */
    // console.table(bookmarks);
  };
// change format to an array objects
/**
 * adds each item in an array as a dom list item
 * @param {array} bookmarks 
 */
function fillBookmarksList(bookmarks = []) {

  const bookmarksHtml = bookmarks.map(function(bookmark, i) {
    return `
    <a href="${bookmark.link}" class="bookmark" data-id="${i}">
    <div class="img" style="background-image:url('${bookmark.image}');"></div>
    <div class="title">${bookmark.title}</div>
    <span class="glyphicon glyphicon-remove"></span>
    </a>`;
  }).join('');
  bookmarkList.innerHTML = bookmarksHtml;
  /* loop way
  let bookMarksHtml = '';
  for (i=0; i < bookmarks.length; i++) {
    bookMarksHtml += `
    <a href="#" class="bookmark">${bookmarks[i].title}</a>`; 
  }
  console.log(bookMarksHtml);*/
};

/**
 * handler for click event on the "x" button 
 * removes bookmark from bookmark list
 * @param {event} e 
 */
function removeBookmark(e){
  e.preventDefault;
  //find index of clicked
  //remove from bookmarks array using splice()
  //fill the list
  //store back to local storage

  // checks to see if the "x" was clicked if not it does nothing
  if (!e.target.matches('.glyphicon-remove')){
    return;
  }
  const index = e.target.parentNode.dataset.id;

  bookmarks.splice(index, 1);
  fillBookmarksList(bookmarks);
  storeBookmarks(bookmarks);
};

/**
 * saves each object in the array to local storage by passing it to the JSON.stringify method and then setting the new string of array info into local storage. names the "file" in local storage bookmarks
 * @param {array} bookmarks 
 */
function storeBookmarks(bookmarks = []) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

bookmarkForm.addEventListener('submit', createBookmark);
bookmarkList.addEventListener('click', removeBookmark);
