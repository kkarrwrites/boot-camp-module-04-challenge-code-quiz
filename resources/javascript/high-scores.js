// Element variables
const buttonGoBackElement = document.querySelector("#button__go-back");

// Adds link to index.html to Go Back button
buttonGoBackElement.addEventListener("click", function () {
  window.open("index.html", "_self");
});
