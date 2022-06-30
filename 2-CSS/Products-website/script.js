// Defining variables
const navBtn = document.querySelector("#nav-btn");
const navBar = document.querySelector("#navbar");
const navClose = document.querySelector("#nav-close");

// Add Events - Click
// show navbar
navBtn.addEventListener("click", () => {
  navBar.classList.add("showNav");
});

// hide navbar
navClose.addEventListener("click", () => {
  navBar.classList.remove("showNav");
});
