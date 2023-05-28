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

// form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameValue = websiteNameElement.value;
  let urlValue = websiteUrlElement.value;
  // adjust url
  if (!urlValue.includes("https://") && !urlValue.includes("http://")) {
    urlValue = `https://${urlValue}`;
  }
  console.log(nameValue, urlValue);
  // validate name and url
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    nameValue,
    urlValue,
  };

  // save local storage
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  form.reset();
  websiteNameElement.focus();
});
