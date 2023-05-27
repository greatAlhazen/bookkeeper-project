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
