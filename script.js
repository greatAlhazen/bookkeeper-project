const modalBox = document.getElementById("modal-box");
const form = document.getElementById("form");
const close = document.querySelector(".modal__close");
const websiteNameElement = document.getElementById("website-name");
const websiteUrlElement = document.getElementById("website-url");
const addBookmark = document.querySelector(".add-btn");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = [];

// show modal functionality
function showModal() {
  modalBox.style.display = "flex";
  websiteNameElement.focus();
}

// close modal functionality
function closeModal(e) {
  e.target === modalBox ? (modalBox.style.display = "none") : false;
}

// add btn click event
addBookmark.addEventListener("click", showModal);
// close btn click event
close.addEventListener("click", () => (modalBox.style.display = "none"));
// close modal window click event
window.addEventListener("click", closeModal);

function validate(nameValue, urlValue) {
  // validate url via regex
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("PLease specified fields");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("Please add correct url");
    return false;
  }

  return true;
}

// update ui
function updateDom() {
  bookmarkContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { nameValue, urlValue } = bookmark;
    const htmlItem = `
    <div class="container__item">
        <img
          src="https://s2.googleusercontent.com/s2/favicons?domain=${urlValue}"
          alt=${nameValue}
          class="container__image"
        />
        <a href=${urlValue} target="_blank" class="container__link"
          >${nameValue}</a
        >
        <div class="container__delete" onClick="deleteBookmark('${urlValue}')">&#10006;</div>
      </div>
    `;

    bookmarkContainer.insertAdjacentHTML("afterbegin", htmlItem);
  });
}

// get value and save to localdatabase
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    const bookmarks = [
      {
        nameValue: "test",
        urlValue: "https://test.com",
      },
    ];

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  // call update ui
  updateDom();
}

// form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameValue = websiteNameElement.value;
  let urlValue = websiteUrlElement.value;
  // adjust url
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  // validate name and url
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    nameValue,
    urlValue,
  };

  // save local storage and fetch bookmark
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  form.reset();
  websiteNameElement.focus();
});

// delete bookmark
function deleteBookmark(url) {
  bookmarks = bookmarks.filter((bookmark) => {
    return bookmark.urlValue !== url;
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// call fetch function firstly
fetchBookmarks();
