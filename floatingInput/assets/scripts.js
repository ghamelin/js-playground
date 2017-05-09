// grab dom
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');
const bodyClass = body.classList;

// event listeners and handlers
input.addEventListener('focus', function () {
  bodyClass.add('show-floater');
});
input.addEventListener('focusout', function () {
  if (bodyClass.contains('show-floater')) {
    bodyClass.remove('show-floater');
  }
});
overlay.addEventListener('click', function () {
  if (bodyClass.contains('show-Floater')) {
    bodyClass.remove('show-floater');
  }
})
// ===== bookmark section =====
const bookmarkList  = document.querySelector('.bookmarks-list');
const bookmarkForm  = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector('input[type=text]');
const bookmarks     = JSON.parse(localStorage.getItem('bookmarks')) || [];

fillBookmarksList(bookmarks);

// create bookmark object 
function createBookmark(e) {
  e.preventDefault();
  const title = bookmarkInput.value;
  if (title !== "") {
    const bookmark = {
      title: title
    };
    bookmarks.push(bookmark);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
    bookmarkForm.reset();
    /* console.table(bookmarks);
    const bookmark     = document.createElement('a');
    bookmark.className = 'bookmark';
    bookmark.innerText = title;
    bookmark.href      = '#';
    bookmark.target    = '_blank';
    bookmarkList.appendChild(bookmark);
    bookmarkForm.reset(); */
    console.table(bookmarks);
  }
};
// change format to an array objects
function fillBookmarksList(bookmarks = []) {
  // functional way
  const bookmarksHtml = bookmarks.map(function(bookmark, i) {
    return `
    <a href="#" class="bookmark" data-id="${i}">
    <div class="img"></div>
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
  
  console.table(bookmarks);
};
// save to local storage;
function storeBookmarks(bookmarks = []) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

bookmarkForm.addEventListener('submit', createBookmark);
bookmarkList.addEventListener('click', removeBookmark);
